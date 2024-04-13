import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsedCarDetailsQuery } from '../slices/usedCarsApiSlice';
import { useDispatch } from 'react-redux';

import {addToCart} from '../slices/cartSlice.js'
import { useState } from 'react';

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
    <div className='dark:bg-black dark:text-white duration-300 bg-primary sm:min-h-[600px] sm:grid sm:place-items-center'>
    { isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
        {error?.data?.message || error.error}
      </div>
    ) : (
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div>
            <div className='grid grid-rows-7 space-y-5 sm:p-16 pb-6'>
              <h1 className='text-3xl sm:text-4xl font-bold font-serif' data-aos="fade-up">{usedCar.brand} {usedCar.model}</h1>
              <div>Godina proizvodnje: {usedCar.makeYear}</div>
              <div>Motor: {usedCar.motor}</div>
              <div>Mjenjač: {usedCar.transmission}</div>
              <div>Broj sjedala: 5 </div>
              <div>Broj prethodnih vlasnika: {usedCar.numOfOwners}</div>
              <div>Prijeđeni kilometri: {usedCar.mileage}</div>
              <div>Dodatna oprema uključuje: <br />{usedCar.description}</div>
            </div>  
          </div>
          <div className='flex items-center p-5' data-aos="slide-left">
            <img src={usedCar.image} alt="" /> 
          </div> 
      </div>
      <div className='dark:text-primary grid text-4xl place-content-center'>
          Cijena: {usedCar.price} €
        </div>
         
        <div className='grid place-content-center mt-8 mb-8'>
            <button  
              onClick={addToCartHandler}
              className='button-outline text-black bg-primary-200 dark:bg-primary dark:text-black border-black'
              data-aos="fade-up">Naruči odmah</button>
        </div>
    </div> 
    )}
  </div>
  );
}

export default UsedCarDetailsScreen;
