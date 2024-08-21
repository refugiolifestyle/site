"use client";

import { VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Eventos() {
  const [muted, setMuted] = useState(true)

  return <>
    <h1 className="text-white text-6xl font-thin">Eventos</h1>
    <div className="h-1 w-24 my-4 bg-gradient-to-r from-[#ad1a1c] to-[#830b0c]" />
    <div className="evento">
      <video
        loop={true}
        muted={muted}
        autoPlay={true}
        controls={false}
        className="absolute bottom-0 left-0 top-0 right-0 object-cover z-[-1] w-full h-screen brightness-25">
        <source src="/conferencia2024/chamada.mp4" type="video/mp4" />
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
      <a href="#" className=" cursor-pointer p-4 border border-white rounded-xl flex flex-col md:flex-row items-start md:items-center gap-6 bg-neutral-700 bg-opacity-50 hover:bg-opacity-75">
        <Image width={86} height={86} objectFit="contain" src="/conferencia2024/logo.png" alt="Logo conferencia 2024" />
        <div className="flex flex-col">
          <h1 className="text-white text-2xl">Be Loud Conferência 2k24</h1>
          <h4 className="text-gray-300 font-light">Inscrições em breve</h4>
        </div>
      </a>
    </div>
  </>;
}
