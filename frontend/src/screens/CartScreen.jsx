import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

//useSelector za dohvat spremljenog u local store-agu (odabrana vozila)
import { useDispatch, useSelector } from 'react-redux' 
import { removeFromCart } from '../slices/cartSlice'


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //dohvat kosarice iz globalnog state-a
    const cart = useSelector((state) => state.cart);

    //dohvat elemenata u kosarici
    const { cartItems } = cart;

    //za ukloniti vozilo iz liste želja
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }

    //ako korisnik nije logiran, klik na "dovrši narudžu" vodi na ekran za logiranje
    //ako je logiran, ide se na ekran za isporuku
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

  return (
    <div className='flex flex-col min-h-screen pb-20 pt-14 bg-white dark:bg-black dark:text-white'>
        <div className="container mx-auto py-32">
            <h1 className='px-20 dark:text-white text-3xl sm:text-4xl font-semibold mb-5 text-center'>Moja lista želja</h1>
              { cartItems.length === 0 ? (
                <div> 
                    <p className='text-center dark:text-white text-xl sm:text-3xl mt-6'>Vaša lista želja je prazna. Zar trenutno nemate nikakvih želja? 😔 <br />
                    <Link to='/'><button className='text-xl mt-5 button-outline'>Natrag</button></Link></p>
                </div>
              ) : (
                <div className="container">
                {   cartItems.map((item) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 place-items-center shadow-lg">
                            <div className='grid grid-rows-3 space-y-3 sm:p-10 text-center '>
                                <h1 className='text-primary text-3xl sm:text-4xl font-bold font-serif' data-aos="fade-up">{item.brand} {item.model}</h1>
                                <p>{item.description}</p>
                                <h1 className='text-2xl sm:text-3xl font-bold font-serif'>
                                Cijena vozila: <span className='text-primary text-3xl'>{item.price}€</span></h1>
                            </div>
                            <div className='flex items-center p-5' data-aos="slide-left">
                            <img className='h-60'src={item.image} alt="" />
                            </div>
                            <div className='mb-6'>
                            <button className='button-outline' onClick={() => removeFromCartHandler(item._id)}>Ukloni stavku</button>
                            </div>
                    </div>
                    ))}      
                </div> 
              ) }

              {cartItems.length > 0 && (
            <div className="container mx-auto py-8 text-right text-3xl">
                <h2 className='mb-4'>Ukupna cijena artikala: { cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2) } € </h2>
                <h2 className='mb-4'>Dodatni troškovi dostave: {cart.shippingPrice}€ </h2>
                <h1 className='mb-4'>Ukupno za platiti: <span className='text-primary text-4xl font-bold'>{
                cart.totalPrice
                } €</span></h1>
                <button className='m-4 text-xl button-outline' onClick={checkoutHandler}>Dovrši narudžbu</button>
            </div>
        )}

        </div>
    </div>
  )
}

export default CartScreen