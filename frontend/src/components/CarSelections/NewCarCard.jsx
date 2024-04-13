import React from 'react'
import { Link } from 'react-router-dom'

const NewCarCard = ({_id, model, brand, price, image, aosDelay}) => {

  return (
    <div className='space-y-3 border-2 border-dark  rounded-xl p-3
                    hover:border-primary relative group'
                    data-aos="fade-up"
                    data-aos-delay={aosDelay}>
                    <Link to={`/newcars/${_id}`}>
                        <div className='w-full h-[150px]'>  
                            <img className='w-full h-[120px] object-contain'
                            src={image} alt="" />
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-primary font-semibold'>{brand} {model}</h1>
                            <div className='flex justify-between items-center text-xl font-semibold'>
                                <p>{price}€</p>
                            </div>
                        </div>
                    </Link>
                    </div>
  )
}

export default NewCarCard;