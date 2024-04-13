import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetNewCarDetailsQuery } from '../slices/newCarsApiSlice';
import {useDispatch } from 'react-redux';

import {addToCart} from '../slices/cartSlice.js'
import { useState } from 'react';

import calendar from '../assets/calendar.png'
import fuel from '../assets/fuel.png'
import seats from '../assets/seats.png'
import transmission from '../assets/transmission.png'


const NewCarDetailsScreen = () => {
  const { id } = useParams(); 
  const [qty, setQty] = useState(1);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: newCar, isLoading, error } = useGetNewCarDetailsQuery(id);

  const addToCartHandler = () => {
    dispatch(addToCart({...newCar, qty}));
    navigate('/cart');
  }

  return (
    <div className='mt-10 dark:bg-black dark:text-white duration-300 bg-white sm:min-h-[600px] sm:grid sm:place-items-center'>
    <div className="container">
    { isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
        {error?.data?.message || error.error}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center">
          <div className='flex items-center p-5' data-aos="slide-right">
            <img src={newCar.image} className='p-5'/>   
          </div>

          <div>
            <div className='grid grid-rows-3 sm:p-16 pb-12 dark:text-white'>
              <h1 className='text-3xl sm:text-4xl font-bold font-serif text-center' data-aos="fade-up">{newCar.brand} {newCar.model}</h1>
              <div className='grid grid-cols-4'>
                <div className='px-10 text-center font-bold transition-transform transform hover:scale-105'>
                  <img src={calendar} className='pb-4 dark:text-white' />{newCar.makeYear}
                </div>
              <div className='px-10 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={fuel} className='pb-4 dark:text-white'/>{newCar.motor}
              </div>
              <div className='px-10 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={transmission} className='pb-4 dark:text-white' />{newCar.transmission}
              </div>
              <div className='px-10 text-center font-bold transition-transform transform hover:scale-105'>
                <img src={seats} className='pb-4 dark:text-white'/>5 sjedala</div>
            </div>
              <div><h3 className='py-4 text-primary font-bold text-xl'>Trenutna i moguća dodatna oprema vozila:</h3>
              <p>{newCar.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className='dark:text-primary grid text-4xl place-content-center'>
          Cijena: {newCar.price} €
        </div>
        <div className='grid place-content-center mt-8 pb-6'>
                <button  
                onClick={addToCartHandler}
                className='button-outline text-black dark:bg-primary dark:text-black border-primary hover:scale-105'>Naruči odmah</button>
        </div>
      </>
    )}
       
    </div>
    </div>
  );
}

export default NewCarDetailsScreen;
