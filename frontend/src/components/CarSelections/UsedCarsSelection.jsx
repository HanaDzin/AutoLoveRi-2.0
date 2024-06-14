import React from "react";
import UsedCarCard from "./UsedCarCard";

//sortedData is [] by default so no problems occur when not selecting any filters
const NewCarsSelection = ({ sortedData =[], isLoading }) => {
  return (
    <div className="pb-6 pt-14 dark:bg-black dark:text-white">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : sortedData.length > 0 ? (
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {sortedData.map((car) => (
              <UsedCarCard
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
      ) : (
        <div className="col-span-full text-center text-lg mt-4">
          Nažalost, niti jedno rabljeno vozilo u našoj ponudi ne odgovara Vašim kriterijima.😔
        </div>
      )}
    </div>
  );
};

export default NewCarsSelection;
