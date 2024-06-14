import React, { useState } from "react";

import {
  useGetNewCarBrandsQuery,
  useGetNewCarsModelsByBrandQuery,
} from "../slices/newCarsApiSlice";

const NewCarsFilterComponent = ({ onFilterChange, onSortChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

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


  // fetching car brands and models from the database
  const { data: carBrands } = useGetNewCarBrandsQuery();
  const { data: models } =   useGetNewCarsModelsByBrandQuery(selectedBrand);

  // handles brand change
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel("");
  };

  // build filters object - every filter is optional
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

  const handleSearch = () => {
    onFilterChange(buildFilters());
  };

  // to clear out all of the filters, when clicked on a button
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

  // sorting by price (low to high or vice versa)
  const handleSortByPrice = (sortOrder) => {
    onSortChange(sortOrder); // Sending sort order to parent component
    setDropdownVisible(false);
  };

  return (
    <div className="p-4 mr-6 rounded-lg mx-auto border-2 shadow-md relative m-10 hover:border-primary dark:border-dark lg:max-w-[600px]">
      <h1 className="text-center font-semibold text-3xl text-primary mb-4">
        Filtriraj rezultate
      </h1>

      <div className="space-y-4">
        {/* Brand Selection */}
        <div>
          <label htmlFor="brand" className="block mb-2">
            Marka:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
          >
            <option value="">Odaberite marku</option>
            {carBrands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        <div>
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

        {/* Price Range */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="minPrice" className="block mb-2">
              Cijena:
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

        {/* Make Year Range */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="minMakeYear" className="block mb-2">
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
        <div>
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

        {/* Motor Type */}
        <div>
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

        {/* Sort By Price Dropdown */}
        <div className="relative">
          <label htmlFor="sortOptions" className="block mb-2">
            Sortiraj prema:
          </label>
          <div className="relative">
            <select
              id="sortOptions"
              className="w-full px-3 py-2 border rounded-lg dark:bg-dark"
              onChange={(e) => handleSortByPrice(e.target.value)}
            >
              <option value="asc">Cijena: prvo najniža</option>
              <option value="desc">Cijena: prvo najviša</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button onClick={handleSearch} className="button-outline">
            Pretraži
          </button>
          <button onClick={handleClearFilters} className="button-outline">
            Očisti
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCarsFilterComponent;
