import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetNewCarDetailsQuery } from '../slices/newCarsApiSlice';
import {useDispatch } from 'react-redux';

import {addToCart} from '../slices/cartSlice.js'
import { useState } from 'react';


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
    <div className='mt-10 dark:bg-black dark:text-white duration-300 bg-primary sm:min-h-[600px] sm:grid sm:place-items-center'>
    <div className="container">
    { isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
        {error?.data?.message || error.error}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div className='flex items-center p-5' data-aos="slide-right">
            <img src={newCar.image} alt="" />   
          </div>

          <div>
            <div className='grid grid-rows-5 space-y-6 sm:p-16 pb-4'>
              <h1 className='text-3xl sm:text-4xl font-bold font-serif' data-aos="fade-up">{newCar.brand} {newCar.model}</h1>
              <div>Godina proizvodnje: {newCar.makeYear}</div>
              <div>Motor: {newCar.motor}</div>
              <div>Mjenjač: {newCar.transmission}</div>
              <div>Broj sjedala: 5 </div>
              <p>{newCar.description}</p>
            </div>
          </div>
        </div>
        <div className='dark:text-primary grid text-4xl place-content-center'>
          Cijena: {newCar.price} €
        </div>
        <div className='grid place-content-center mt-8 mb-8'>
                <button  
                onClick={addToCartHandler}
                className='button-outline text-black bg-primary-200 dark:bg-primary dark:text-black border-black'
                data-aos="fade-up">Naruči odmah</button>
        </div>
      </>
    )}
       
    </div>
    </div>
  );
}

export default NewCarDetailsScreen;
