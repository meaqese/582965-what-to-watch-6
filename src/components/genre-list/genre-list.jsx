import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import movieProp from '../movie-card/movie-card.prop';
import {connect} from 'react-redux';

import MovieList from "../movie-list/movie-list";
import Loading from "../loading/loading";

import {ActionCreator} from "../../store/action";
import {fetchMovies} from "../../store/api-actions";


const GenreList = ({genre, movies, changeGenre, onLoadData, isDataLoaded}) => {
  const genres = Array.from(new Set([`All genres`, ...movies.map((movie) => movie.genre)]));
  const filteredMovies = genre === genres[0] ? movies : movies.filter((value) => value.genre === genre);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  const handleClick = (evt, value) => {
    evt.preventDefault();

    changeGenre(value);
  };

  return <>
    <ul className="catalog__genres-list">
      {genres.map((value, index) => (
        <li className={`catalog__genres-item ${ value === genre ? `catalog__genres-item--active` : ``}`} key={value + index}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => handleClick(evt, value)}>{value}</a>
        </li>
      ))}
    </ul>

    <MovieList movies={filteredMovies}/>
  </>;
};

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieProp),
  changeGenre: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies,
  isDataLoaded: state.isDataLoaded
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  onLoadData() {
    dispatch(fetchMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
