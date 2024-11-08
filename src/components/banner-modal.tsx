"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BannerModal() {
  const [bannerOpen, setBannerOpen] = useState(true)

  return <Dialog open={bannerOpen} onOpenChange={setBannerOpen} modal={true}>
      <DialogContent className="w-full max-w-[1000px] aspect-video rounded border-none">
        <Link href="/eventos">
          <Image
            fill
            priority={true}
            src="/banner.jpeg"
            alt="Promo festa da colheita"
            className="rounded" />
        </Link>
      </DialogContent>
    </Dialog>
}
