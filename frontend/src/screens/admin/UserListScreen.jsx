import React from 'react'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'

import { useGetUsersQuery, 
    useDeleteUserMutation } from '../../slices/usersApiSlice'

import { Link } from 'react-router-dom'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  
  const deleteHandler = async (id) => {
    if (window.confirm('Jeste li sigurni da želite obrisati korisnika?')) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
  }

  return (
    <div className="dark:bg-dark px-10 mt-16 dark:text-white mt-8 text-center font-bold text-gray-900 min-h-[600px]">
      <div className='items-center justify-center dark:bg-dark container p-10'>
      <h1 className=' text-3xl dark:text-primary text-left mb-6'>Pregled svih korisnika</h1>

      {
        isLoading ? <h1>Učitavanje..</h1> : error ? <h1>{error}</h1> : (
          <div className="max-w-screen-xl">
          <div className="overflow-x-auto">
          <table class="text-md text-serif min-w-full text-center">
            <thead className='shadow-lg'>
              <tr>
                <th className="px-4 py-2 ">ID</th>
                <th className="px-4 py-2 ">Ime</th>
                <th className="px-4 py-2 ">Email</th>
                <th className="px-4 py-2 ">Admin</th>
              </tr>
          </thead>

          <tbody>
            { users.map((user) => (
              <tr key={user._id}>
                <td className='px-4 py-4'>{user._id}</td>
                <td className='px-4 py-4'>{user.name}</td>
                <td className='px-4 py-4'><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                <td className='px-4 py-4 hover:scale-105'>
                {
                  user.isAdmin ? (
                    <FaCheck style={{ color: 'green'}} />
                  ) : (
                    <FaTimes style={{ color: 'red'}} />
                  ) 
                }
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className='hover:scale-105 mx-2 button-outline text-sm p-1 flex'><FaEdit />Uredi</button>
                   </Link>
                   </td>
                   <td>
                    <button className='hover:scale-105 mx-2 flex p-1 border-2 rounded-lg border-black'
                    onClick={() => deleteHandler(user._id)}>
                        <FaTrash style={{ color: 'red', marginRight: '5px' }} />Obriši
                    </button>                
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  )}
</div>
</div>
)}

export default UserListScreen