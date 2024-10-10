/* eslint-disable react/no-unescaped-entities */
import { ArrowPathIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchCompareCountries } from "../../redux/countrySlice";

export default function CardCompare() {
  const dispatch = useDispatch();
  const { CompareCountries, isLoading, errorMessage } = useSelector((state) => state.country);

  const [leftSelectedCountry, setLeftSelectedCountry] = useState('');
  const [rightSelectedCountry, setRightSelectedCountry] = useState('');
  const [leftCountryInfo, setLeftCountryInfo] = useState(null);
  const [rightCountryInfo, setRightCountryInfo] = useState(null);

  //toggle
  const [isLeftDropdownOpen, setIsLeftDropdownOpen] = useState(false);
  const [isRightDropdownOpen, setIsRightDropdownOpen] = useState(false);

  const leftDropdownRef = useRef(null);
  const rightDropdownRef = useRef(null);

  //input
  const [leftInputValue, setLeftInputValue] = useState("");
  const [rightInputValue, setRightInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    dispatch(fetchCompareCountries());
  }, [dispatch]);

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (leftDropdownRef.current && !leftDropdownRef.current.contains(event.target)) {
        setIsLeftDropdownOpen(false);
      }
      if (rightDropdownRef.current && !rightDropdownRef.current.contains(event.target)) {
        setIsRightDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [leftDropdownRef, rightDropdownRef]);

  useEffect(() => {
    // Filter countries based on the input value
    const filtered = CompareCountries.filter(country =>
      country.name.toLowerCase().includes(leftInputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [leftInputValue, CompareCountries]);

  useEffect(() => {
    // Filter countries based on the input value
    const filtered = CompareCountries.filter(country =>
      country.name.toLowerCase().includes(rightInputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [rightInputValue, CompareCountries]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn items-center flex">
          <span className="loading loading-spinner mr-2"></span>
          loading...
        </button>
      </div>
    );
  }

  // Error handling
  if (errorMessage) {
    return <div className="flex justify-center items-center h-screen">Error: {errorMessage}</div>;
  }

  // Handle country selection from left dropdown
  const handleLeftCountryChange = (countryName) => {
    if (rightSelectedCountry === countryName) {
      alert('You cannot select the same country on both sides! Please Change Your Select Country');
      return;
    }
    setLeftSelectedCountry(countryName);
    const selectedInfo = CompareCountries.find((country) => country.name === countryName);
    setLeftCountryInfo(selectedInfo);
    setLeftInputValue("");
    setIsLeftDropdownOpen(false);
  };

  // Handle country selection from right dropdown
  const handleRightCountryChange = (countryName) => {
    if (leftSelectedCountry === countryName) {
      alert('You cannot select the same country on both sides! Please Change Your Select Country');
      return;
    }
    setRightSelectedCountry(countryName);
    const selectedInfo = CompareCountries.find((country) => country.name === countryName);
    setRightCountryInfo(selectedInfo);
    setRightInputValue("");
    setIsRightDropdownOpen(false);
  };

  // Check if both countries are selected and not the same
  const isCompareDisabled = !leftSelectedCountry || !rightSelectedCountry || leftSelectedCountry === rightSelectedCountry;

  return (
    <div className="bg-gradient-to-t from-transparent to-blue-200">
      <div className="pt-10 pb-24 sm:pb-25 lg:pb-45">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-mono">
            Country Comparison
          </h1>
          <p className="lg:mt-4 text-lg leading-8 text-gray-600 p-10 md:p-0">
            "Every country has a story to tell, and by comparing them, we learn to appreciate the world's vast tapestry."
          </p>
        </div>
        <div className="md:flex flex-wrap justify-center mt-10 sm:px-0 px-20">
          <div className="w-80">
            <figure>
              <img
                src={leftCountryInfo ? leftCountryInfo.image : "https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-globe-icon-design-png-image_6292817.png"}
                alt={leftSelectedCountry || "Select a country"}
                className="rounded-xl w-80 h-48 object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title mb-8">{leftSelectedCountry || "Select a country"}</h3>
              <div className="card-actions" ref={leftDropdownRef}>
                <div className="relative">
                  <div
                    className="block appearance-none w-80 shadow-md bg-white text-gray-700 py-3 px-4 pr-8 rounded-lg text-sm text-left cursor-pointer"
                    onClick={() => setIsLeftDropdownOpen(!isLeftDropdownOpen)} // Toggle dropdown
                  >
                    {leftSelectedCountry || 'Select a country'}
                    <ChevronDownIcon className="fill-current w-5 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </div>

                  {/* Dropdown Menu */}
                  {isLeftDropdownOpen && (
                    <ul className="absolute z-10 mt-0.5 w-80 bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-lg shadow-md">
                      <input
                        type="text"
                        value={leftInputValue}
                        onChange={(e) => setLeftInputValue(e.target.value.toLowerCase())}
                        placeholder="Enter country name"
                        className="placeholder:text-gray-700 px-4 py-2 text-sm outline-none w-full"
                      />
                      {filteredCountries.map((country, index) => {
                        const truncatedName =
                          country.name.length > 40
                            ? country.name.slice(0, 40) + '...' // Limit to 35 characters
                            : country.name;

                        return (
                          <li key={index}>
                            <a
                              className={`block px-4 py-1 text-left text-sm hover:bg-gray-200 cursor-pointer"
                              `}
                              onClick={() =>
                                handleLeftCountryChange(country.name)
                              }
                            >
                              {truncatedName}
                            </a>
                          </li>
                        );
                      })}
                      {filteredCountries.length === 0 && (
                        <li>
                          <span className="block px-4 py-1 text-left text-sm text-gray-400">No countries found</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-96 w-full content-center">
            <div className="card-body items-center text-center">
              <ArrowPathIcon className="w-14 mb-4" />
              <h2 className="card-title mb-10"> Select other countries :</h2>
            </div>
          </div>

          <div className="w-80">
            <figure>
              <img
                src={rightCountryInfo ? rightCountryInfo.image : "https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-globe-icon-design-png-image_6292817.png"}
                alt={rightSelectedCountry || "Select a country"}
                className="rounded-xl w-80 h-48 object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title mb-8 ">{rightSelectedCountry || "Select a country"}</h2>
              <div className="card-actions" ref={rightDropdownRef}>
                <div className="relative">
                  <div
                    className="block appearance-none w-80 shadow-md bg-white text-gray-700 py-3 px-4 pr-8 rounded-lg text-sm text-left cursor-pointer"
                    onClick={() => setIsRightDropdownOpen(!isRightDropdownOpen)} // Toggle dropdown
                  >
                    {rightSelectedCountry || 'Select a country'}
                    <ChevronDownIcon className="fill-current w-5 absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </div>

                  {/* Dropdown Menu */}
                  {isRightDropdownOpen && (
                    <ul className="absolute z-10 mt-0.5 w-80 bg-white border border-gray-300 max-h-40 overflow-y-auto rounded-lg shadow-md">
                      <input
                        type="text"
                        value={rightInputValue}
                        onChange={(e) => setRightInputValue(e.target.value.toLowerCase())}
                        placeholder="Enter country name"
                        className="placeholder:text-gray-700 px-4 py-2 text-sm outline-none w-full"
                      />
                      {filteredCountries.map((country, index) => (
                        <li key={index}>
                          <a
                            className={`block px-4 py-1 text-left text-sm hover:bg-gray-200 cursor-pointer"
                              `}
                            onClick={() =>
                              handleRightCountryChange(country.name)
                            }
                          >
                            {country.name}
                          </a>
                        </li>
                      ))}
                      {filteredCountries.length === 0 && (
                        <li>
                          <span className="block px-4 py-1 text-left text-sm text-gray-400">No countries found</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div className="card-actions">
            <Link to={`/compare/${leftSelectedCountry}/${rightSelectedCountry}`}>
              <button className="btn btn-primary hover:bg-green-400 hover:border-green-400 px-12"
                disabled={isCompareDisabled}>COMPARE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}