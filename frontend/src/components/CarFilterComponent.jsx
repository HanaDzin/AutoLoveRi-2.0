import React, { useState, useEffect } from "react";
import { IoFilterCircleOutline } from "react-icons/io5";
import {
  useGetNewCarBrandsQuery,
  useGetModelsByBrandQuery,
} from "../slices/newCarsApiSlice";

const CarFilterComponent = ({ onFilterChange, onSortChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minMakeYear, setMinMakeYear] = useState("");
  const [maxMakeYear, setMaxMakeYear] = useState("");

  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isDiesel, setIsDiesel] = useState(false);
  const [isBenzin, setIsBenzin] = useState(false);

  
  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  //fetching car brands and models from database
  const { data: carBrands } = useGetNewCarBrandsQuery();
  const { data: models } = useGetModelsByBrandQuery(selectedBrand);

  //once user selects a brand, model is removed
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
  };

  // bulidFilters object - every filter is optional
  const buildFilters = () => {
    const filters = {};
    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedModel) filters.model = selectedModel;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (minMakeYear) filters.minMakeYear = minMakeYear;
    if (maxMakeYear) filters.maxMakeYear = maxMakeYear;
    if (isAutomatic) filters.transmission = "Auto";
    if (isManual) filters.transmission = "Manual";
    if (isDiesel) filters.motor = "Diesel";
    if (isBenzin) filters.motor = "Benzin";
    return filters;
  };

  // filter form submission
  const handleSearch = () => {
    onFilterChange(buildFilters());
  };

  //to clean all filters
  const handleClearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setMinPrice("");
    setMaxPrice("");
    setMinMakeYear("");
    setMaxMakeYear("");
    setIsAutomatic(false);
    setIsManual(false);
    setIsDiesel(false);
    setIsBenzin(false);
    onFilterChange({}); // sends empty filters to the parent component
  };

  // handles sorting by price (low to high or vice versa)
  const handleSortByPrice = (sortOrder) => {
    onSortChange(sortOrder); // sending sort order to parent component (so it can be applied without filters)
    setDropdownVisible(false);
  };

  return (
    <div className=" p-4 rounded-lg lg:max-h-[450px] lg:max-w-[850px] mx-auto border-2 shadow-md relative m-10 hover:border-primary dark:border-dark">
      <h1 className="text-center font-semibold text-3xl text-primary">
        Filtriraj rezultate
      </h1>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start mt-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="brand" className="block mb-2">
                Marka:
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={handleBrandChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
              >
                <option value="">Odaberite marku </option>
                {carBrands?.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="model" className="block mb-2">
                Model:
              </label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
                disabled={!selectedBrand}
              >
                <option value="">Odaberite model</option>
                {models?.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="minPrice" className="block mb-2">
                Cijena (u EUR):
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
                placeholder="najniža cijena"
              />
            </div>
            <div className="flex-1 mt-8">
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
                placeholder="najviša cijena"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-4 flex space-x-2">
            <div className="flex-1">
              <label
                htmlFor="minMakeYear"
                className="block mb-2 whitespace-nowrap"
              >
                Godina proizvodnje:
              </label>
              <input
                type="number"
                id="minMakeYear"
                value={minMakeYear}
                onChange={(e) => setMinMakeYear(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
                placeholder="od"
              />
            </div>
            <div className="flex-1 mt-8">
              <input
                type="number"
                id="maxMakeYear"
                value={maxMakeYear}
                onChange={(e) => setMaxMakeYear(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
                placeholder="do"
              />
            </div>
          </div>

          <div className="mb-4 ">
            <label className="block mb-2">Mjenjač:</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="automatic"
                  checked={isAutomatic}
                  onChange={() => {
                    setIsAutomatic(!isAutomatic);
                    setIsManual(false);
                  }}
                  className="mr-2"
                />
                <label htmlFor="automatic">Automatski</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manual"
                  checked={isManual}
                  onChange={() => {
                    setIsManual(!isManual);
                    setIsAutomatic(false);
                  }}
                  className="mr-2"
                />
                <label htmlFor="manual">Ručni</label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Motor:</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diesel"
                  checked={isDiesel}
                  onChange={() => {
                    setIsDiesel(!isDiesel);
                    setIsBenzin(false);
                  }}
                  className="mr-2"
                />
                <label htmlFor="diesel">Diesel</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="benzin"
                  checked={isBenzin}
                  onChange={() => {
                    setIsBenzin(!isBenzin);
                    setIsDiesel(false);
                  }}
                  className="mr-2"
                />
                <label htmlFor="benzin">Benzin</label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 md:ml-4 relative">
          <button
            className="flex items-center justify-center w-full sm:w-auto space-x-2"
            onClick={toggleDropdown}
          >
            <IoFilterCircleOutline
              className="text-5xl dark:text-primary 
             hover:text-primary hover:scale-110 
             active:text-primary active:scale-100
              transition-transform duration-200"
            />
          </button>

          {isDropdownVisible && (
            <div
              className="absolute bg-white border rounded-lg mt-2 p-2 shadow-lg w-[180px] z-10
             dark:bg-dark dark:border-dark dark:text-white right-5"
            >
              <ul className="space-y-2">
                <li
                  className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-primary cursor-pointer"
                  onClick={() => handleSortByPrice("asc")}
                >
                  Cijena: prvo najniža
                </li>
                <li
                  className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-primary cursor-pointer"
                  onClick={() => handleSortByPrice("desc")}
                >
                  Cijena: prvo najviša
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={handleSearch} className="button-outline">
          Pretraži
        </button>
        <button onClick={handleClearFilters} className="button-outline">
          Očisti
        </button>
      </div>
    </div>
  );
};

export default CarFilterComponent;
