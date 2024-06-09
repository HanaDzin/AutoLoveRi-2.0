import React, { useState } from "react";
import { IoFilterCircleOutline } from "react-icons/io5";

import {
  useGetNewCarsByPriceAscQuery,
  useGetNewCarsByPriceDescQuery,
} from "../slices/newCarsApiSlice";

const carData = {
  Audi: ["A3", "A4", "Q7", "Q5"],
  BMW: ["3 Series", "5 Series", "X5", "X3"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLA"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
};

const CarFilterComponent = ({ onSelect }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [sortByPrice, setSortByPrice] = useState("");

  //filtering by price
  const {
    data: newCarsAsc,
    isLoading: isLoadingAsc,
    error: errorAsc,
  } = useGetNewCarsByPriceAscQuery(sortByPrice === "asc" ? undefined : null);
  const {
    data: newCarsDesc,
    isLoading: isLoadingDesc,
    error: errorDesc,
  } = useGetNewCarsByPriceDescQuery(sortByPrice === "desc" ? undefined : null);

  const isLoading = isLoadingAsc || isLoadingDesc;
  const error = errorAsc || errorDesc;

  const handleSortByPrice = (sortOrder) => {
    setSortByPrice(sortOrder);
    setDropdownVisible(false);
  };

  const sortedData = sortByPrice === "asc" ? newCarsAsc : newCarsDesc;
  onSelect(sortedData);

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

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
  };

  const handleSearch = () => {
    // Implement your search logic here
  };

  return (
    <div
      className="filter-component p-6 rounded-lg max-w-[300] mx-auto border-2 shadow-md relative m-10
    hover:border-primary dark:border-dark"
    >
      <h1 className="text-center font-semibold text-3xl text-primary">
        Filtriraj rezultate
      </h1>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start mt-4">
        {/* Left Side: Brand, Model, and Price */}
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
                <option value="">Odaberite marku vozila</option>
                {Object.keys(carData).map((brand) => (
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
                disabled={!selectedBrand} // Disable if no brand is selected
              >
                <option value="">Odaberite model</option>
                {selectedBrand &&
                  carData[selectedBrand].map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
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

          {/* Year of Production */}
        </div>

        {/* Right Side: Year, Transmission, and Fuel */}
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
          {/* Transmission Type */}
          <div className="mb-4 ">
            <label className="block mb-2">Mjenjač:</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="automatic"
                  checked={isAutomatic}
                  onChange={() => setIsAutomatic(!isAutomatic)}
                  className="mr-2"
                />
                <label htmlFor="automatic">Automatski</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="manual"
                  checked={isManual}
                  onChange={() => setIsManual(!isManual)}
                  className="mr-2"
                />
                <label htmlFor="manual">Ručni</label>
              </div>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="mb-4">
            <label className="block mb-2">Motor:</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="diesel"
                  checked={isDiesel}
                  onChange={() => setIsDiesel(!isDiesel)}
                  className="mr-2"
                />
                <label htmlFor="diesel">Diesel</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="benzin"
                  checked={isBenzin}
                  onChange={() => setIsBenzin(!isBenzin)}
                  className="mr-2"
                />
                <label htmlFor="benzin">Benzin</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Button with Dropdown */}
      <div className="absolute top-2 right-2 md:top-0 md:right-0 p-2">
        <div
          className="border-2 border-black p-1 rounded-lg hover:border-primary transition transform hover:scale-110 cursor-pointer"
          onClick={toggleDropdown}
        >
          <IoFilterCircleOutline className="text-4xl" />
        </div>
        {isDropdownVisible && (
          <div className="absolute right-2 mt-4 w-40 bg-white dark:bg-dark border border-gray-300 dark:border-dark rounded-lg shadow-lg z-10">
            <ul className="py-1">
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

      {/* Search Button */}
      <div className="flex justify-center mt-6">
        <button className="button-outline" onClick={handleSearch}>
          Pretraži
        </button>
      </div>
    </div>
  );
};

export default CarFilterComponent;
