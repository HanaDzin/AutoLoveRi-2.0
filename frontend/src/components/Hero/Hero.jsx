import React from 'react'

import blackCar from '../../assets/blackBMW.png'
import whiteCar from '../../assets/whiteCar.png'
import { Link } from 'react-router-dom'

const Hero = ({theme}) => {
  return (
    <div className='dark:bg-black dark:text-white duration-300 relative -z-20'>
     <div className='container min-h-[720px] flex'>
      <div className='grid place-items-center grid-cols-1 
    md:grid-cols-2 sm:grid-cols-2'
    data-aos="zoom-in" data-aos-duration="1000">

    <div className='order-1 sm:order-2'>
        <img src={ theme == "dark" ? blackCar : whiteCar } alt=""
        className='relative -z-10 max-h-[500px] sm:scale-105 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]' />
    </div>
    <div className='order-2 sm:order-1 space-y-5 sm:pr-32'>
        <p className='text-primary text-3xl font-serif'
        data-aos="fade-up"
        data-aos-delay="600"
        >Brzo. Pouzdano. Jednostavno.</p>
        <h1 className='text-4xl lg:text-5xl font-semibold font-serif'>Isprobaj, iznajmi ili kupi.</h1>
        <p>Odaberi neko od vozila iz naše široke ponude i svoju avanturu započni jednodnevnim izletom. <br />
        Tko zna, možda nađeš svog doživotnog limenog saputnika.</p>

    </div>

    </div>

    </div>

    </div>
  )
}

export default Hero