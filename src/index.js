import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from "./components/app/app";

import {reducer} from "./store/reducer";
import {createAPI} from "./services/api";


const api = createAPI();

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
));

ReactDOM.render(
    <Provider store={store}>
      <App movies={store.getState().movies}/>
    </Provider>,
    document.querySelector(`#root`)
);

