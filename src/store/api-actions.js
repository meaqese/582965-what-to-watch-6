import {
  setAuthInfo,
  setAuthStatus,
  redirectToRoute,
  loadMovies,
  loadFavorites,
  addFavorite, removeFavorite, loadPromoMovie, setCommentsError
} from "./action";
import {APIRoute, AppRoute} from "../const";
import {format, convertSnakeToCamel} from "../utils";


const adaptToClient = (movies) => {
  return movies.map((movie) => convertSnakeToCamel(movie));
};

export const fetchMovies = () => (dispatch, _getState, api) => {
  api.get(APIRoute.MOVIES).then(({data}) => dispatch(loadMovies(adaptToClient(data))));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(convertSnakeToCamel(data)));
  }).catch(() => {});
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password}).then(({data}) => {
    dispatch(setAuthStatus(true));
    dispatch(setAuthInfo(convertSnakeToCamel(data)));
    dispatch(redirectToRoute(AppRoute.ROOT));
  }).catch(() => {});
};

export const fetchComments = (id, setComments) => (dispatch, _getState, api) => {
  api.get(format(APIRoute.COMMENT, id)).then(({data}) => setComments(adaptToClient(data)));
};

export const addComment = (id, data) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.COMMENT, id), data).then(() => {
    dispatch(redirectToRoute(format(AppRoute.MOVIE, {[`:id`]: id})));
  }).catch(() => {
    dispatch(setCommentsError(`Failed to send your feedback :(`));
  });
};

export const fetchFavorites = () => (dispatch, _getState, api) => {
  api.get(APIRoute.GET_FAVORITE).then(({data}) => dispatch(loadFavorites(adaptToClient(data)))).catch(() => {});
};

export const addToFavorites = (id) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.POST_FAVORITE, id, 1)).then(({data}) => {
    dispatch(addFavorite(convertSnakeToCamel(data)));
  });
};

export const removeFromFavorites = (id) => (dispatch, _getState, api) => {
  api.post(format(APIRoute.POST_FAVORITE, id, 0)).then(({data}) => {
    dispatch(removeFavorite(data));
  });
};

export const fetchPromoMovie = () => (dispatch, _getState, api) => {
  api.get(APIRoute.PROMO_MOVIE).then(({data}) => {
    dispatch(loadPromoMovie(convertSnakeToCamel(data)));
  });
};
