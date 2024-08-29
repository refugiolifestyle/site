"use client"

import Image from "next/image";

import { EventoType } from "@/types/evento";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FormItem, FormLabel, FormControl, FormDescription, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { InscritoType } from "@/types/inscrito";
import { FormCardValidarInscrito } from "@/components/form-card-validar-inscrito";
import { FormCardCadastrarInscrito } from "@/components/form-card-cadastrar-inscrito";

type EventoProps = {
    params: {
        id: string
    }
}

export default function Evento({ params }: EventoProps) {
    const [evento, setEvento] = useState<EventoType>()
    const [inscrito, setInscrito] = useState<InscritoType | null>()

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getEvento?eventoId=${params.id}`)
            const data = await response.json() as { evento: EventoType }

            setEvento(data.evento)
        })();
    }, [])

    if (!evento) {
        return <div className="flex-1 flex items-center justify-center">
          <Image
            fill
            priority={true}
            src="/bg-layout.jpg"
            alt="Fundo com a logo da Conferência"
            className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-50" />        
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
            {
                !inscrito?.cpf
                    ? <FormCardValidarInscrito evento={evento} setInscrito={values => setInscrito(values)} />
                    : <FormCardCadastrarInscrito evento={evento} handleVoltar={() => setInscrito(undefined)} inscrito={inscrito} />
            }
        </div>
    </>;
}
