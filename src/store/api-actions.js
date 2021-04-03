import {setAuthInfo, setAuthStatus, redirectToRoute, loadMovies} from "./action";
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
