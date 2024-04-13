import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetOrderDetailsQuery, 
    useGetPayPalClientIdQuery,
    usePayOrderMutation,
    useDeliverOrderMutation } from '../slices/ordersApiSlice'

import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { userInfo } = useSelector((state) => state.auth);
    
    const { data: order, 
        refetch, 
        isLoading, 
        error } = useGetOrderDetailsQuery(orderId);

        const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

        const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
      
        const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
      
        const {
          data: paypal,
          isLoading: loadingPayPal,
          error: errorPayPal,
        } = useGetPayPalClientIdQuery();
      
        useEffect(() => {
          if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
              paypalDispatch({
                type: 'resetOptions',
                value: {
                  'clientId': paypal.clientId,
                  currency: 'EUR',
                },
              });
              paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (order && !order.isPaid) {
              if (!window.paypal) {
                loadPaypalScript();
              }
            }
          }
        }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

        function onApprove(data, actions) {
            return actions.order.capture().then(async function (details) { 
                try {
                    await payOrder({orderId, details});
                    refetch();
                    toast.success('Uspješno plaćeno')
                } catch (err) {
                    toast.error(err?.data?.message || err.message)
                }
            });
        }

        function createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                        value: order.totalPrice
                        },
                    },
                ],
            }).then((orderId) => {
                return orderId
            })
        }

        function onError(err) {
            toast.error(err.message);
        }

        const deliverOrderHandler = async () => {
            try {
                await deliverOrder(orderId);
                refetch();
                toast.success('Narudžba isporučena');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        }

        console.log(order);
  
    return (
        <div className="px-16 py-10 pb-4 mt-12 dark:text-white dark:bg-black 
        text-xl font-bold text-gray-900 sm:min-h-[500px] sm:grid sm:place-items-center">
                <h1 className='my-6 text-3xl'>Detalji narudžbe</h1>
    
            <div className="container">
                <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1'>
                { isLoading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : (
                    <>
                        <div>
                           <h2 className='pb-4'>Podaci o kupcu: </h2>
                           <p>Ime:  <strong className='text-primary'>{order.user.name}</strong></p>
                           <p>E-mail adresa:<strong className='text-primary'> {order.user.email}</strong></p>
                           <p>Adresa: <strong className='text-primary'>  {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}</strong></p>
                           <hr />
                           <p className='mt-6 pb-2'>Status narudžbe: <br />
                            {
                                order.isDelivered ? (
                                    <p className='text-[green] p-2 bg-[green]/50'>Narudžba uspješno dostavljena</p>
                                ) : (
                                    <p className='text-[red] p-2 bg-[red]/50'> Narudžba nije dostavljena</p>
                                ) 
                            } </p>
                            <hr />
                            <p className='mt-6'> Metoda plaćanja: {
                                    <strong className='text-primary'>{order.paymentMethod}</strong>
                                }
                            </p>
                            <p className='pb-2'>
                                Status naplate: 
                                {
                                    order.isPaid ? (
                                        <p className='text-[green] p-2 bg-[green]/50'>Narudžba plaćena</p>
                                    ) : (
                                        <p className='text-[red] p-2 bg-[red]/50'> Narudžba nije plaćena</p>
                                    ) 
                                }
                            </p>
                            <hr />
                            
                                <h2 className='py-4'>Stavke narudžbe: </h2>
                                {
                                    order.orderItems.map((item, index) => (
                                        <div className='grid grid-cols-2 border border-2 rounded-lg p-2 justify-center place-items-center'>
                                            <div>
                                                <img src={item.image} className='max-w-[150px]' />
                                            </div>
                                            <div>
                                                <p className='text-primary'>{item.brand} {item.model}</p>
                                                <p>Cijena vozila: <strong className='text-primary'>{item.price}€</strong></p>
                                            </div>
                                        </div>
                                        ))
                                }
                            
                        </div>

                        <div className='text-right'>
                           <h3 className='pb-4 pr-14'>Sažetak narudžbe</h3>
                           {
                            <>
                            <p className='pr-14'>Ukupna cijena vozila: {order.itemsPrice} €</p>
                            <p className='pr-14'>Cijena isporuke: {order.shippingPrice} €</p>
                            <p className='text-4xl pt-4 pr-14'>Ukupno za platiti: <strong className='text-primary'> {order.totalPrice} €</strong></p>
                            </>
                           }
                            {   
                                !order.isPaid && (
                                <p>
                                    { loadingPay && <h1>Loading...</h1> }

                                    { isPending ? (<h1>Pending...</h1>) : (
                                    <div>
                                    {/**<button className='my-6 button-outline' onClick={onApproveTest}>Test pay Order</button> */} 
                                    <div>
                                                
                                    <PayPalButtons className='ml-16 pl-20 max-w-[600px]' 
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError = {onError}>
                                    </PayPalButtons>
                                            </div>
                                            </div>
                                        )}
                                        </p>

                                )}
                                {                     
                                userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <button className='button-outline mt-2'
                                onClick={deliverOrderHandler}>Označi kao isporučeno</button>   
                                )
                                        
                                }
                                

                        </div>

                    </>
                )}
                </div>
                </div>
                </div>
  )
}

export default OrderScreen