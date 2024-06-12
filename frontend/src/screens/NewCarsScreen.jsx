import React, { useState, useEffect } from "react";
import { useGetFilteredCarsQuery, useGetNewCarsQuery } from "../slices/newCarsApiSlice";
import NewCarsSelection from "../components/CarSelections/NewCarsSelection";
import CarFilterComponent from "../components/CarFilterComponent";

const NewCarsScreen = () => {
  const [filters, setFilters] = useState({});

  //sorting saved independently, so it can be used with or without filters
  const [sorting, setSorting] = useState("");  

  //fetch filtered cars if any filters are applied
  const { data: filteredCarsData } = useGetFilteredCarsQuery(filters);
  
  //fetch all new cars for initial view or sorting when no filters are applied
  const { data: allNewCarsData, isLoading: isLoadingNewCars } = useGetNewCarsQuery();

  //so that even filtered data can be sorted and refreshed every time sorting changes
  useEffect(() => {
    if (sorting) {
      setFilters({ ...filters, sortByPrice: sorting });
    }
  }, [sorting]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortOrder) => {
    setSorting(sortOrder);
  };

  //applying sorting to the data
  const applySorting = (data) => {
    if (!sorting) return data;

    const sortedData = [...data];
    if (sorting === "asc") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sorting === "desc") {
      sortedData.sort((a, b) => b.price - a.price);
    }
    return sortedData;
  };

  const sortedData = applySorting(filteredCarsData || allNewCarsData || []);

  return (
    <div className="pb-10 pt-14 dark:bg-black dark:text-white duration-300 sm:min-h-[600px] sm:grid sm:place-items-center">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary" data-aos="fade-up">
          Nova vozila
        </h1>

        <p className="text-sm pb-6 text-center" data-aos="fade-up">
          Pogledajte široku ponudu potpuno novih vozila.
        </p>

        <CarFilterComponent onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
        <NewCarsSelection sortedData={sortedData} isLoading={isLoadingNewCars} />
      </div>
    </div>
  );
};

export default NewCarsScreen;
