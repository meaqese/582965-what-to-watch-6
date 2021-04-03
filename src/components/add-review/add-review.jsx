import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {AppRoute} from "../../const";
import {format} from "../../utils";
import {fetchMovies} from "../../store/api-actions";
import PropTypes from 'prop-types';

import AddReviewForm from "../add-review-form/add-review-form";
import Loading from "../loading/loading";


const AddReview = ({id}) => {
  const {movies, isDataLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  const movie = movies.filter((value) => value.id === +id)[0];

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchMovies());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundImage} alt={movie.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={format(AppRoute.MOVIE, {[`:id`]: movie.id})} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterImage} alt={movie.name + ` poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  id: PropTypes.string.isRequired
};


export default AddReview;
