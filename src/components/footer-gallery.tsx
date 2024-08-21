"use client";

import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import LightGallery from 'lightgallery/react';
import Image from 'next/image';

export default function FooterGallery() {
    const [fotos, setFotos] = useState<string[]>()

    useEffect(() => {
        carregarFotos();
    }, [])

    const carregarFotos = async () => {
        let response = await fetch('/api/footer-gallery', {
            cache: 'force-cache',
            next: {
                revalidate: 30 * 24 * 3600 // dia * horas * segundos
            }
        })
        let data = await response.json()

        setFotos(data.fotos)
    }

    if (!fotos) {
        return <LoaderCircle color='#fff' className="animate-spin" />;
    }

    return <LightGallery
        speed={500}
        download={false}
        elementClassNames='grid grid-cols-3 gap-4'>
        {
            fotos.map((foto, i) => (
                <a className={`relative size-28 ${i >= 6 ? 'hidden' : ''}`} href={foto} key={`refugio-gallery-${++i}`}>
                    <Image fill objectFit="contain" alt={`Refúgio ${++i}`} src={foto} />
                </a>
            ))
        }
    </LightGallery>
}