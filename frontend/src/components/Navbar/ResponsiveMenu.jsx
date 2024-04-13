import React from 'react'

import {FaUserCircle} from 'react-icons/fa'

import { NavLinks } from './Navbar'

const ResponsiveMenu = ({showMenu}) => {
  return (
    <div className={`${showMenu ? "left-0" : "hidden" } 
    fixed top-0 z-50 bg-white dark:bg-dark h-screen w-[70%]
    md:hidden rounded-r-xl shadow-md flex-col justify-between px-8 pb-6 pt-16 transition-all duration-300`}>
        <div className='card'>
            <div className='flex items-center justify-start gap-3'>
                <FaUserCircle size={50}/>
                <div>
                    <h1>Korisnik 1</h1>
                </div>
            </div>

            <nav className='mt-12'>
                <ul className='space-y-4 text-xl'>
                    {
                        NavLinks.map((data) => (
                        <li key={data._id}>
                            <a href={data.link}>{data.name}</a>
                        </li>
                    ))
                    }
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default ResponsiveMenu