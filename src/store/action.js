export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  })
};
