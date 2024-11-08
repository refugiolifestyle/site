import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z
    .object({
        termo_1: z.boolean().refine((termo_1) => !!termo_1),
        termo_2: z.boolean().refine((termo_2) => !!termo_2),
    })

export function PagamentoMoneyModal({ onSubmit, loading }: { loading: boolean, onSubmit: () => Promise<boolean | undefined> }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            termo_1: false,
            termo_2: false
        }
    });

    return (
        <Dialog modal={true}>
            <DialogTrigger asChild>
                <Button className="w-full bg-[#fdaf00] hover:bg-[#feef00] text-black">
                    Pagar
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Pagamento em Dinheiro</DialogTitle>
                            <DialogDescription>
                                Fique atento as informações abaixo.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 my-4">
                            <FormField
                                control={form.control}
                                name={`termo_1`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />

                                        </FormControl>
                                        <FormLabel className="leading-5 text-justify">Nos dias 10 e 12 de novembro será realizado o pagamento em espécie, juntamente com a retirada de sua pulseira de identificação.</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`termo_2`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-y-0 space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />

                                        </FormControl>
                                        <FormLabel className="leading-5 text-justify"><b>O não comparecimento nas datas listadas acima resultará na perda da promoção</b>, necessitando a mudança da forma de pagamento escolhido.</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                disabled={loading || !form.formState.isValid}
                                className="w-full bg-[#fdaf00] hover:bg-[#feef00] text-black" type="submit">Finalizar pagamento</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
