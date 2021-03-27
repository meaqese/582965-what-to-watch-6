import React from 'react';
import PropTypes from 'prop-types';
import movieProp from '../movie-card/movie-card.prop';
import {connect} from 'react-redux';

import MovieList from "../movie-list/movie-list";

import {ActionCreator} from "../../store/action";


const GenreList = ({genre, movies, changeGenre, getMovies}) => {
  const genres = Array.from(new Set([`All genres`, ...movies.map((movie) => movie.genre)]));

  const handleClick = (evt, value) => {
    evt.preventDefault();

    changeGenre(value);
  };
  console.log(getMovies());
  return <>
    <ul className="catalog__genres-list">
      {genres.map((value, index) => (
        <li className={`catalog__genres-item ${ value === genre ? `catalog__genres-item--active` : ``}`} key={value + index}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => handleClick(evt, value)}>{value}</a>
        </li>
      ))}
    </ul>

    <MovieList movies={getMovies()}/>
  </>;
};

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieProp),
  changeGenre: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  getMovies() {
    return ActionCreator.getMovies();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
