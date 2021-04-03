import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";

import App from "./components/app/app";

import rootReducer from "./store/root-reducer";
import {createAPI} from "./services/api";
import {setAuthStatus} from "./store/action";
import {checkAuth} from "./store/api-actions";
import {redirect} from "./store/middlewares/redirect";


const api = createAPI(() => store.dispatch(setAuthStatus(false)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
      redirect
    })
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);

