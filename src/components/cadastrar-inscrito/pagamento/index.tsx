import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PagamentoModal } from "./modal";

const FormSchema = z.object({
    termo: z
        .boolean()
        .refine(data => !!data, "O Campo Termo é obrigatório")
})

export default function PagamentoTabsContent({ evento, setTabActive, inscrito, voltarInicio }: CadastrarInscritoContentProps) {
    const [checkout, setCheckout] = useState<string>()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            termo: false
        },
    })

    async function onSubmit() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento`)
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
            let looping = true
            while (looping) {
                await new Promise(r => {
                    setTimeout(r, 4000)
                })

                try {
                    const responseVP = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento/status`, { cache: "no-cache" })
                    if (!responseVP.ok) {
                        throw new Error()
                    }

                    const { status } = await responseVP.json() as { status: string }

                    looping = status !== 'paid'
                }
                catch (e) {
                    looping = false
                    alert("Falha ao observar o status de pagamento, tente novamente mais tarde.")
                    reject()
                }
            }

            resolve(true)
        })

        if (pagamentoEfetivado) {
            setCheckout(undefined)
            setTabActive("finalizado")
            return true
        }

        return false
    }

    return <TabsContent value="pagamento">
        <PagamentoModal url={checkout} />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Termos de pagamento</CardTitle>
                        <CardDescription>Leia os termos e confirme abaixo para continuar para o pagamento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-decimal text-sm text-justify px-6 lg:px-4 space-y-2 overflow-y-scroll h-56">
                            <li>Estou ciente que os dados informados estão corretos e atualizados</li>
                            <li>Uma vez entregue a pulseira, esta é de inteira responsabilidade do inscrito, se eximindo a organização do evento de qualquer responsabilidade de entregar-lhe uma nova pulseira em quaisquer hipóteses de perda, extravio etc, ainda que se trate de ocorrência de caso fortuito ou de força maior</li>
                            <li>⁠Todos os preletores e cantores estão confirmados mediante contrato, todavia, deve estar ciente o adquirente que há situações de caso fortuito ou força maior que fogem por completo da responsabilização da organizadora, não havendo hipótese de devolução do dinheiro ou parte dele no caso de algum dos preletores não poder comparecer ao evento</li>
                        </ul>
                        <FormField
                            control={form.control}
                            name="termo"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="space-x-2 flex items-center">
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
                            disabled={form.formState.isSubmitting || !form.watch("termo")}
                            className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                            {
                                form.formState.isSubmitting
                                    ? <><Loader2 className="mr-1 animate-spin" />Aguardando pagamento</>
                                    : <><Check className="mr-1" />Pagar</>
                            }

                        </Button>
                        <a href="#" onClick={voltarInicio}>
                            Cancelar
                        </a>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    </TabsContent>
}