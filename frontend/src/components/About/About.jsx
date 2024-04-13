import React from 'react'

import cheap from '../../assets/cheap.png'
import fast from '../../assets/fast.png'
import cars from '../../assets/cars.png'

const About = () => {
  return ( 
  <div className='dark:bg-black dark:text-white duration-300 
  bg-primary
  sm:min-h-[600px] sm:grid sm:place-items-center'>
  <div className="container">
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
      <div 
        data-aos="slide-right"
        className='grid grid-rows-3'>

          <div className='flex items-center p-5'>
            <img src={cheap} className='h-20 px-3 py-3' alt="" />
            <div className='ml-4'>
              <h1 className='text-2xl font-semibold dark:text-primary'>Povoljno</h1>
              <p className='mt-2'>Garantirano najpovoljnije cijene na tržištu.</p>
            </div>
          </div>

          <div className='flex items-center p-5'>
            <img src={fast} className='h-20 px-3 py-3' alt="" />
            <div className='ml-4'>
              <h1 className='text-2xl font-semibold dark:text-primary'>Brzo i sigurno</h1>
              <p className='mt-2'>Do vozila iz snova za svega nekoliko minuta.</p>
            </div>
          </div>

          <div className='flex items-center p-5'>
            <img src={cars} className='h-20 px-3 py-3' alt="" />
            <div className='ml-4'>
              <h1 className='text-2xl font-semibold dark:text-primary'>Široki asortiman</h1>
              <p className='mt-2'>Raznolika ponuda automobila svih kategorija.</p>
            </div>
          </div>

      </div>

    <div>
        <div className='space-y-5 sm:p-16 pb-6'>
        <h1 className='text-3xl sm:text-4xl font-bold font-serif'
        data-aos="fade-up">Zašto odabrati nas?</h1>
        <p  data-aos="fade-up">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cupiditate corrupti recusandae, 
        perspiciatis temporibus aspernatur iste quidem id adipisci, ex libero voluptatibus suscipit delectus
         porro a asperiores dolores obcaecati veritatis!</p>
        <p data-aos="fade-up">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Temporibus aperiam mollitia placeat possimus fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    </div>
    </div>
    </div>
  </div>
    </div>
  )
}

export default About