import React from 'react'
import { Link } from 'react-router-dom'


import grid1 from '../assets/grid1.jpeg'
import grid2 from '../assets/grid2.jpg'
import grid3 from '../assets/grid3.jpeg'
import grid4 from '../assets/grid4.jpg'
import grid5 from '../assets/grid5.jpeg'
import grid6 from '../assets/grid6.jpeg'
import grid7 from '../assets/grid7.jpeg'
import grid8 from '../assets/grid8.png'


const NewsScreen = () => {
  return (
    <div className='pb-20 pt-14 bg-white dark:bg-black dark:text-white'>
    
    <div className="container mx-auto py-8">
    
    <h1 className='text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary'
              data-aos="fade-up">Ostanite u centru zbivanja</h1>
    <p className='text-md pb-6 text-center' data-aos="fade-up">Saznajte sve novosti iz auto svijeta</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <Link to='/article'>
      <div className="bg-primary/80 p-4 shadow-md rounded-lg  hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid1} />
        <p className="text-sm text-center">Novi Duster prodavat će se i kao Renault</p>
      </div>
      </Link>
      <div className="bg-white dark:bg-dark p-4 shadow-md rounded-lg  hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid2} />
        <p className="text-sm text-center">Hyundai prodao svoju tvornicu u Rusiji za 100 eura</p>
      </div>
      <div className="bg-primary/80 p-4 shadow-md rounded-lg  hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid3} />
        <p className="text-sm text-center">Stiže nova Alfa Romeo</p>
      </div>
      <div className="bg-white dark:bg-dark p-4 shadow-md rounded-lg  hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid4} />
        <p className="text-sm text-center">I Range Rover prelazi na struju</p>
      </div>
      <div className="bg-white dark:bg-dark p-4 shadow-md rounded-lg hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid5} />
        <p className="text-sm text-center">Nova Lancia Y</p>
      </div>
      <div className="bg-primary/80 p-4 shadow-md rounded-lg hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid6} />
        <p className="text-sm text-center">VW najavio novu generaciju legendarnog kombija</p>
      </div>
      <div className="bg-white dark:bg-dark p-4 shadow-md rounded-lg hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid7} />
        <p className="text-sm text-center">Najsnažniji Mercedes SL u povijesti</p>
      </div>
      <div className="bg-primary/80 p-4 shadow-md rounded-lg hover:scale-110">
        <img className="w-full h-48 object-cover mb-4" alt="car1" src={grid8} />
        <p className="text-sm text-center">Rusi obnovili Ladu Nivu</p>
      </div>
      
    </div>
  </div>
  </div>
);
}

export default NewsScreen