import React from 'react'
import { Link } from 'react-router-dom'

import UsedCarsSelection from '../components/CarSelections/UsedCarsSelection'


const UsedCarsScreen = () => {
  return (
    <div className='pb-10 pt-14 bg-white dark:bg-black dark:text-white'>
        <div className="container">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'></div>

              <h1 className='text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary'
              data-aos="fade-up">Rabljena vozila</h1>

          <p className='text-sm pb-6 text-center' data-aos="fade-up">
          Pregledajte ponudu rabljenih vozila u odličnom stanju. </p>

        {/*popis auta */}
        <UsedCarsSelection />


    {/*ovdje dodati još odabir po 3 kategorije*/}


    </div>
    </div>
    
  )
}

export default UsedCarsScreen