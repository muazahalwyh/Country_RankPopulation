import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRankCountries } from "../redux/countrySlice";

export default function RankCountry() {
    const dispatch = useDispatch();
    const { rankCountries, isLoading, errorMessage } = useSelector((state) => state.country);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of countries to display per page
    const totalPages = Math.ceil(rankCountries.length / itemsPerPage); // Total number of pages

    // Get the countries for the current page
    const indexOfLastCountry = currentPage * itemsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
    const currentCountries = rankCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    // Logic for pagination buttons
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, startPage + 4); // Show 10 buttons max
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    useEffect(() => {
        dispatch(fetchRankCountries());
    }, [dispatch]);

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

    const formatPopulation = (population) => {
        if (population >= 1_000_000_000) {
            return `${(population / 1_000_000_000).toFixed(2)} B`; // Billions
        } else {
            return `${(population / 1_000_000).toFixed(0)} M`; // Millions
        }
    };

    return (
        <div className="py-8">
            <div className="mb-4 text-center font-bold">
                <h1>RANK COUNTRY POPULATION</h1>
            </div>
            <div className="overflow-x-auto w-full max-w-4xl md:mx-40 mx-0 ">
                <div className="p-4 mx-0 md:mx-20 sm:mx-10">
                    <table className="table table-xs bg-lime-200 text-black">
                        <thead className="bg-orange-400 border-b-2 border-black text-black">
                            <tr className="text-center">
                                <th className="py-2">No</th>
                                <th className="py-2">Country</th>
                                <th className="py-2">Code</th>
                                <th className="py-2">Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCountries.map((country, index) => (
                                <tr key={country.code} className="text-center border-black">
                                    <th className="py-2">{index + indexOfFirstCountry + 1}</th>
                                    <td className="text-left py-2">{country.name}</td>
                                    <td className="py-2">{country.code}</td>
                                    <td className="py-2 border-none">{formatPopulation(country.population)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-2 overflow-x-auto">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`btn ${currentPage === number ? "btn-active" : ""}`}
                        onClick={() => setCurrentPage(number)}
                        style={{ width: '28px' }} // Set fixed width for buttons
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}
