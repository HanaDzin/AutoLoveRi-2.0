import React, {useState} from "react";

import NewCarsSelection from "../components/CarSelections/NewCarsSelection";
import CarFilterComponent from "../components/CarFilterComponent";

const NewCarsScreen = () => {
  const [sortedData, setSortedData] = useState([]);

  const handleSelect = (data) => {
    setSortedData(data);
  };

  return (
    <div
      className="pb-10 pt-14 dark:bg-black dark:text-white duration-300 
    sm:min-h-[600px] sm:grid sm:place-items-center"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16"></div>

        <h1
          className="text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary"
          data-aos="fade-up"
        >
          Nova vozila
        </h1>

        <p className="text-sm pb-6 text-center" data-aos="fade-up">
          Pogledajte široku ponudu potpuno novih vozila.
        </p>

        <CarFilterComponent onSelect={handleSelect} />

        
        <NewCarsSelection sortedData={sortedData} />
      </div>
    </div>
  );
};

export default NewCarsScreen;
