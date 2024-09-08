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
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TabsContent } from "@/components/ui/tabs"
import { CelulaType } from "@/types/celulas"
import { InscritoType } from "@/types/inscrito"
import { Check, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { PagamentoModal } from "../pagamento/modal"
import { Checkbox } from "@/components/ui/checkbox"

const FormSchema = z
    .object({
        cpf: z
            .string({
                required_error: "O Campo CPF é obrigatório",
                invalid_type_error: "CPF inválido (digite somente números)"
            })
            .length(11, "O CPF precisa conter 11 digitos")
            .refine(data => cpfValidation.isValid(data), "CPF inválido (digite somente números)"),
        nome: z
            .string({ required_error: "O Campo Nome é obrigatório" })
            .min(10, { message: "Campo precisa ter no mínimo 10 caracteres" }),
        telefone: z
            .string({ required_error: "O Campo Telefone é obrigatório" })
            .min(10, { message: "Campo precisa ter no mínimo 10 digitos" })
            .max(11, { message: "Campo precisa ter no máximo 11 digitos" }),
        email: z
            .string({
                required_error: "O Campo Email é obrigatório",
            })
            .email("O Campo Email é obrigatório"),
        rede: z
            .string({
                required_error: "O Campo Rede é obrigatório"
            })
            .optional(),
        celula: z
            .string({
                required_error: "O Campo Célula é obrigatório"
            })
            .optional(),
        visitante: z
            .boolean()
            .default(false)
    })
    .superRefine(({ visitante, rede, celula }, ctx) => {
        if (!visitante) {
            if (!rede) {
                return ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "O Campo Rede é obrigatório",
                    path: ["rede"]
                })
            } else if (!celula) {
                return ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "O Campo Célula é obrigatório",
                    path: ["celula"]
                })
            }
        }
    })

export default function CadastroFormularioCadastro({ evento, setTabActive, setInscrito, inscrito, voltarInicio }: CadastrarInscritoContentProps) {
    const [celulas, setCelulas] = useState<CelulaType[]>()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            cpf: "",
            celula: "",
            nome: "",
            rede: "",
            email: "",
            telefone: "",
            visitante: false,
            ...inscrito
        }
    })

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/celulas`)
            const data = await response.json() as { celulas: CelulaType[] }

            setCelulas(data.celulas)
        })();
    }, [])

    useEffect(() => {
        const subscription = form.watch((_, { name, type }) => {
            if (name === "rede" && type === "change") {
                form.setValue("celula", "", { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [form.watch])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const payload: InscritoType = {
            ...data,
            id: v4(),
            inscricao: new Date().toString(),
            nome: data.nome.toLowerCase().replace(/(^.|\s+.)/g, m => m.toUpperCase())
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/eventos/${evento.id}/inscricoes`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const { message } = await response.json()

            alert(message)
            return false
        }

        setInscrito(payload)
        setTabActive("pagamento")

        return true
    }

    const sorter = new Intl.Collator('pt-BR', { numeric: true, usage: "sort" });

    const redes = celulas?.map(c => `Rede ${c.rede}`)
        .filter((r, i, a) => a.indexOf(r) === i)
        .sort((a, b) => sorter.compare(a, b))

    const celulasFiltradas = (
        form.watch("rede")
            ? celulas?.filter(c => `Rede ${c.rede}` === form.watch("rede"))
            : celulas
    )?.map(c => `Refúgio ${c.id}`)
        .sort((a, b) => sorter.compare(a, b))

    return (
        <TabsContent value="formulario">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, data => console.log(data))}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Formulário</CardTitle>
                            <CardDescription>Preencha seus dados para continuar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
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
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome completo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Digite seu telefone, DDD + Número" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Digite seu email" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    !form.watch('visitante')
                                    && <>
                                        <FormField
                                            control={form.control}
                                            name="rede"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione uma rede" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {redes?.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="celula"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione uma célula" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {celulasFiltradas?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                }
                                <FormField
                                    control={form.control}
                                    name="visitante"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-row space-x-2 mt-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel>
                                                    Sou visitante, não tenho célula
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                            <a href="#" onClick={voltarInicio}>
                                Cancelar
                            </a>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </TabsContent>
    )
}
