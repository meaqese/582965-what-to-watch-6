import {createReducer} from "@reduxjs/toolkit";
import {loadFavorites, loadMovies, setFavoritesIsLoaded} from "../../action";

const initialState = {
  movies: [],
  favorites: [],
  isDataLoaded: false,
  isFavoritesLoaded: false
};


export const data = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
  builder.addCase(loadFavorites, (state, action) => {
    state.favorites = action.payload;
    state.isFavoritesLoaded = true;
  });
  builder.addCase(setFavoritesIsLoaded, (state, action) => {
    state.isFavoritesLoaded = action.payload;
  });
});
