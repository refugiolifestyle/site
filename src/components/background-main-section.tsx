"use client"

import { useEffect } from "react";

export default function BackgroundMainSection({ url }: { url: string }) {
    useEffect(() => {
        const element = document.getElementById('main-section')
        const style = element?.style
        
        if (style) {
            style.backgroundImage = `url(${url})`
        }
    }, [])

    return null
}