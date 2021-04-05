import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

import MovieList from "../movie-list/movie-list";
import Loading from "../loading/loading";
import {fetchFavorites} from "../../store/api-actions";


const MyList = () => {
  const {favorites, isFavoritesLoaded} = useSelector((state) => state.DATA);
  const {authInfo: {avatarUrl}} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return <Loading/>;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MovieList movies={favorites}/>
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
  );
};

export default MyList;
