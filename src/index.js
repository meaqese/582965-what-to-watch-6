import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from "./components/app/app";

import {reducer} from "./store/reducer";
import {createAPI} from "./services/api";
import {ActionCreator} from "./store/action";
import {checkAuth} from "./store/api-actions";


const api = createAPI(() => store.dispatch(ActionCreator.setAuthStatus(false)));

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App movies={store.getState().movies}/>
    </Provider>,
    document.querySelector(`#root`)
);

