import React from "react";
import NewCarCard from "./NewCarCard";

import {useGetNewCarsQuery} from '../../slices/newCarsApiSlice'

const MostRecentNewCars = () => {

    const { data:newCars } = useGetNewCarsQuery();
    const top3NewCars = newCars ? newCars.slice(Math.max(0, newCars.length - 3)) : [];

  return (
    <div className="pb-6 pt-14 dark:bg-black dark:text-white">
          <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            { top3NewCars.map((car) => (
              <NewCarCard
                key={car._id}
                _id={car._id}
                brand={car.brand}
                model={car.model}
                price={car.price}
                image={car.image}
              />
            ))}
          </div>
        </div>
        </div>
  );
};

export default MostRecentNewCars;
