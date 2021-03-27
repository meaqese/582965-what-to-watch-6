import {movies} from "../mocks/movies";
import {ActionType} from "./action";


const initialState = {
  genre: `All genres`,
  movies
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...initialState,
        genre: action.payload
      };
    case ActionType.GET_MOVIES:
      if (state.genre === initialState.genre) {
        return {...initialState};
      }
      return {
        ...initialState,
        movies: movies.filter(({genre}) => genre === state.genre)
      };
  }

  return state;
};
