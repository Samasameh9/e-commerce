 'use client'
 import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

export function ProductImg({images}:{images:string[]}) {
  return (
   <Carousel
    plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
     opts={{
    loop: true,
  }}>
  <CarouselContent>
   {images.map((src)=>{return  <CarouselItem><Image width={300} height={400} src={src} alt='image' className="w-full"/></CarouselItem>})}
  
  </CarouselContent>

</Carousel>
  )
}
