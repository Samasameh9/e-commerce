'use client'
import React from 'react'
import img1 from './../../../assets/grocery-banner-2.jpeg'
import img2 from './../../../assets/grocery-banner.png'
import img3 from './../../../assets/slider-image-1.jpeg'
import img4 from './../../../assets/slider-image-2.jpeg'
import img5 from './../../../assets/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image'
export default function MainSlider() {
  return<>
  
  
  <div className="flex">
    <div className="w-3/4 h-[200px]  md:h-[370px]  overflow-hidden">
     <Swiper
     modules={[Autoplay]}
     autoplay={{
      delay:1000
     }}
      spaceBetween={0}
      loop={true}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide ><Image className='w-full object-fill  object-center'   src={img3} alt="img3"/></SwiperSlide>
      <SwiperSlide ><Image className='w-full object-fill   object-center'  src={img4} alt="img4"/></SwiperSlide>
      <SwiperSlide><Image className='w-full object-fill   object-center'  src={img5} alt="img5"/></SwiperSlide>
    </Swiper>
    </div>
    <div className="w-1/4 h-[200px] md:h-[370px] overflow-hidden">
<div ><Image className='w-full object-fill  object-center h-[117px] sm:h-[110px] md:h-[200px] ' src={img1} alt="img1" /></div>
   <div ><Image className='w-full object-fill  object-center h-[117px] sm:h-[110px] md:h-[200px] '  src={img2} alt="img2"  /></div> 
    </div>
  </div>
  </>
}
