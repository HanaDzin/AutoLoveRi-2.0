import React from 'react'
import { useState} from 'react'
import FormContainer from '../components/formContainer/formContainer';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';

import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    //dohvat cart state-a:
    const cart = useSelector((state) => state.cart);

    //dohvati adresu isporuke iz cart-a:
    const { shippingAddress } = cart;

    //ako vec imamo podatke o adresi, neka budu automatski upisani u form, u suprotnom se unose
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

 
const submitHandler = (e) => {
    e.preventDefault();
    //moramo pozvati saveShippingAddress tako da ju azuriramo u state-u i ls-u
    dispatch(saveShippingAddress({ address, city, postalCode, country}));
    //navigiramo do stranice za naplatu:
    navigate('/payment');
}



  return (
    <FormContainer>
        <div className="px-20 mt-16 dark:text-white mt-8 text-center text-2xl font-bold text-gray-900">
        <CheckoutSteps step1 step2 />
            <h1 className='mt-10 text-3xl'>Isporuka</h1>
          </div>

        <div className="text-left mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
          <div>
              <label className="dark:text-white block text-sm font-medium 
              leading-6 text-gray-900">
                Adresa
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 
                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label className="dark:text-white block text-sm font-medium 
              leading-6 text-gray-900">
                Grad
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 
                   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="dark:text-white block text-sm font-medium 
                leading-6 text-gray-900">
                  Poštanski broj
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 
                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="dark:text-white block text-sm 
                font-medium leading-6 text-gray-900">
                  Država
                </label>
              </div>
              <div className="mb-10">
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="block w-full rounded-md border-0 
                  py-1.5 px-1.5  text-gray-900 shadow-sm ring-1 ring-inset 
                  ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md 
                bg-indigo-600 px-4 py-1.5 text-sm font-semibold 
                leading-6 text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Nastavi
              </button>
          </form>
          </div>


    </FormContainer>
  )
}

export default ShippingScreen