import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { StepProps, Steps } from ".."
import { PagamentoModal } from "../pagamento-modal"
import { PagamentoMoneyModal } from "../pagamento-money-modal"

export default function Pagamentos({ setStep, setInscrito, inscrito, reset, evento }: StepProps) {
    const [checkout, setCheckout] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [meioPagamento, setMeioPagamento] = useState<"pix" | "credit_card" | "money">("pix")

    async function onSubmit() {
        setLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento/${meioPagamento}`, {
                method: 'POST',
                body: JSON.stringify(inscrito?.pagamentosAFazer)
            })
            const data = await response.json() as {
                message?: string
                checkout?: string
                txid?: string
            }

            if (!response.ok) {
                alert(data.message)
                return false
            }

            let pagamentoEfetivado = false
            if (meioPagamento != "money") {
                setCheckout(data.checkout)

                pagamentoEfetivado = await new Promise<boolean>(async (resolve, reject) => {
                    let looping = 1
                    while (looping > 0 && looping <= 60) {
                        await new Promise(r => {
                            setTimeout(r, 5000)
                        })

                        try {
                            const responseVP = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${evento.id}/inscricoes/${inscrito?.cpf}/pagamento/${data.txid}/status`, { cache: "no-cache" })
                            if (!responseVP.ok) {
                                throw new Error()
                            }

                            const { status } = await responseVP.json() as { status: string }

                            looping = !['CONCLUIDA', 'paid'].includes(status) ? looping + 1 : 0
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
            } else {
                pagamentoEfetivado = true
            }

            if (pagamentoEfetivado) {
                setCheckout(undefined)
                setStep(meioPagamento == "money" ? Steps.FINALIZACAO_MONEY : Steps.FINALIZACAO)
                return true
            } else {
                setCheckout(undefined)
                reset()
                return false
            }
        } catch (e: any) {
            alert("Falha ao gerar o pagamento, avise sua liderança e tente mais tarde.")
        } finally {
            setLoading(false)
        }
    }

    const pagamentoTotaisPix = inscrito?.pagamentosAFazer?.reduce((a, p) => a + p.valores['pix'], 0)
    const pagamentoTotaisCartao = inscrito?.pagamentosAFazer?.reduce((a, p) => a + p.valores['credit_card'], 0)
    const pagamentoTotaisMoney = inscrito?.pagamentosAFazer?.reduce((a, p) => a + p.valores['money'], 0)

    return <>
        <PagamentoModal url={checkout} />
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Pagamento</CardTitle>
                <CardDescription>Selecione a forma de pagamento que deseja utilizar</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                {
                    evento.tiposPagamentos?.includes("pix")
                    && <Button
                        variant={"ghost"}
                        onClick={() => setMeioPagamento("pix")}
                        className={`border w-full h-full max-h-[80px] flex flex-col justify-between items-start px-4 py-2 space-y-2 ${meioPagamento === "pix" ? 'bg-muted border border-[#fdaf00]' : ''}`}>
                        <h1 className="text-left text-lg font-semibold">Pix</h1>
                        <ul className="text-left text-xs font-light">
                            <li><b>Total:</b> {pagamentoTotaisPix?.toLocaleString('pt-BR', { currency: "BRL", style: "currency" })}</li>
                        </ul>
                    </Button>
                }
                {
                    evento.tiposPagamentos?.includes("credit_card")
                    && <Button
                        variant={"ghost"}
                        onClick={() => setMeioPagamento("credit_card")}
                        className={`border w-full h-full max-h-[80px] flex flex-col justify-between items-start px-4 py-2 space-y-2 ${meioPagamento === "credit_card" ? 'bg-muted border border-[#fdaf00]' : ''}`}>
                        <h1 className="text-left text-lg font-semibold">Cartão de crédito</h1>
                        <ul className="text-left text-xs font-light">
                            <li><b>Total:</b> {pagamentoTotaisCartao?.toLocaleString('pt-BR', { currency: "BRL", style: "currency" })}</li>
                        </ul>
                    </Button>
                }
                {
                    evento.tiposPagamentos?.includes("money")
                    && <Button
                        variant={"ghost"}
                        onClick={() => setMeioPagamento("money")}
                        className={`border w-full h-full max-h-[80px] flex flex-col justify-between items-start px-4 py-2 space-y-2 ${meioPagamento === "money" ? 'bg-muted border border-[#fdaf00]' : ''}`}>
                        <h1 className="text-left text-lg font-semibold">Dinheiro</h1>
                        <ul className="text-left text-xs font-light">
                            <li><b>Total:</b> {pagamentoTotaisMoney?.toLocaleString('pt-BR', { currency: "BRL", style: "currency" })}</li>
                        </ul>
                    </Button>
                }
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                {
                    evento.temPromocao && evento.temPromocaoMeiosPagamentos?.includes(meioPagamento)
                        ? <PagamentoMoneyModal loading={loading} onSubmit={onSubmit} evento={evento} />
                        : <Button
                            disabled={loading}
                            onClick={onSubmit}
                            className="w-full bg-[#fdaf00] hover:bg-[#feef00] text-black">
                            Pagar
                        </Button>
                }
                <a href="#" className="text-sm" onClick={() => setStep(s => evento.pagamentos.length > 1 ? s - 1 : s - 2)}>
                    Voltar
                </a>
            </CardFooter>
        </Card>
    </>
}