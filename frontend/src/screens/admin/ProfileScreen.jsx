import React from 'react'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

import { useAuthContext } from '../../context/AuthContext';
import { useProfileMutation } from '../../slices/usersApiSlice'



const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const { authUser, setAuthUser } = useAuthContext();

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

    useEffect(() => {
        if (authUser) {
            setName(authUser.name);
            setEmail(authUser.email);
        }
    }, [ authUser.name, authUser.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
          
          if (password !== confirmPassword) {
              toast.error('Lozinke se ne podudaraju');
          } else {
              try {
                  const updatedUser  = await updateProfile({ _id:authUser._id, name, email, password }).unwrap();
                  localStorage.setItem('userInfo', JSON.stringify(updatedUser));
                  setAuthUser(updatedUser); 
                  toast.success('Profil uspješno ažuriran');
                  
              } catch (err) {
                  toast.error(err?.data?.message || err.error);
              }
          }
    }


  return (
    <div className="px-8 py-10 pb-4 mt-12 dark:text-white dark:bg-black
    text-xl font-bold text-gray-900 sm:min-h-[500px] sm:grid sm:place-items-center">
      <div className="mt-10 pb-6 sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className='text-2xl text-primary pb-2'>Korisnički podaci</h2>
                <form className="space-y-6" onSubmit={submitHandler}>
                  <div>

                    <label className="text-left dark:text-white block text-sm font-medium leading-6 text-gray-900">
                    Korisničko ime
                    </label>

                    <div className="mt-2">
                      <input
                      id="name"
                      name="name"
                      type="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-1.5 
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                      focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
            
                  <div>
                   <label className="text-left dark:text-white block text-sm font-medium leading-6 text-gray-900">
                    Email adresa
                    </label>

                    <div className="mt-2">
                      <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                      focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                      Lozinka
                      </label>
                    </div>

                  <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-1.5
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                     Potvrdite lozinku
                    </label>
                  </div>

                <div className="mt-2">
                  <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5
                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600
                 mt-10 px-4 py-1.5 text-sm font-semibold leading-6 text-white 
                 shadow-sm hover:bg-indigo-500 focus-visible:outline 
                 focus-visible:outline-2 focus-visible:outline-offset-2 
                 focus-visible:outline-indigo-600"
                >
                Ažuriraj podatke
              </button>

              { loadingUpdateProfile && <h1>Loading...</h1>}
            </div>
          </form>
        </div>
        </div>
  )
}

export default ProfileScreen