import React from 'react'

import banner from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='dark:bg-black dark:text-white duration-300 relative -z-20'>
    <div className='container min-h-[720px] flex flex-col items-center'>

        <img src={ banner } data-aos="fade-up" alt=""
        className='mt-8 relative -z-10 max-h-[500px] sm:scale-105 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] sm:pt-20' />
    
    
    <div className='text-center order-1 sm:order-2 space-y-5'>
        <p className='pt-10 text-primary text-3xl font-serif'
        data-aos="fade-up"
        data-aos-delay="600"
        >Najveći autosalon u Hrvatskoj</p>
        <h1 className='text-4xl lg:text-5xl font-semibold font-serif'>AutoLoveRi</h1>
        <p>Odaberi neko od vozila iz naše široke ponude i svoju avanturu započni jednodnevnim izletom. <br />
        Tko zna, možda nađeš svog doživotnog limenog saputnika.</p>
    </div>

    </div>

    </div>
  )
}

export default Banner