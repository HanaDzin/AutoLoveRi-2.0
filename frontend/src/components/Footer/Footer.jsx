import React from 'react'

import {FaFacebook, FaLinkedin, FaLocationArrow, FaMobileAlt} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='bg-gray-100 dark:bg-dark dark:text-white'>
        <div className="container"></div>
        <div className='grid md:grid-cols-3 py-5'>

        <div className='py-8 px-20'>
            <h1 className='text-xl sm:text-3xl font-bold sm:text-left text-justify mb-3 gap-3 flex items-center'>AutoLoveRi</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere impedit qui minima.</p><br />
            <div className='flex items-center gap-3'>
                <FaLocationArrow />
                <p>51 000 Rijeka</p>
            </div>
            <div className='flex items-center gap-3'>
                <FaMobileAlt />
                <p>+91 123 4567</p>
            </div>
            <div className='flex items-center gap-3 mt-6'>
                <a href=""><FaInstagram className='text-3xl hover:text-primary duration-300' /></a>
                <a href=""><FaFacebook className='text-3xl hover:text-primary duration-300' /></a>
                <a href=""><FaLinkedin className='text-3xl hover:text-primary duration-300' /></a>
            </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
            <div>
                <div className='py-8 px-14'>
                    <h1 className='text-xl font-bold text-justify mb-3
                     sm:text-left '>Važne poveznice</h1>
                    <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/`}>Početna</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/about`}>O nama</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/cars`}>Vozila</Link>
                    </li>
                    </ul>
                </div>
            </div>

            <div>
                <div className='py-8 px-14'>
                    <h1 className='text-xl font-bold text-justify mb-3
                    sm:text-left '>Važne poveznice</h1>
                    <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/`}>Početna</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/about`}>O nama</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/cars`}>Vozila</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/news`}>Novosti</Link>
                    </li>

                    </ul>
                </div>
            </div>

            <div>
                <div className='py-8 px-14'>
                    <h1 className='text-xl font-bold text-justify mb-3
                     sm:text-left '>Važne poveznice</h1>
                    <ul className='flex flex-col gap-3'>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/`}>Početna</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/about`}>O nama</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/cars`}>Vozila</Link>
                    </li>
                    <li className='cursor-pointer hover:text-primary duration-300'>
                        <span className='mr-2'> &#11162; </span>
                        <Link to={`/news`}>Novosti</Link>
                    </li>

                    </ul>
                </div>
            </div>
        </div>

        

        </div>
    </div>
  )
}

export default Footer