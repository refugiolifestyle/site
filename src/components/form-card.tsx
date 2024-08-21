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

type FormCardProps = {
    evento: string
}

const formSchema = z.object({
    cpf: z
        .string({ required_error: "Campo obrigatório" })
        .length(11, { message: "Campo precisa ter no máximo 11 digitos" })

})

export function FormCard({evento}: FormCardProps) {
    const [carregando, setCarregando] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })

    async function carregarDados() {
        let cpf = form.watch('cpf')
        alert(cpf)

        await new Promise(r => setTimeout(r, 2000))
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Card className="w-[350px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Formulário</CardTitle>
                        <CardDescription>Preencha os dados abaixo para continuar sua pré-inscrição na {evento}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CPF</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Digite somente os números.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={carregando} className="w-full bg-[#c1ff01] hover:bg-[#c0ff019e] text-black gap-2">
                            {
                                carregando
                                    ? <LoaderCircle className="animate-spin" />
                                    : <Check />
                            }
                            Continuar
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
