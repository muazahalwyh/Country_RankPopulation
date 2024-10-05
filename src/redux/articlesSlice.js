import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_ARTICLES_API_KEY;
const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
        async (Peace, { rejectWithValue }) => {
            try {
            const response = await axios.get(baseUrl, {
                params: {
                    q: Peace,
                    'api-key': API_KEY,
                },
            });
            return response.data.response.docs; // mengembalikan daftar artikel
            } catch (error) {
            return rejectWithValue(error.response.data);
            }
        }
    );

    const articleSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        isLoading: false,
        errorMessage: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchArticles.pending, (state) => {
            state.isLoading = true ;
          })
          .addCase(fetchArticles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.articles = action.payload;
          })
          .addCase(fetchArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
          });
    },
})

export default articleSlice.reducer;