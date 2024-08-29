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
import { cn } from "@/lib/utils"
import { InscritoType } from "@/types/inscrito"

type FormCardValidarInscritoProps = {
    evento: EventoType,
    setInscrito: (inscrito: InscritoType | null) => void
}

const formSchema = z.object({
    cpf: z
        .string({ required_error: "Campo obrigatório" })
        .length(11, { message: "Campo precisa ter no máximo 11 digitos" }),
})

export function FormCardValidarInscrito({ setInscrito }: FormCardValidarInscritoProps) {
    const [carregando, setCarregando] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setCarregando(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getInscrito?cpf=${values.cpf}`)
        if (response.status == 400) {
            alert("Falha ao buscar o inscrito")
        }
        else if (response.status == 404) {
            setInscrito(values)
        }
        else {
            const {inscrito} = await response.json() as { inscrito: InscritoType }

            inscrito.cpf = inscrito.cpf?.replaceAll(/[^\d]+/g, '')
            inscrito.telefone = inscrito.telefone?.replaceAll(/[^\d]+/g, '')

            setInscrito(inscrito)
        }

        setCarregando(false)
    }

    return (
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Formulário</CardTitle>
                        <CardDescription>Preencha os dados abaixo para continuar sua pré-inscrição</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" disabled={carregando} className="w-full gap-2 text-white bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]">
                            {
                                carregando
                                    ? <LoaderCircle className="animate-spin" />
                                    : <Check />
                            }
                            Continuar
                        </Button>
                        <a href="/eventos" className="text-sm">
                            Voltar
                        </a>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
