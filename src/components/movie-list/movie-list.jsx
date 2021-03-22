import React, {useState} from 'react';

import MovieCard from "../movie-card/movie-card";

import {types} from "../../types";

const MovieList = ({movies}) => {
  const setMovie = useState(0)[1];

  return (
    <div className="catalog__movies-list">
      { movies.map((value, index) => <MovieCard key={value.name + index} movie={value} onMouseEnter={() => setMovie(value.id)}/>) }
    </div>
  );
};


MovieList.propTypes = {
  movies: types.movies
};


export default MovieList;
