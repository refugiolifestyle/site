import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PagamentoModal } from "./modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
    termo: z
        .boolean()
        .refine(data => !!data, "O Campo Termo é obrigatório"),
    tipoPagamento: z
        .enum(["pix", "credit_card"], {
            required_error: "O Campo tipo de pagamento é obrigatório",
        })
        .default("pix")
})

export default function PagamentoTabsContent({ evento, setTabActive, inscrito, voltarInicio }: CadastrarInscritoContentProps) {
    const [checkout, setCheckout] = useState<string>()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            termo: false
        },
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (fields) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento/${fields.tipoPagamento}`)
        const data = await response.json() as {
            message?: string
            checkout?: string
        }

        if (!response.ok) {
            alert(data.message)
            return false
        }

        setCheckout(data.checkout)

        let pagamentoEfetivado = await new Promise<boolean>(async (resolve, reject) => {
            let looping = 1
            while (looping > 0 && looping <= 60) {
                await new Promise(r => {
                    setTimeout(r, 5000)
                })

                try {
                    const responseVP = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento/status`, { cache: "no-cache" })
                    if (!responseVP.ok) {
                        throw new Error()
                    }

                    const { status } = await responseVP.json() as { status: string }

                    looping = status !== 'CONCLUIDA' ? looping + 1 : 0
                }
                catch (e) {
                    looping = -1
                    alert("Falha ao observar o status de pagamento, tente novamente mais tarde.")
                    reject()
                }
            }

            if (looping === 0) {
                resolve(true)
            } else {
                alert("Tempo de aguarde do pagamento ultrapassou 5m, tente verificar o status do pagamento mais tarde.")
                resolve(false)
            }
        })

        if (pagamentoEfetivado) {
            setCheckout(undefined)
            setTabActive("finalizado")
            return true
        } else {
            voltarInicio()
            return false
        }
    }

    return <TabsContent value="pagamento">
        <PagamentoModal url={checkout} />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Pagamento</CardTitle>
                        <CardDescription>Selecione um meio de pagamento para continuar para o pagamento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="tipoPagamento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Tipo de pagamento</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={form.formState.isSubmitting}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem>
                                                <FormLabel className={`font-normal flex items-center space-x-3 space-y-0`}>
                                                    <FormControl>
                                                        <RadioGroupItem value="pix" />
                                                    </FormControl>
                                                    <span>PIX</span>
                                                </FormLabel>
                                            </FormItem>
                                            {/* <FormItem>
                                                <FormLabel className={`font-normal flex items-center space-x-3 space-y-0`}>
                                                    <FormControl>
                                                        <RadioGroupItem value="credit_card" />
                                                    </FormControl>
                                                    <span>Cartão de crédito</span>
                                                </FormLabel>
                                            </FormItem> */}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="termo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Termos de compromisso</FormLabel>
                                    <ul className="list-decimal text-sm text-justify px-6 lg:px-4 space-y-2 overflow-y-scroll h-48">
                                        <li>Estou ciente que os dados informados estão corretos e atualizados</li>
                                        <li>Uma vez entregue a pulseira, esta é de inteira responsabilidade do inscrito, se eximindo a organização do evento de qualquer responsabilidade de entregar-lhe uma nova pulseira em quaisquer hipóteses de perda, extravio etc, ainda que se trate de ocorrência de caso fortuito ou de força maior</li>
                                        <li>⁠Todos os preletores e cantores estão confirmados mediante contrato, todavia, deve estar ciente o adquirente que há situações de caso fortuito ou força maior que fogem por completo da responsabilização da organizadora, não havendo hipótese de devolução do dinheiro ou parte dele no caso de algum dos preletores não poder comparecer ao evento</li>
                                    </ul>
                                    <div className="space-x-2 flex items-center pt-2">
                                        <FormControl>
                                            <Checkbox
                                                disabled={form.formState.isSubmitting}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="leading-snug">Declaro que li e aceito todos os termos descritos acima</FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting || !form.watch("termo") || !form.watch("tipoPagamento")}
                            className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                            {
                                form.formState.isSubmitting
                                    ? <><Loader2 className="mr-1 animate-spin" />Aguardando pagamento</>
                                    : <>Pagar</>
                            }

                        </Button>
                        <a href="#" onClick={voltarInicio}>
                            Cancelar
                        </a>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    </TabsContent >
}