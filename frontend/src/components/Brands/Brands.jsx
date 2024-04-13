import React from 'react'

import brand1 from '../../assets/brand1.png'
import brand2 from '../../assets/brand2.png'
import brand3 from '../../assets/brand3.png'
import brand4 from '../../assets/brand4.png'
import brand5 from '../../assets/brand5.png'
import brand6 from '../../assets/brand6.png'
import brand7 from '../../assets/brand7.png'
import brand8 from '../../assets/brand8.png'

const Brands = () => {
  return (
<div className='dark:bg-black dark:text-white duration-300 bg-primary sm:min-h-[600px] sm:grid sm:place-items-center'>
  <div className="container">
    <h1 className='text-center text-3xl sm:text-4xl font-bold font-serif' data-aos="fade-up">
      Vozila najpoznatijih svjetskih brendova
    </h1>

    <div className='grid lg:grid-cols-8 sm:grid-cols-4 justify-center space-y-5 sm:p-16 pb-6 gap-10'>
      <div className='flex items-center transition-transform transform hover:scale-105'>
        <img src={brand1} className='object-contain' alt="" />
      </div>
      <div className='flex items-center transition-transform transform hover:scale-105'>
        <img src={brand2} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
        <img src={brand3} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
        <img src={brand4} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
      <img src={brand5} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
        <img src={brand8} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
        <img src={brand6} className='object-contain' alt="" />
      </div>
      <div className=' flex items-center transition-transform transform hover:scale-105'>
        <img src={brand7} className='object-contain' alt="" />
      </div>   
    </div>
  </div>
</div>

  )
}

export default Brands