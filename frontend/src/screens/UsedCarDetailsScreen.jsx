import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsedCarDetailsQuery } from '../slices/usedCarsApiSlice';
import { useDispatch } from 'react-redux';

import {addToCart} from '../slices/cartSlice.js'
import { useState } from 'react';

import calendar from '../assets/calendar.png'
import fuel from '../assets/fuel.png'
import seats from '../assets/seats.png'
import transmission from '../assets/transmission.png'
import motorway from '../assets/motorway.png'
import key from '../assets/key.png'

const UsedCarDetailsScreen = () => {

  const { id } = useParams(); 
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: usedCar, isLoading, error } = useGetUsedCarDetailsQuery(id);

  const addToCartHandler = () => {
    dispatch(addToCart({...usedCar, qty}));
    navigate('/cart');
  }

  return (
    <div className='dark:bg-black dark:text-white duration-300 bg-white sm:min-h-[600px] sm:grid sm:place-items-center'>
    { isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
        {error?.data?.message || error.error}
      </div>
    ) : (
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">

          <div className='flex items-center p-5' data-aos="slide-left">
              <img src={usedCar.image} alt="" /> 
          </div> 

          <div className='grid grid-rows-3 sm:p-16'>
              <h1 className='text-3xl sm:text-4xl font-bold font-serif text-center' data-aos="fade-up">{usedCar.brand} {usedCar.model}</h1>
              <div className='grid grid-cols-5'>
                <div className='px-8 text-center font-bold transition-transform transform hover:scale-105'>
                  <img src={calendar} className='pb-4 dark:text-white'/>{usedCar.makeYear}
                </div>
                <div  className='px-8 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={fuel} className='pb-4 dark:text-white'/>{usedCar.motor}
                </div>
                <div  className='px-8 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={transmission} className='pb-4 dark:text-white'/>{usedCar.transmission}
                </div>
                <div  className='px-8 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={key} className='pb-4 dark:text-white'/>{usedCar.numOfOwners}
                </div>
                <div  className='px-8 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={motorway} className='pb-4 dark:text-white'/>{usedCar.mileage} km</div>
                </div>
                <div><h3 className='py-4 text-primary font-bold text-xl'>Trenutna i moguća dodatna oprema vozila:</h3>
              <p>{usedCar.description}</p>
              </div>  
          </div>

      </div>
      <div className='dark:text-primary grid text-4xl place-content-center'>
          Cijena: {usedCar.price} €
        </div>
         
        <div className='grid place-content-center mt-6 pb-6'>
            <button  
              onClick={addToCartHandler}
              className='button-outline text-black dark:bg-primary dark:text-black border-primary hover:scale-105'
              >Naruči odmah</button>
        </div>
    </div> 
    )}
  </div>
  );
}

export default UsedCarDetailsScreen;
