import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { EventoType } from "@/types/evento"
import { Share } from "lucide-react"
import { useCallback } from "react"
import { Button } from "../ui/button"

export default function Fechada({ evento }: { evento: EventoType }) {
    const share = useCallback(async () => {
        try {
            await navigator.share({
                title: evento.titulo,
                text: "Compartilhe com sua célula e seus amigos para que todos fiquem atentos às próximas novidades do melhor show do ano! Não perca a oportunidade de garantir seu lugar quando as inscrições abrirem!",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/eventos/${evento.id}`
            });
        } catch (err: any) {
            alert(`Falha ao compartilhar. (${err.message})`)
        }
    }, [])

    return <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">{evento.titulo}</CardTitle>
            <CardDescription className="text-justify">
                Inscrições fechadas
            </CardDescription>
        </CardHeader>
        <CardContent className="text-justify">
            Compartilhe com sua célula e seus amigos para que todos fiquem atentos às próximas novidades do melhor evento do ano! Não perca a oportunidade de garantir seu lugar quando as inscrições abrirem!
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button
                onClick={share}
                className="w-full bg-[#fdaf00] hover:bg-[#feef00] text-black">
                <Share className="me-2" />
                Compartilhar
            </Button>
        </CardFooter>
    </Card>
}