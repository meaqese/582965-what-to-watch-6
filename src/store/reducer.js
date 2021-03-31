import {ActionType} from "./action";


const initialState = {
  genre: `All genres`,
  movies: [],
  isDataLoaded: false,
  isAuthorized: false,
  userEmail: ``
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
    case ActionType.SET_AUTH_STATUS:
      return {
        ...state,
        isAuthorized: action.payload
      };
    case ActionType.SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload
      };
  }

  return state;
};
