import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import useLogout from '../../../hooks/useLogout'

import { FaUser } from 'react-icons/fa';


const Dropdown = () => {

  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className=' flex items-center relative'>
      <div className='hover:text-primary flex items-center cursor-pointer' onClick={toggleDropdown}>
        <FaUser className=' mr-2' /> <span>{authUser.name}</span>
      </div>

      {isDropdownOpen && authUser && (
        <div className="dark:bg-black text-primary origin-top-right absolute right-0 top-12  w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <Link
              to='/profile'
              className="block px-4 py-2 text-sm dark:text-white text-black hover:bg-primary hover:text-black"
              role="menuitem" onClick={closeDropdown}
            >
              Moj Profil
            </Link>
            {authUser && authUser.isAdmin && ( 
              <><Link
                to='/admin/carlist'
                className="block px-4 py-2 text-sm dark:text-white text-black hover:bg-primary hover:text-black"
                role="menuitem" onClick={closeDropdown}
              > Vozila</Link>
              <Link
                to='/admin/userlist'
                className="block px-4 py-2 text-sm dark:text-white text-black hover:bg-primary hover:text-black"
                role="menuitem" onClick={closeDropdown}
              > Korisnici</Link>
              <Link
                to='/admin/orderlist'
                className="block px-4 py-2 text-sm dark:text-white text-black hover:bg-primary hover:text-black"
                role="menuitem" onClick={closeDropdown}
              > Narudžbe</Link>
            </>
            )}

            <Link
              to="/login"
              onClick={logout}
              className="block px-4 py-2 text-sm dark:text-white text-black hover:bg-primary hover:text-black"
              role="menuitem"
            >
              Odjava
            </Link>

            
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
