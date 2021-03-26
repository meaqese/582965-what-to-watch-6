import React, {useState} from 'react';
import PropTypes from "prop-types";
import movieProp from '../movie-card/movie-card.prop';

import MovieCard from "../movie-card/movie-card";


const MovieList = ({movies, count = 8}) => {
  const setMovie = useState(0)[1];

  return (
    <div className="catalog__movies-list">
      { movies.slice(0, count).map((value, index) => <MovieCard key={value.name + index} movie={value} onMouseEnter={() => setMovie(value.id)}/>) }
    </div>
  );
};


MovieList.propTypes = {
  count: PropTypes.number,
  movies: PropTypes.arrayOf(movieProp).isRequired
};


export default MovieList;
