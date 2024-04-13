import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/formContainer/formContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    //ako korisnik nije unio adresu, ne može otići na plaćanje
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
    <div className="px-10 mt-16 dark:text-white mt-8 text-center text-2xl font-bold text-gray-900">
      <CheckoutSteps step1 step2 step3 />
      <h1 className='mt-10 text-3xl'>Metoda plaćanja</h1>
      <div className='text-left mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend' className='text-2xl'>Odaberi metodu plaćanja</Form.Label>
          <Col>
            <Form.Check
              className='my-4 text-lg'
              type='radio'
              label='PayPal ili kreditna kartica'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <button
                type="submit"
                className="text-sm flex w-full justify-center rounded-md 
                bg-indigo-600 px-4 py-1.5 font-semibold 
                leading-6 text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Nastavi
              </button>
              
      </Form>
      </div>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;