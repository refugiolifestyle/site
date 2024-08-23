import Image from "next/image";

import { EventoType } from "@/app/api/eventos/route";
import { FormCard } from "@/components/form-card";

type EventoProps = {
    params: {
        id: string
    }
}

export default async function Evento({ params }: EventoProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${params.id}`)
    const { evento } = await response.json() as { evento: EventoType }

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
