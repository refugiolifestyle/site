"use client";

import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import LightGallery from 'lightgallery/react';

export default function FooterGallery() {
    const [fotos, setFotos] = useState<string[]>()

    useEffect(() => {
        carregarFotos();
    }, [])

    const carregarFotos = async () => {
        let response = await fetch('/api/footer-gallery')
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
                <a className={i >= 6 ? 'hidden' : ''} href={foto} key={`refugio-gallery-${++i}`}>
                    <img alt={`Refúgio ${++i}`} src={foto} />
                </a>
            ))
        }
    </LightGallery>
}