import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/formContainer/formContainer'
import { toast } from 'react-toastify'

import {  useGetUserDetailsQuery,
          useUpdateUserMutation
     
     } from '../../slices/usersApiSlice'

import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const UserEditScreen = () => {

    const { id: userId } = useParams();
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, 
        isLoading, 
        refetch, 
        error } = useGetUserDetailsQuery(userId);

    const [ updateUser, { isLoading: loadingUpdate } ] = useUpdateUserMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin: isAdmin});
            toast.success('Korisnik uspješno ažuriran');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(!!user.isAdmin)
        }
    }, [user]);


return ( <>
        <FormContainer>
        <div className="px-20 mt-20 dark:text-white mt-8 text-center text-2xl font-bold text-gray-900">
        <h1 className=' text-3xl dark:text-primary text-left mb-6 mt-6'>Ažuriraj korisnika</h1>
        </div>

        { loadingUpdate && <h1>Loading...</h1> }

        { isLoading ? <h1>Loading</h1> : error ? <h1>{error}</h1> : (
    
    <div className="text-left mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-4" onSubmit={submitHandler}>

    <div>
    <div className="flex items-center justify-between">
        <label className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
        Korisničko ime
        </label>
    </div>
<div className="mt-2">
    <input
    id="name"
    name="name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="block w-full rounded-md border-0 p-2.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
</div>
</div>

<div>
<label className="text-left dark:text-white block text-sm font-medium leading-6 text-gray-900">
    E-mail adresa korisnika:
</label>
<div className="mt-2">
    <input
    id="email"
    name="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="block w-full rounded-md border-0 p-2.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
    sm:leading-6"
    />
</div>
</div>

<div>
<label className="text-left dark:text-white block text-sm font-medium leading-6 text-gray-900">
    Administrator?
</label>
<div className="mt-2">
    <input
    type="checkbox"
    label="isAdmin"
    checked={isAdmin}
    onChange={(e) => setIsAdmin(e.target.checked)}
    className="block w-full p-2.5 
    shadow-sm text-xl
    sm:leading-6"
    />
</div>
</div>



<div>
<button
    type="submit"
    className="flex w-full justify-center rounded-md bg-indigo-600 
    mt-10 px-4 py-1.5 text-sm font-semibold leading-6 text-white 
    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Ažuriraj
</button>
</div>
</form>
</div>
)}
</FormContainer>
</>
)
}

export default UserEditScreen