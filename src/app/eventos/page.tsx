import Image from "next/image";

import EventoItem from "@/components/evento-item";
import { EventoType } from "@/types/evento";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Eventos :: Refúgio Lifestyle",
  description: "Somos uma rede de células pertencente a Igreja do Evangelho Quadrangular - Sede do Pará, que funciona de modo orgânico e relacional, objetivando despertar cada crente a fim de que possa desenvolver suas habilidades ministeriais e funcionar dentro do Reino."
};

export default async function Eventos() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos`)
  const { eventos } = await response.json() as { eventos: EventoType[] }

  return <>
    <h1 className="text-white text-6xl font-thin">Eventos</h1>
    <div className="h-1 w-24 my-4 bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]" />
    {
      eventos && eventos.length
        ? eventos.map(item => <EventoItem key={item.id} evento={item} />)
        : <>
          <Image
            fill
            priority={true}
            src="/bg-layout.jpg"
            alt="Fundo com a logo da Conferência"
            className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-50" />
          {
            eventos == undefined
              ? <Loader2 className="animate-spin text-white" />
              : <h4 className="text-white text-2xl font-thin">Logo teremos mais eventos, visite nosso culto para novidades.</h4>
          }
        </>
    }
  </>;
}
