"use client"

import { FooterGalleryGET } from '@/app/api/footer-gallery/route';
import LightGallery from 'lightgallery/react';
import Image from 'next/image';

type FooterGalleryProps = FooterGalleryGET

export default function FooterGallery({ fotos }: FooterGalleryProps) {
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