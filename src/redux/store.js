import {configureStore} from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import countriesReducer from "./countrySlice";

export default configureStore({
    reducer: {
        article: articlesReducer,
        country: countriesReducer,
    }
});