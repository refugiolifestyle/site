"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { cpf as cpfValidation } from 'cpf-cnpj-validator'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CadastrarInscritoContentProps } from "@/components/cadastrar-inscrito"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TabsContent } from "@/components/ui/tabs"
import { InscritoType } from "@/types/inscrito"
import { Check, Loader2 } from "lucide-react"

const FormSchema = z
    .object({
        cpf: z
            .string({
                required_error: "CPF obrigatório",
                invalid_type_error: "CPF inválido (digite somente números)"
            })
            .length(11, "O CPF precisa conter 11 digitos")
            .refine(data => cpfValidation.isValid(data), "CPF inválido (digite somente números)"),
    })

export default function ValidacaoFormularioCadastro({ evento, setInscrito, setTabActive }: CadastrarInscritoContentProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { cpf: "" }
    })

    async function onSubmit({ cpf }: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes/${cpf}`)
            const { inscrito } = await response.json() as { inscrito: InscritoType }

            if (inscrito && !inscrito.novo) {
                setInscrito(inscrito)
                if (inscrito.pagamento && inscrito.pagamento.status === 'paid') {
                    setTabActive("finalizado")
                } else {
                    setTabActive("pagamento")
                }
            } else {
                setInscrito(inscrito)
            }

            return true
        }
        catch (e) {
            alert("Falha ao validar o inscrito")
        }
    }

    return (
        <TabsContent value="formulario">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Formulário</CardTitle>
                            <CardDescription>Preencha seu CPF para buscarmos seus dados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="CPF" {...field} />
                                        </FormControl>
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
                                Continuar
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </TabsContent>
    )
}
