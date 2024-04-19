import React from 'react'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'

import { useGetNewCarsQuery, 
  useCreateNewCarMutation, 
  useDeleteNewCarMutation } from '../../slices/newCarsApiSlice'

import { useGetUsedCarsQuery,
useCreateUsedCarMutation,
useDeleteUsedCarMutation } from '../../slices/usedCarsApiSlice'


import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteNewCar } from '../../../../backend/controllers/CarsController'


const CarsListScreen = () => {

    //za nova vozila
    const { data: newCars, isLoading: isLoadingNewCars, error, refetch } = useGetNewCarsQuery();
    const [createNewCar, { isLoading: loadingCreateNewCar }] = useCreateNewCarMutation();
    const [deleteNewCar, { isLoading: loadingDeleteNewCar }] = useDeleteNewCarMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Jeste li sigurni da želite obrisati vozilo?')) {
          try {
            await deleteNewCar(id);
            toast.success('Vozilo uspješno obrisano!');
            refetch();
          } catch(err) {
            toast.error(err?.data?.message || err.error)
          }
        }
    };

    const createNewCarHandler = async () => {
      if (window.confirm('Jeste li sigurni da želite dodati novo vozilo?')) {
        try {
          await createNewCar();
          toast.success('Vozilo uspješno dodano!')
          refetch();
        } catch (err) {
          toast.err(err?.data?.message || err.error)
        }
      }
    }

    //za rabljena vozila
    const { data: usedCars, isLoading: isLoadingUsedCars, error: usedCarsError, refetch: usedRefetch } = useGetUsedCarsQuery();
    const [createUsedCar, { isLoading: loadingUsedCar }] = useCreateUsedCarMutation();
    const [deleteUsedCar, { isLoading: loadingDeleteUsedCar }] = useDeleteUsedCarMutation();

    const deleteUsedCarHandler = async (id) => {
        if (window.confirm('Jeste li sigurni da želite obrisati vozilo?')) {
          try {
            await deleteUsedCar(id);
            toast.success('Rabljeno Vozilo uspješno obrisano!');
            usedRefetch();
          } catch(err) {
            toast.error(err?.data?.message || err.error)
          }
        }
    };

    const createUsedCarHandler = async () => {
      if (window.confirm('Jeste li sigurni da želite dodati novo rabljeno vozilo?')) {
        try {
          await createUsedCar();
          toast.success('Vozilo uspješno dodano!')
          usedRefetch();
        } catch (err) {
          toast.err(err?.data?.message || err.error)
        }
      }
    }

  return (
    <div className="dark:bg-dark px-10 mt-16 dark:text-white mt-8 text-center font-bold text-gray-900 min-h-[800px]">
      <div className='items-center justify-center dark:bg-dark container p-10'>
      <h1 className='text-3xl dark:text-primary text-left mb-6'>Pregled svih vozila</h1>

        <div>
            <div></div>
            <div className='items-right justify-right text-right'>
            <button className='button-outline' onClick={ createNewCarHandler }>Dodaj novo vozilo</button>
            </div>
        </div>

        { loadingCreateNewCar && <h1>Loading...</h1>}
        { loadingDeleteNewCar && <h1>Loading...</h1>}
        {
          isLoadingNewCars ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : (
                <>
                <table className="text-md text-serif min-w-full">
            <thead className='text-primary shadow-lg'>
              <tr>
                <th className="px-4 py-2 "></th>
                <th className="px-4 py-2 ">ID</th>
                <th className="px-4 py-2 ">Naziv vozila</th>
                <th className="px-4 py-2 ">Cijena</th>
                <th className="px-4 py-2 ">Kategorija</th>
              </tr>
          </thead>

          <tbody>
            { newCars.map((car) => (
              <tr key={car._id} className="hover:scale-105 transition-transform">
              <td className='px-4 py-2'><img src={car.image} className='w-20 h-auto' alt="" /></td>
                <td className='px-4 py-2'>{car._id}</td>
                <td className='px-4 py-2'>{car.brand} {car.model}</td>
                <td className='px-4 py-2'>{(car.price).toFixed(2)} € </td>
                <td className='px-4 py-2'>Nova vozila </td>
                <td className='px-4 py-2'>
                <Link to={`/admin/newcar/${car._id}/edit`}>
                    <button className='button-outline'><FaEdit /></button>
                </Link>
                <button className='mx-2 button-outline'
                onClick={() => deleteHandler(car._id)}>
                <FaTrash style={{color: 'red'}} /></button>
                </td>
                <td>
                  <Link to={`/newcars/${car._id}`}>
                <button className='rounded-lg border-2 border-[green] p-1.5 hover:scale-105'>Detalji</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
      </table> 
    </>
    )
  }


  <div className='pt-16'>
            <div></div>
            <div className='items-right justify-right text-right'>
            <button className='button-outline' onClick={ createUsedCarHandler }>Dodaj rabljeno vozilo</button>
            </div>
        </div>

        { loadingUsedCar && <h1>Loading...</h1>}
        { loadingDeleteUsedCar && <h1>Loading...</h1>}
        {
          isLoadingUsedCars ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : (
                <>
                <table class="text-md text-serif min-w-full">
            <thead className='text-primary shadow-lg'>
              <tr>
              <th className="px-4 py-2 "></th>
                <th className="px-4 py-2 ">ID</th>
                <th className="px-4 py-2 ">Naziv vozila</th>
                <th className="px-4 py-2 ">Cijena</th>
                <th className="px-4 py-2 ">Kategorija</th>
              </tr>
          </thead>

          <tbody>
            { usedCars.map((car) => (
              <tr key={car._id} className="hover:scale-105 transition-transform">
              <td className='px-4 py-2'><img src={car.image} className='w-20 h-auto' alt="" /></td>
                <td className='px-4 py-2'>{car._id}</td>
                <td className='px-4 py-2'>{car.brand} {car.model}</td>
                <td className='px-4 py-2'>{(car.price).toFixed(2)} € </td>
                <td className='px-4 py-2'>Rabljena vozila</td>
                <td className='px-4 py-2'>
                <Link to={`/admin/usedcar/${car._id}/edit`}>
                    <button className='button-outline'><FaEdit /></button>
                </Link>
                <button className='mx-2 button-outline'
                onClick={() => deleteUsedCarHandler(car._id)}>
                <FaTrash style={{color: 'red'}} /></button>
                </td>
                <td><Link to={`/usedcars/${car._id}`}><button className='rounded-lg border-2 border-[green] p-1.5 hover:scale-105'>Detalji</button></Link></td>
              </tr>
            ))}
          </tbody>
      </table> 
    </>
    )
  }

      </div>
    </div>
  )
}

export default CarsListScreen