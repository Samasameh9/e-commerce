'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image'
import { CategoriesInterface } from '@/types/CategoriesInterface'
export default function CategoriesSliderCard({categories}:{categories:CategoriesInterface[]}) {
  return<>
  
  
  
    <div className="w-full ">
     <Swiper
     modules={[Autoplay]}
     autoplay={{
      delay:1000
     }}
      spaceBetween={0}
      loop={true}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
{categories?.map((category) => (
  <SwiperSlide key={category._id}>
    <div className="relative w-full h-[200px]">
      <Image
        src={category.image}
        alt="img"
        fill
        className="object-fill"
      />
    </div>
  </SwiperSlide>
))}




     
    </Swiper>
    
  </div>
  </>
}
