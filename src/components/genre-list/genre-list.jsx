import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from "react-redux";

import MovieList from "../movie-list/movie-list";
import Loading from "../loading/loading";

import {changeGenre as actionChangeGenre} from "../../store/action";
import {fetchMovies} from "../../store/api-actions";


const GenreList = () => {
  const {genre} = useSelector((state) => state.PROCESSES);
  const {movies, isDataLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  const genres = useMemo(() => Array.from(new Set([`All genres`, ...movies.map((movie) => movie.genre)])), [movies]);
  const filteredMovies = genre === genres[0] ? movies : movies.filter((value) => value.genre === genre);

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchMovies());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  const handleClick = (evt, value) => {
    evt.preventDefault();

    dispatch(actionChangeGenre(value));
  };

  return <>
    <ul className="catalog__genres-list">
      {genres.map((value) => (
        <li className={`catalog__genres-item ${ value === genre ? `catalog__genres-item--active` : ``}`} key={value}>
          <a href="#" className="catalog__genres-link" onClick={(evt) => handleClick(evt, value)}>{value}</a>
        </li>
      ))}
    </ul>

    <MovieList movies={filteredMovies}/>
  </>;
};


export default GenreList;
