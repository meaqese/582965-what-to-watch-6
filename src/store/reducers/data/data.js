import {createReducer} from "@reduxjs/toolkit";
import {loadFavorites, loadMovies, addFavorite, removeFavorite} from "../../action";

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
  builder.addCase(addFavorite, (state, action) => {
    state.favorites = state.favorites.concat(action.payload);
  });
  builder.addCase(removeFavorite, (state, action) => {
    const index = state.favorites.findIndex((value) => value.id === action.payload.id);

    if (index !== -1) {
      state.favorites = state.favorites.slice(0, index).concat(state.favorites.slice(index + 1));
    }
  });
});
