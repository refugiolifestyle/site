"use client"

import Image from "next/image";

import { FormCard } from "@/components/form-card";
import { EventoType } from "@/types/evento";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type EventoProps = {
    params: {
        id: string
    }
}

export default function Evento({ params }: EventoProps) {
    const [evento, setEvento] = useState<EventoType>()

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getEvento?eventoId=${params.id}`)
            const data = await response.json() as { evento: EventoType }

            setEvento(data.evento)
        })();
    }, [])
    
    if (!evento) {
        return <div className="flex-1 flex items-center justify-center">
            <div className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full min-h-screen brightness-50 bg-black" />
            <Loader2 className="animate-spin text-white" />
        </div>
    }

    return <>
        <Image
            fill
            objectFit="cover"
            priority={true}
            src={evento.fundo}
            alt={`Fundo com a logo da ${evento.titulo}`}
            className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full min-h-screen brightness-50" />
        <div className="flex flex-col md:flex-row justify-around items-center gap-20 w-full">
            <Image
                width={400}
                height={400}
                priority={true}
                src={evento.logo}
                objectFit="contain"
                alt={`Logo da ${evento.titulo}`} />
            <FormCard evento={evento} />
        </div>
    </>;
}
