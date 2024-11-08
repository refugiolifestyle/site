import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InscritoType } from "@/types/inscrito"
import { zodResolver } from "@hookform/resolvers/zod"
import { cpf as cpfValidation } from 'cpf-cnpj-validator'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { StepProps, Steps } from ".."

const FormSchema = z
    .object({
        cpf: z
            .string({
                required_error: "CPF obrigatório",
                invalid_type_error: "CPF inválido (digite somente os 11 números)"
            })
            .length(11, "CPF inválido (digite somente os 11 números)")
            .refine(data => cpfValidation.isValid(data), "CPF inválido (digite somente os 11 números)"),
    })

export default function Validacao({ setStep, evento, setInscrito }: StepProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { cpf: "" }
    })

    async function onSubmit({ cpf }: z.infer<typeof FormSchema>) {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${evento.id}/inscricoes/${cpf}`)
            const { inscrito } = await response.json() as { inscrito: InscritoType }

            setInscrito(inscrito)

            if (inscrito?.novo) {
                setStep(Steps.FORMULARIO)
            } else if (inscrito?.finalizada) {
                setStep(Steps.FINALIZACAO)
            } else {
                setStep(Steps.TERMOS)
            }

            return true
        }
        catch (e) {
            alert("Falha ao validar o inscrito")
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Formulário</CardTitle>
                    <CardDescription>
                        Digite seu CPF para validar seu cadastro.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="CPF (somente os números)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-[#fdaf00] hover:bg-[#feef00] text-black">
                        Avançar
                    </Button>
                </CardFooter>
            </Card>
        </form>
    </Form>
}