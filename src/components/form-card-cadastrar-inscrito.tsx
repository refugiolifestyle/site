"use client"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { EventoType } from "@/types/evento"
import { InscritoType } from "@/types/inscrito"
import { CelulaType } from "@/types/celulas"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FormCardProps = {
    evento: EventoType,
    inscrito: InscritoType | null,
    handleVoltar: () => void
}

const formSchema = z.object({
    cpf: z
        .string({ required_error: "Campo obrigatório" })
        .length(11, { message: "Campo precisa ter no máximo 11 digitos" }),
    nome: z
        .string({ required_error: "Campo obrigatório" })
        .min(10, { message: "Campo precisa ter no máximo 10 caracteres" })
        .optional(),
    telefone: z
        .string({ required_error: "Campo obrigatório" })
        .min(10, { message: "Campo precisa ter no máximo 10 digitos" })
        .max(11, { message: "Campo precisa ter no máximo 11 digitos" })
        .optional(),
    celula: z.string().optional(),
    rede: z.string().optional(),
    preInscricao: z.string().optional(),
    inscricaoConfirmada: z.string().optional(),
})

export function FormCardCadastrarInscrito({ evento, inscrito, handleVoltar }: FormCardProps) {
    const [celulas, setCelulas] = useState<CelulaType[]>()
    const [carregando, setCarregando] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        values: inscrito!,
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCelulas`)
            const data = await response.json() as { celulas: CelulaType[] }

            setCelulas(data.celulas)
        })();
    }, [])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setCarregando(true);

        let payload: InscritoType = {
            ...values,
            preInscricao: new Date().toString()
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postInscrito?eventoId=${evento.id}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })

        let message = await response.text()
        alert(message)

        if(response.ok) {
            handleVoltar()
        }

        setCarregando(false);
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
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Formulário</CardTitle>
                        <CardDescription>Preencha e valide seus dados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="CPF, somente números" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nome" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="telefone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Telefone, somente números" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="rede"
                                    render={({ field: { ref, ...field } }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select {...field} onValueChange={value => field.onChange({ target: { value } })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma rede" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {redes?.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="celula"
                                    render={({ field: { ref, ...field } }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Select {...field} onValueChange={value => field.onChange({ target: { value } })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma célula" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {celulasFiltradas?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" disabled={carregando} className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                            {
                                carregando
                                    ? <LoaderCircle className="animate-spin" />
                                    : <Check />
                            }
                            Confirmar
                        </Button>
                        <a href="#" onClick={handleVoltar} className="text-sm">
                            Voltar
                        </a>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
