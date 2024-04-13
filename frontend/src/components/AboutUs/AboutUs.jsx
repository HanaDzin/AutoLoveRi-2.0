import React from 'react'

import yellowCar from '../../assets/yellowCar.png'

const AboutUs = () => {
  return ( 
  <div className='dark:bg-black dark:text-white duration-300 
  bg-primary
  sm:min-h-[600px] sm:grid sm:place-items-center'>
  <div className="container">
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">

      <div>
        <div className='space-y-5 sm:p-16 pb-6'>
          <h1 className='text-3xl sm:text-4xl font-bold font-serif'
          data-aos="fade-up">Zašto odabrati nas?</h1>
          <p data-aos="fade-up">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cupiditate corrupti recusandae, 
          perspiciatis temporibus aspernatur iste quidem id adipisci, ex libero voluptatibus suscipit delectus
          porro a asperiores dolores obcaecati veritatis!</p>
          <p data-aos="fade-up">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Temporibus aperiam mollitia placeat possimus fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
      </div>

      <div 
        data-aos="slide-right"
        className='grid'>

          <div className='flex items-center p-2'>
            <img src={yellowCar}  alt="" />
          </div>
      </div>


    </div>
  </div>
    </div>
  )
}

export default AboutUs