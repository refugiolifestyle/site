import { TabsContent } from "@/components/ui/tabs";
import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
    termo: z
        .boolean()
        .refine(data => !!data, "O Campo Termo é obrigatório")
})

export default function PagamentoTabsContent({ setTabActive, setInscrito, inscrito, voltarInicio }: CadastrarInscritoContentProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            termo: false
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        alert(`Abre a tela de pagamento para o inscrito ${inscrito?.nome}`)
        
        await new Promise(r => setTimeout(r, 2000))
        
        setTabActive("finalizado")

        return true
    }

    return <TabsContent value="pagamento">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Termos de pagamento</CardTitle>
                        <CardDescription>Leia os termos e confirme abaixo para continuar para o pagamento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-decimal text-sm text-justify px-4 space-y-2 overflow-y-scroll h-56">
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
                            disabled={form.formState.isSubmitting}
                            className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                            {
                                form.formState.isSubmitting
                                    ? <Loader2 className="mr-1 animate-spin" />
                                    : <Check className="mr-1" />
                            }
                            Pagar
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