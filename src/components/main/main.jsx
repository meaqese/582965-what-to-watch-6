import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {AppRoute} from "../../const";
import {format} from "../../utils";
import PropTypes from 'prop-types';

import GenreList from "../genre-list/genre-list";
import {addToFavorites, fetchPromoMovie, removeFromFavorites} from "../../store/api-actions";
import Loading from "../loading/loading";
import {useFavorites} from "../../hooks/useFavorites";

const Main = ({history}) => {
  const {isAuthorized, authInfo: {avatarUrl}} = useSelector((state) => state.USER);
  const {promo, isPromoMovieLoaded} = useSelector((state) => state.DATA);
  const [isFavoritesLoaded, favorites] = useFavorites();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPromoMovieLoaded) {
      dispatch(fetchPromoMovie());
    }
  }, [isPromoMovieLoaded]);

  if (!isPromoMovieLoaded) {
    return <Loading/>;
  }

  const movieInFavorites = favorites.findIndex((value) => value.id === promo.id);

  const handleAddToMyList = () => {
    if (movieInFavorites === -1) {
      dispatch(addToFavorites(promo.id));
    } else if (movieInFavorites > -1) {
      dispatch(removeFromFavorites(promo.id));
    }
  };

  return <>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promo.backgroundImage} alt={promo.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          {(isAuthorized === true) ? <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63" onClick={() => history.push(AppRoute.MY_LIST)}/>
          </div> : <Link to={`/login`} className="btn">Sign In</Link>}
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promo.posterImage} alt={promo.name + `poster`} width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promo.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promo.genre}</span>
              <span className="movie-card__year">{promo.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(format(AppRoute.PLAYER, {[`:id`]: promo.id}))}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={handleAddToMyList}>
                {isFavoritesLoaded && <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref={movieInFavorites !== -1 ? `#in-list` : `#add`}/>
                </svg> }
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
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

Main.propTypes = {
  history: PropTypes.object.isRequired
};


export default Main;
