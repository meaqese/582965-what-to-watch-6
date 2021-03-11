import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";

const movies = [
  {
    name: `Name404`,
    genre: `Action`,
    date: 2022,
  }
];


ReactDOM.render(
    <App movies={movies} />,
    document.querySelector(`#root`)
);

