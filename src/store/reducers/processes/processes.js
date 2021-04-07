import {changeGenre, setCommentsError} from "../../action";
import {createReducer} from "@reduxjs/toolkit";

const initialState = {
  genre: `All genres`,
  errorComments: ``
};

export const processes = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(setCommentsError, (state, action) => {
    state.errorComments = action.payload;
  });
});
