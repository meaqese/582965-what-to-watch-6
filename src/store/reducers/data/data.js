import {createReducer} from "@reduxjs/toolkit";
import {loadMovies} from "../../action";

const initialState = {
  movies: [],
  isDataLoaded: false,
};


export const data = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
});
