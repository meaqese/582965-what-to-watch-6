import {changeGenre} from "../../action";
import {createReducer} from "@reduxjs/toolkit";

const initialState = {
  genre: `All genres`,
};

export const processes = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  });
});
