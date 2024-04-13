import React from 'react'
import { Link } from 'react-router-dom'


const CheckoutSteps = ({ step1, step2, step3, step4}) => {
  return (
    <nav className='flex justify-center place-items-center pt-6 mb-4'>
    <div className="text-sm flex gap-10">
        <ul className='flex items-center'>
            <li>
                { step1 ? (
                    <Link to='/login'>Prijavi se</Link>
                ) : (
                    <Link className="text-gray-500 cursor-not-allowed" aria-disabled="true">Prijavi se</Link>
                ) }
            </li>
        </ul>
        <ul className='flex items-center gap-8'>
            <li>
                { step2 ? (
                    <Link to='/shipping'>Isporuka</Link>
                ) : (
                    <Link className="text-gray-500 cursor-not-allowed" aria-disabled="true">Isporuka</Link>
                ) }
            </li>
        </ul>
        <ul className='flex items-center gap-8'>
            <li>
                { step3 ? (
                    <Link to='/login'>Plaćanje</Link>
                ) : (
                    <Link className="text-gray-500 cursor-not-allowed" aria-disabled="true">Plaćanje</Link>
                ) }
            </li>
        </ul>
        <ul className='flex items-center gap-8'>
            <li>
                { step4 ? (
                    <Link to='/placeorder'>Pošalji narudžbu</Link>
                ) : (
                    <Link className="text-gray-500 cursor-not-allowed" aria-disabled="true">Pošalji narudžbu</Link>
                ) }
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default CheckoutSteps