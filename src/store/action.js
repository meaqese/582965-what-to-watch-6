import {createAction} from "@reduxjs/toolkit";


export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  LOAD_MOVIES: `data/loadMovies`,
  LOAD_FAVORITES: `data/loadFavorites`,
  SET_AUTH_STATUS: `user/setAuthStatus`,
  SET_AUTH_INFO: `user/setAuthInfo`,
  SET_FAVORITES_IS_LOADED: `data/setFavoritesIsLoaded`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`
};


export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => ({payload: genre}));

export const loadMovies = createAction(ActionType.LOAD_MOVIES, (movies) => ({payload: movies}));

export const setAuthStatus = createAction(ActionType.SET_AUTH_STATUS, (status) => ({payload: status}));

export const setAuthInfo = createAction(ActionType.SET_AUTH_INFO, (authInfo) => ({payload: authInfo}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({payload: url}));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (favorites) => ({payload: favorites}));

export const setFavoritesIsLoaded = createAction(ActionType.SET_FAVORITES_IS_LOADED, (status) => ({payload: status}));

