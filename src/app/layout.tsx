import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import { SiGooglemaps, SiInstagram, SiSpotify, SiTiktok, SiYoutube } from "@icons-pack/react-simple-icons";
import FooterGallery from "@/components/footer-gallery";
import Menu from "@/components/menu";
import Image from "next/image";
import Head from "next/head";
import BannerModal from "@/components/banner-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refúgio Lifestyle",
  description: "Somos uma rede de células pertencente a Igreja do Evangelho Quadrangular - Sede do Pará, que funciona de modo orgânico e relacional, objetivando despertar cada crente a fim de que possa desenvolver suas habilidades ministeriais e funcionar dentro do Reino."
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>

export default async function RootLayout({ children }: RootLayoutProps) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeria`, {
    cache: 'force-cache'
  })

  let { fotos } = await response.json()

  return (
    <html lang="en">
      <body className={cn('antialiased w-full min-h-screen flex', inter.className)}>
        <div className="w-full flex-1 flex flex-col items-start">
          <div id="main-section" className="w-full min-h-screen flex-1 flex flex-col bg-no-repeat bg-cover bg-center">
            <div className="w-full flex flex-row items-center justify-between p-6 lg:p-8">
              <Image width={144} height={48} priority={true} src="/refugio.png" alt="Logo da Refúgio" />
              <Menu />
            </div>
            <div className="flex-1 flex flex-col lg:flex-row items-center p-6 lg:py-0 lg:px-16 gap-x-8 lg:gap-x-10">
              <div className="hidden lg:flex flex-col justify-center items-center gap-4 my-4">
                <a href="https://www.instagram.com/refugio_lifestyle">
                  <SiInstagram color="#fff" size={18} />
                </a>
                <a href="https://www.tiktok.com/@refugio_lifestyle">
                  <SiTiktok color="#fff" size={18} />
                </a>
                <a href="https://www.youtube.com/@refugiolifestyle">
                  <SiSpotify color="#fff" size={18} />
                </a>
                <a href="https://open.spotify.com/show/2YJ3HxRyWu6e36K5f29j20">
                  <SiYoutube color="#fff" size={18} />
                </a>
              </div>
              <div className="flex-1 flex flex-col justify-center items-start py-4">
                {children}
                <BannerModal />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-[#1b1b1b]">
            <div className="w-full flex flex-col md:flex-row p-6 lg:px-16 lg:py-10 gap-8 lg:gap-20">
              <div className="flex flex-1 flex-col gap-6 text-center">
                <div className="flex flex-row justify-between">
                  <Image
                    width={48}
                    height={56}
                    priority={true}
                    src="/fire-white.png"
                    alt="Foguinho da Refúgio" />
                  <div className="flex lg:hidden flex-row justify-center items-center gap-4 my-4">
                    <a href="https://www.instagram.com/refugio_lifestyle">
                      <SiInstagram color="#fff" size={18} />
                    </a>
                    <a href="https://www.tiktok.com/@refugio_lifestyle">
                      <SiTiktok color="#fff" size={18} />
                    </a>
                    <a href="https://www.youtube.com/@refugiolifestyle">
                      <SiSpotify color="#fff" size={18} />
                    </a>
                    <a href="https://open.spotify.com/show/2YJ3HxRyWu6e36K5f29j20">
                      <SiYoutube color="#fff" size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-justify text-white font-thin">
                  Somos uma rede de células pertencente a Igreja do Evangelho Quadrangular - Sede do Pará, que funciona de modo orgânico e relacional, objetivando despertar cada crente a fim de que possa desenvolver suas habilidades ministeriais e funcionar dentro do Reino.
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <h4 className="text-white text-2xl font-thin">Galeria</h4>
                <FooterGallery fotos={fotos} />
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <h4 className="text-white text-2xl font-thin">Localização</h4>
                <div className='flex gap-6'>
                  <SiGooglemaps color="#ad1a1c" />
                  <a className='text-white' href="https://www.google.com/maps/place/Ref%C3%BAgio+Lifestyle/@-1.4315824,-48.4724636,15z/data=!4m5!3m4!1s0x0:0x6766cd6cdc1d7e5a!8m2!3d-1.4315733!4d-48.4724574">
                    Tv. Timbó, 1244, Pedreira, Belém - PA, Brasil
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-400 font-light py-4 px-6 lg:px-16 gap-8 lg:gap-20 text-left">
                © Refúgio Lifestyle. Todos os direitos reservados.
              </p>
          </div>
        </div>
      </body>
    </html>
  );
}
