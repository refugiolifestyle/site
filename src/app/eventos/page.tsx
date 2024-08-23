import Image from "next/image";

import { EventoType } from "@/app/api/eventos/route";
import Evento from "@/components/evento";

export default async function Eventos() {
  const response = await fetch('http://localhost:3000/api/eventos')
  const { eventos } = await response.json() as { eventos: EventoType[] }

  return <>
    <h1 className="text-white text-6xl font-thin">Eventos</h1>
    <div className="h-1 w-24 my-4 bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]" />
    {
      !eventos.length
        ? <>
          <h4 className="text-white text-2xl font-thin">Logo teremos mais eventos, visite nosso culto para novidades.</h4>
          <Image
            fill
            priority={true}
            src="/bg-layout.jpg"
            alt="Fundo com a logo da Conferência"
            className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-50" />
        </>
        : eventos.map(item => <Evento key={item.id} evento={item} />)
    }
  </>;
}
