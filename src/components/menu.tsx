"use client"

import { usePathname, useRouter } from "next/navigation"

export default function Menu() {
    const path = usePathname()

    const menus = [
        { href: '/', titulo: 'Início' },
        { href: '/eventos', titulo: 'Eventos' }
    ]

    return <nav className="flex flex-row gap-4 text-white font-normal text-lg">
        {
            menus.map(menu => (
                <a href={menu.href} className="hover:text-gray-400">
                    {menu.titulo}
                    {
                        path === menu.href
                            ? <div className="h-1 w-12 bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]" />
                            : null
                    }
                </a>
            ))
        }
    </nav>
}