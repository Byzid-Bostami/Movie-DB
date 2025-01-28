import React from 'react'
import Image from 'next/image';
const Footer = () => {
  return (
    <div className='bg-[#03213A]'>
        <div className='container mx-auto px-3 md:px-8 lg:px-16 py-4'>
            <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center'>
            <Image
             src="/big-logo.svg"
             alt="movie db"
             width={100}
             height={100}
            />

            <p className='text-teal-400 font-normal capitalize text-lg'>all copyrights <span>&copy;</span> reserved by <a className='font-medium text-pink-500 text-base hover:text-cyan-500 uppercase' href="https://www.linkedin.com/in/byzidbostami/" target="_blank" rel="noopener noreferrer">Byzid Bostami</a></p>
            </div>
            
        </div>
    </div>
  )
}

export default Footer;