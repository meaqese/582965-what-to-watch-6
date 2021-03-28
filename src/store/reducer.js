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
  }

  return state;
};
