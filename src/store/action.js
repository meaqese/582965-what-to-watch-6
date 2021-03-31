export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  LOAD_MOVIES: `data/loadMovies`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  })
};
