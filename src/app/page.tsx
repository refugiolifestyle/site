import { Metadata } from "next";
import Image from "next/image";

export default async function Home() {
  return <>
    <Image
      fill
      priority={true}
      src="/bg-layout.jpg"
      alt="Fundo com a logo da Conferência"
      className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-50" />
    <h1 className="text-white text-6xl font-thin">Culto Refúgio</h1>
    <h4 className="text-white text-2xl font-thin">Domingo, 20 hrs</h4>
    <div className="h-1 w-24 my-4 bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]" />
  </>;
}
