import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { fetchInfoCountries } from "../../redux/countrySlice";

export default function CountryComparePage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { country1, country2 } = params;
  const { InfoCountries, isLoading, errorMessage } = useSelector((state) => state.country);
  const [country1Info, setCountry1Info] = useState(null);
  const [country2Info, setCountry2Info] = useState(null);

  useEffect(() => {
    dispatch(fetchInfoCountries());
  }, [ dispatch ]);

  // Use the country1 and country2 parameters to fetch data or render the page
  useEffect(() => {
    if (InfoCountries.length > 0) {
      const country1Data = InfoCountries.find((country) => country.name === country1);
      const country2Data = InfoCountries.find((country) => country.name === country2);
      setCountry1Info(country1Data);
      setCountry2Info(country2Data);
    }
  }, [InfoCountries, country1, country2]);

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

  return (
    <div className='mx-auto sm:p-10 p-0'>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-16 px-10 mb-10 auto-rows-max'>
        {country1Info && (
          <div className=" bg-lime-200 card w-full shadow-xl">
            <figure>
              <img
                src={country1Info.image}
                alt={country1Info.name}
                className="w-full h-80"/>
            </figure>
            <div className="card-body p-10">
              <h2 className="card-title gap-6 mb-2">
                {country1Info.name}
                <div className="badge badge-secondary">{country1Info.code}</div>
              </h2>
              <table className="table-fixed text-left font-semibold">
                <tbody>
                  <tr>
                    <th>Short Name</th>
                    <td>{country1Info.nameshort || "-"}</td>
                  </tr>
                  <tr>
                    <th>Capital</th>
                    <td>{country1Info.capital || "-"}</td>
                  </tr>
                  <tr>
                    <th>Population</th>
                    <td>{country1Info.population || "-"}</td>
                  </tr>
                  <tr>
                    <th>Area</th>
                    <td>{country1Info.area || "-"}</td>
                  </tr>
                  <tr>
                    <th>Sub Region</th>
                    <td>{country1Info.subregion || "-"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="card-actions justify-end mt-6">
                <div className="badge badge-outline">{country1Info.region}</div>
                <div className="badge badge-outline">{country1Info.capitalInfo}</div>
              </div>
            </div>
          </div>

        )}

        {country2Info && (
          <div className="bg-lime-200 card w-full shadow-xl">
            <figure>
              <img
                src={country2Info.image}
                alt={country2Info.name} 
                className= "w-full h-80"/>
            </figure>
            <div className="card-body p-10">
              <h2 className="card-title gap-6 mb-2">
                {country2Info.name}
                <div className="badge badge-secondary">{country2Info.code}</div>
              </h2>
              <table className="table-fixed text-left font-semibold">
                <tbody>
                  <tr>
                    <th>Short Name</th>
                    <td>{country2Info.nameshort}</td>
                  </tr>
                  <tr>
                    <th>Capital</th>
                    <td>{country2Info.capital}</td>
                  </tr>
                  <tr>
                    <th>Population</th>
                    <td>{country2Info.population}</td>
                  </tr>
                  <tr>
                    <th>Area</th>
                    <td>{country2Info.area}</td>
                  </tr>
                  <tr>
                    <th>Sub Region</th>
                    <td>{country2Info.subregion}</td>
                  </tr>
                </tbody>
              </table>
              <div className="card-actions justify-end mt-6">
                <div className="badge badge-outline">{country2Info.region}</div>
                <div className="badge badge-outline">{country2Info.capitalInfo}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};