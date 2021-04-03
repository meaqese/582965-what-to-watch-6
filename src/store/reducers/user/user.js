import {createReducer} from "@reduxjs/toolkit";
import {setAuthStatus, setAuthInfo} from "../../action";

const initialState = {
  isAuthorized: false,
  authInfo: {}
};

export const user = createReducer(initialState, (builder) => {
  builder.addCase(setAuthStatus, (state, action) => {
    state.isAuthorized = action.payload;
  });
  builder.addCase(setAuthInfo, (state, action) => {
    state.authInfo = action.payload;
  });
});


