import Image from 'next/image'
import React from 'react'
import logo from "./../../../assets/freshcart-logo.svg";

export default function Footer() {
  return <>
  <div className='flex bg-gray-300 mt-3  font-bold text-xl  justify-center items-center py-5'> <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image height={100} width={150} src={logo} alt="logo" />
          </a></div>
  
  </>
}
