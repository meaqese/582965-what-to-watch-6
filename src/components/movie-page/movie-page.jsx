import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import movieProp from '../movie-card/movie-card.prop';

import MovieList from "../movie-list/movie-list";
import Tabs from "../tabs/tabs";
import {fetchMovies} from "../../store/api-actions";
import Loading from "../loading/loading";
import NotFound from "../not-found/not-found";


const MoviePage = ({id, movies, isDataLoaded, isAuthorized, authInfo, onLoadData}) => {
  const movieId = movies.findIndex((value) => value.id === +id);
  if (movieId === -1 && isDataLoaded) {
    return <NotFound/>;
  }
  const movie = movies[movieId];
  const similarMovies = movies.filter((value) => value.genre === movie.genre && value !== movie);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  return <>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="user-block">
            {isAuthorized ? <div className="user-block__avatar">
              <img src={authInfo.avatarUrl} alt="User avatar" width="63" height="63"/>
            </div> : <Link to={`/login`} className="btn">Sign In</Link>}
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genre}</span>
              <span className="movie-card__year">{movie.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"/>
                </svg>
                <span>My list</span>
              </button>
              {isAuthorized && <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327"/>
          </div>

          <Tabs movie={movie}/>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MovieList movies={similarMovies} count={4}/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>;
};

MoviePage.propTypes = {
  id: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieProp).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  authInfo: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  isDataLoaded: state.isDataLoaded,
  isAuthorized: state.isAuthorized,
  authInfo: state.authInfo
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchMovies());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
