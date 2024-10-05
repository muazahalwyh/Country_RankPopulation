import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRankCountries = createAsyncThunk(
    'Countries/fetchRankCountries',
    async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        // Map response data to the required structure
        const countryData = response.data.map((country) => ({
            name: country.name.official,
            code: country.cca3,
            population: country.population,
        }));

        // Sort by population in descending order
        return countryData.sort((a, b) => b.population - a.population);
    }
);

export const fetchCompareCountries = createAsyncThunk(
    'Countries/fetchCompareCountries',
    async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const compareData = response.data.map((country) => ({
            name: country.name.official,
            image: country.flags.png,
        }));
        return compareData.sort((a, b) => a.name.localeCompare(b.name));
    }
);

export const fetchInfoCountries = createAsyncThunk(
    'Countries/fetchInfoCountries',
    async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const compareData = response.data.map((country) => ({
            name: country.name.official,
            nameshort: country.name.common,
            image: country.flags.png,  // Image of the flag from API
            code: country.cca3,
            capital: country.capital,
            population: country.population,
            area:country.area,
            region: country.region,
            subregion: country.subregion,
            capitalInfo: country.capitalInfo.latlng       
        }));

        return compareData;
    }
);

const countriesSlice = createSlice({
    name: 'country',
    initialState: {
        rankCountries: [],
        CompareCountries:[],
        InfoCountries:[],
        isLoading: false,
        errorMessage: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRankCountries.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchRankCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.rankCountries = action.payload;
        })
        .addCase(fetchRankCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        })


        builder
        .addCase(fetchCompareCountries.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCompareCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CompareCountries = action.payload;
        })
        .addCase(fetchCompareCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        })


        builder
        .addCase(fetchInfoCountries.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchInfoCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.InfoCountries = action.payload;
        })
        .addCase(fetchInfoCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message;
        })
    },
})


export default countriesSlice.reducer;