import React from 'react';
import { useGetUsedCarsQuery } from '../../slices/usedCarsApiSlice';

//komponente:
import UsedCarCard from './UsedCarCard'


const UsedCarsSelection = () => {
  const { data: usedCars, isLoading, error} = useGetUsedCarsQuery();

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
            { usedCars.map((car) => (
              <UsedCarCard key={car._id} _id={car._id} brand={car.brand} 
              model={car.model} price={car.price} mileage={car.mileage} image={car.image} />
              ))}
            </div>
        </div>
        </>
    )}
    </div>
  )
}

export default UsedCarsSelection