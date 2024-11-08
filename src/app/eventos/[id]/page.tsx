import Image from "next/image";

import { EventoType } from "@/types/evento";
import { Loader2 } from "lucide-react";
import CadastrarInscrito from "@/components/cadastrar-inscrito";
import BackgroundMainSection from "@/components/background-main-section";
import { Metadata } from "next";

type EventoProps = {
    params: {
        id: string
    }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: EventoProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${params.id}`)
    const { evento } = await response.json() as { evento: EventoType }

    return {
        title: `${evento.titulo} :: Refúgio Lifestyle`,
        description: "Somos uma rede de células pertencente a Igreja do Evangelho Quadrangular - Sede do Pará, que funciona de modo orgânico e relacional, objetivando despertar cada crente a fim de que possa desenvolver suas habilidades ministeriais e funcionar dentro do Reino.",
        openGraph: {
            images: evento.flyer
        }
    } as Metadata
}

export default async function Evento({ params }: EventoProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${params.id}`)
    const { evento } = await response.json() as { evento: EventoType }

    return <div className="flex flex-col md:flex-row justify-around items-center space-y-20 md:space-y-0 space-x-0 md:space-x-20 w-full">
        <BackgroundMainSection url={evento.fundo} />
        <Image
            width={400}
            height={400}
            priority={true}
            src={evento.logo}
            objectFit="contain"
            alt={`Logo da ${evento.titulo}`} />
        <CadastrarInscrito evento={evento} />
    </div>;
}
