import {setAuthInfo, setAuthStatus, redirectToRoute, loadMovies, loadFavorites, setFavoritesIsLoaded} from "./action";
import {APIRoute, AppRoute} from "../const";
import {format, snakeToCamel} from "../utils";


const adaptToClient = (movies) => {
  return movies.map((movie) => snakeToCamel(movie));
};

export const fetchMovies = () => (dispatch, _getState, api) => {
  api.get(APIRoute.MOVIES).then(({data}) => dispatch(loadMovies(adaptToClient(data))));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(snakeToCamel(data)));
  }).catch(() => {});
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password}).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(snakeToCamel(data)));
    dispatch(redirectToRoute(AppRoute.ROOT));
  });
};

export const commentPost = ({id}) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.COMMENT, id)).then();
};

export const fetchFavorites = () => (dispatch, _getState, api) => {
  api.get(APIRoute.GET_FAVORITE).then(({data}) => dispatch(loadFavorites(adaptToClient(data))));
};

export const addToFavorites = (id) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.POST_FAVORITE, id, 1)).then(() => {
    dispatch(setFavoritesIsLoaded(false));
  });
};

export const removeFromFavorites = (id) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.POST_FAVORITE, id, 0)).then(() => {
    dispatch(setFavoritesIsLoaded(false));
  });
};
