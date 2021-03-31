import {ActionType} from "./action";


const initialState = {
  genre: `All genres`,
  movies: [],
  isDataLoaded: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload
      };
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload,
        isDataLoaded: true
      };
  }

  return state;
};
