import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  useGetFilteredUsedCarsQuery,
  useGetUsedCarsQuery } from "../slices/usedCarsApiSlice"

import UsedCarsFilterComponent from '../components/UsedCarsFilterComponent'
import UsedCarsSelection from '../components/CarSelections/UsedCarsSelection'


const UsedCarsScreen = () => {
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState("");

  const { data: filteredCarsData } = useGetFilteredUsedCarsQuery(filters);
  const { data: allUsedCarsData, loading:isLoadingUsedCars  } = useGetUsedCarsQuery();

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

  const sortedData = applySorting(filteredCarsData || allUsedCarsData || []);
  return (
    <div className='pb-10 pt-14 bg-white dark:bg-black dark:text-white'>
        <div className="container">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'></div>

              <h1 className='text-3xl sm:text-4xl font-semibold mb-3 text-center text-primary'
              data-aos="fade-up">Rabljena vozila</h1>

          <p className='text-sm pb-6 text-center' data-aos="fade-up">
          Pregledajte ponudu rabljenih vozila u odličnom stanju. </p>

          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <div className="md:w-3/4 md:order-1 sm:order-2">
            <UsedCarsSelection
              sortedData={sortedData}
              isLoading={isLoadingUsedCars}
            />
          </div>
          <div className="md:w-1/4 md:order-1 sm:order-1">
            <div className="sticky top-0">
              <UsedCarsFilterComponent
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

export default UsedCarsScreen