"use client"

import { EventoType } from "@/app/api/eventos/route"
import { Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type EventoItemProps = {
    evento: EventoType
}

export default function EventoItem({ evento }: EventoItemProps) {
    const [muted, setMuted] = useState(true)

    return <div className="evento">
        <video
            playsInline={true}
            loop={true}
            muted={muted}
            autoPlay={true}
            controls={false}
            className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-25 pointer-events-none">
            <source src={evento.chamada} type="video/mp4" />
        </video>
        <div
            onClick={() => setMuted(o => !o)}
            className="absolute bottom-4 right-4 cursor-pointer border rounded-full p-2 flex justify-center items-center">
            {
                muted
                    ? <VolumeX color="#fff" />
                    : <Volume2 color="#fff" />
            }
        </div>
        <a href={'#'} className=" cursor-pointer p-4 border border-white rounded-xl flex flex-col md:flex-row items-start md:items-center gap-6 bg-neutral-700 bg-opacity-50 hover:bg-opacity-75">
            <Image width={86} height={86} objectFit="contain" src={evento.logo} alt={`Logo ${evento.titulo}`} />
            <div className="flex flex-col">
                <h1 className="text-white text-2xl">{evento.titulo}</h1>
                <h4 className="text-gray-300 font-light">Inscrições em breve</h4>
            </div>
        </a>
    </div>
}