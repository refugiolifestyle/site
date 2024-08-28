"use client"

import LightGallery from 'lightgallery/react';
import Image from 'next/image';

export default function FooterGallery({ fotos }: { fotos: string[] }) {
    return <LightGallery
        speed={500}
        download={false}
        elementClassNames='grid grid-cols-3 gap-4 w-fit'>
        {
            fotos.map((foto, i) => (
                <a className={i >= 6 ? 'hidden' : ''} href={foto} key={`refugio-gallery-${++i}`}>
                    <Image width={100} height={100} objectFit='cover' alt={`Refúgio ${++i}`} src={foto} />
                </a>
            ))
        }
    </LightGallery>
}