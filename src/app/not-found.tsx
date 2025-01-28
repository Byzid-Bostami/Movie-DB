import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-black min-h-screen flex items-center justify-center'>
       <div className='flex flex-col items-center space-y-2'>
       <h2 className='text-9xl md:text-[250px] text-cyan-500 font-bold'>404</h2>
       <p className='text-white text-xl font-semibold uppercase'>Page Not Found</p>
       </div>
    </div>
  )
}

export default NotFound