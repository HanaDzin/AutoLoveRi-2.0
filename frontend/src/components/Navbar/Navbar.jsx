import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Badge} from 'react-bootstrap'

import {BiSolidMoon, BiSolidSun} from 'react-icons/bi'
import {HiMenuAlt1, HiMenuAlt3} from 'react-icons/hi'
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

//mobile responsive menu
import ResponsiveMenu from './ResponsiveMenu.jsx'
import Dropdown from '../Dropdown/Dropdown.jsx'

export const NavLinks = [
    {
        _id: "1",
        name: "Početna",
        link: "/"
    },
    {
        _id: "2",
        name: "Vozila",
        link: "/cars"
    },
    {
        _id: "3",
        name: "O nama",
        link: "/about"
    },
    {
        _id: "4",
        name: "Novosti",
        link: "/news"
    }
]



const Navbar = ({theme, setTheme}) => {

//responsive menu for smaller screens
const [showMenu, setShowMenu] = useState(false);

const toggleMenu = () => {
    setShowMenu(!showMenu);
}
//to use when updating wishlist with num of selected vehicles
const { cartItems } = useSelector( (state) => state.cart);
const { userInfo } = useSelector( (state) => state.auth);

  return (
    
    <nav className='shadow-md bg-white dark:bg-dark dark:text-white duration-300
        fixed top-0 flex w-full z-30'>
        <div className='container'>
            <div className="flex justify-between items-center">
                <div>
                    <Link to='/'><h1 className='text-xl font-bold py-2'>AutoLoveRi</h1></Link>
                </div>

            <div className='hidden md:block'>
                <ul className='flex items-center gap-8'>
                { 
                    NavLinks.map((data) => (
                    
                        <Link to={data.link}>
                            <div key={data._id} className='py-4'>
                                <a className='py-2 
                                hover:border-b-2 
                                hover:text-primary
                                hover:border-primary
                                transition-colors duration-300
                                text-md font-medium' 
                                >{data.name}</a>
                            </div>
                        </Link>
                    ))}

                <div className='flex items-center'>
                    <Link to='/cart' className='flex items-center'>
                        <FaRegHeart className='text-2xl' />
                        {
                            cartItems.length > 0 && (
                            <Badge className='ml-2' pill bg='success'>
                                {cartItems.reduce((a, c) =>  a + c.qty, 0)}
                            </Badge>
                            )
                        }
                    </Link>

                    {userInfo && userInfo.isAdmin && (
                        <div className='flex items-center'>
                            <Link to='/messages' className='flex items-center'>
                                <IoChatboxEllipsesOutline className='text-2xl ml-5' />
                             </Link>
                        </div>
                    )}
                    
    
                </div>                   
                    {
                        userInfo ? (<Dropdown></Dropdown>
                        ) : (
                        <div className='flex items-center'>
                            <FaUser className='mr-2'/><Link to='/login'>Prijavi se</Link></div>
                        )
                    }
                        
                <div>
                    {
                        theme == "dark" ? 
                        (<BiSolidSun onClick={() => setTheme("light")}
                        className='text-2xl'/>) : 
                        (<BiSolidMoon onClick={() => setTheme("dark")} 
                        className='text-2xl'/> )
                    } 
                </div>
                </ul>
            </div>
            
            <div className='flex items-center gap-4 md:hidden'>
                <div>
                    {
                        theme == "dark" ? 
                        (<BiSolidSun onClick={() => setTheme("light")}
                        className='text-2xl'/>) : 
                        (<BiSolidMoon onClick={() => setTheme("dark")} 
                        className='text-2xl'/> )
                } 
                </div>

                {
                    showMenu ?
                    (<HiMenuAlt1 
                    onClick={toggleMenu} 
                    size={30}
                    className="cursor-pointer transition-all"
                    />) :
                    (<HiMenuAlt3 
                    onClick={toggleMenu} 
                    size={30}
                    className="cursor-pointer transition-all"
                    />)
                }


            </div>
        </div>
        </div>
        <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu} />
    </nav>
  )
}

export default Navbar