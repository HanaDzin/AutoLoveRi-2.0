import React from 'react'
import { useEffect } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap'

const PlaceOrderScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth);

    const [createOrder] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        user: user.userInfo,
        totalPrice: cart.totalPrice,

      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="px-20 pb-4 mt-12 dark:text-white dark:bg-black text-center 
    text-2xl font-bold text-gray-900 sm:min-h-[600px] sm:grid sm:place-items-center">
        <CheckoutSteps step1 step2 step3 step4 />
            <h1 className='mt-10 text-3xl'>Pošalji narudžbu</h1>

        <div className="container">
            <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 place-items-center text-left'>
                <div className='ml-2'>
                        <h1 className='mt-10 text-3xl'>Isporuka</h1> 
                        <p className='text-lg'>
                        Adresa:  {' '}{cart.shippingAddress.address}, {cart.shippingAddress.postalCode} {cart.shippingAddress.city}, { cart.shippingAddress.country}
                        </p>

                        <p className='text-lg'>Metoda plaćanja:  {' '}{cart.paymentMethod}</p>

                        <p className='text-lg'>Stavke narudžbe:</p>
                          {
                            cart.cartItems.length === 0 ? (
                                <h3>Vaša lista želja je prazna.</h3>
                            ) : ( 
                            <div>
                                { cart.cartItems.map((item, index) => (
                                    <>
                                    <div className='grid grid-cols-2 shadow-lg m-4 hover:scale-105'>
                                        <div className='p-2 m-4 '>
                                            <img src={item.image}/>
                                        </div>

                                        <div>
                                            <h2 className='text-primary text-2xl mb-2'>{item.brand} {item.model}</h2>
                                            <p className='text-left text-sm mb-2'>{item.description}</p>
                                            <h2 className='text-2xl mb-2'>Cijena vozila: 
                                                <span className='text-primary'> {item.price}€</span></h2>
                                        </div>
                                    </div>
                                </>
                                ))
                                }
                            </div>      
                            )}                  
                </div>

                <div className='md:flex flex-col pb-4'>
                    <div className='p-2'>
                    <h1 className='text-primary text-3xl m-4'>Sažetak narudžbe:</h1>
                
                  <p>Ukupna cijena vozila:
                  <span className='text-primary'> {cart.itemsPrice} €</span> </p>

                  <p>Cijena isporuke:
                  <span className='text-primary'> {cart.shippingPrice} €</span> </p>

                <p>Ukupno za platiti:
                <span className='text-primary'> {cart.totalPrice} €</span></p>
     

                <button onClick={placeOrderHandler} className='m-4 button-outline'>Završi narudžbu</button>
                 </div>
                </div>
            </div>
        </div>
      </div>

  )
}

export default PlaceOrderScreen