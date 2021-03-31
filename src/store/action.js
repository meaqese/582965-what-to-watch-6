export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  LOAD_MOVIES: `data/loadMovies`,
  SET_AUTH_STATUS: `user/setAuthStatus`,
  SET_USER_EMAIL: `user/setEmail`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  setAuthStatus: (status) => ({
    type: ActionType.SET_AUTH_STATUS,
    payload: status
  }),
  setUserEmail: (email) => ({
    type: ActionType.SET_USER_EMAIL,
    payload: email
  })
};
