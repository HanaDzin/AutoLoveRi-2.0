import React from 'react';
import { useGetNewCarsQuery } from '../../slices/newCarsApiSlice'

//komponente:
import NewCarCard from './NewCarCard';


const NewCarsSelection = () => {
  const { data: newCars, isLoading, error} = useGetNewCarsQuery();
  

  return (
    <div className='pb-6 pt-14 dark:bg-black dark:text-white'>
    { isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
      {error?.data?.message || error.error}
      </div>
    ) : (
      <>
      <div className="container">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
            { newCars.map((car) => (
              <NewCarCard key={car._id} _id={car._id} brand={car.brand} 
              model={car.model} price={car.price} image={car.image} />
              ))}
            </div>

        </div>
      </>
    ) }
        
    </div>
  )
}

export default NewCarsSelection