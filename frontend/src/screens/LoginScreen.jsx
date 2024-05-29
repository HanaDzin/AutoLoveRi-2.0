import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import FormContainer from '../components/formContainer/formContainer'

import useLogin from '../../hooks/useLogin';
import { useAuthContext } from '../context/AuthContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, login} = useLogin();
    const { authUser } = useAuthContext();

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (authUser) {
            navigate(redirect);
        }
    }, [navigate, redirect, authUser, email])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        await login(email, password);
        navigate(redirect);
        } catch (err) {
          toast.error(err.message);
         }
    };
  return (
    <FormContainer>
          <div className="dark:text-white mt-8 text-center text-2xl font-bold text-gray-900">
            Prijavi se
          </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 mt-10 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                 { loading ? <span className="loading loading-spinner"></span> : "Prijavi se"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Nemate svoj profil?
            <Link to='/register'>Registriraj se </Link>
          </p>
          </div>


    </FormContainer>
  )
}

export default LoginScreen