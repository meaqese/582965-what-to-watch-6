import {ActionCreator} from "./action";
import {snakeToCamel} from "../utils";


const adaptToClient = (movies) => {
  return movies.map((movie) => snakeToCamel(movie));
};

export const fetchMovies = () => (dispatch, _getState, api) => {
  api.get(`/films`).then(({data}) => dispatch(ActionCreator.loadMovies(adaptToClient(data))));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(`/login`)
      .then(({data}) => {
        dispatch(ActionCreator.setAuthStatus(true));
        dispatch(ActionCreator.setAuthInfo(snakeToCamel(data)));
      })
      .catch(() => {});
};


export const login = ({email, password}) => (dispatch, _getState, api) => {
  api.post(`/login`, {email, password}).then(({data}) => {
    dispatch(ActionCreator.setAuthStatus(true));
    dispatch(ActionCreator.setAuthInfo(snakeToCamel(data)));
  });
};
