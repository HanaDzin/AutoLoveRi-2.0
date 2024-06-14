import React, { useState, useEffect } from "react";
import {
  useGetFilteredNewCarsQuery,
  useGetNewCarsQuery,
} from "../slices/newCarsApiSlice";

import NewCarsSelection from "../components/CarSelections/NewCarsSelection";
import NewCarsFilterComponent from "../components/NewCarsFilterComponent";

const NewCarsScreen = () => {
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState("");

  const { data: filteredCarsData } = useGetFilteredNewCarsQuery(filters);
  const { data: allNewCarsData, isLoading: isLoadingNewCars } =
    useGetNewCarsQuery();

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
      <div className="container mx-auto px-2">
        <h1
          className="text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary"
          data-aos="fade-up"
        >
          Nova vozila
        </h1>

        <p className="text-sm pb-6 text-center" data-aos="fade-up">
          Pogledajte široku ponudu potpuno novih vozila.
        </p>

        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <div className="md:w-3/4 md:order-1 sm:order-2">
            <NewCarsSelection
              sortedData={sortedData}
              isLoading={isLoadingNewCars}
            />
          </div>
          <div className="md:w-1/4 md:order-1 sm:order-1">
            <div className="sticky top-0">
              <NewCarsFilterComponent
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCarsScreen;
