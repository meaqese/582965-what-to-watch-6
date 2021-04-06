import React, {useState, useEffect} from 'react';
import movieProp from '../movie-card/movie-card.prop';
import {Tab} from "../../const";
import {fetchComments} from "../../store/api-actions";
import Loading from "../loading/loading";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";

const getTabContent = (movie, activeTab) => {
  const [comments, setComments] = useState(null);
  const dispatch = useDispatch();

  const getRatingDescription = (rating) => {
    switch (rating) {
      case rating >= 8:
        return `Awesome`;
      case rating >= 6:
        return `Very good`;
      case rating >= 4:
        return `Good`;
      case rating >= 2:
        return `Normal`;
      default:
        return `Bad`;
    }
  };

  useEffect(() => {
    dispatch(fetchComments(movie.id, setComments));
  }, [movie]);

  const minutesToTime = (minutes) => {
    return `${Math.floor(minutes / 60)}h ${Math.floor(minutes % 60)}m`;
  };

  switch (activeTab) {
    case Tab.OVERVIEW:
      return <>
        <div className="movie-rating">
          <div className="movie-rating__score">{movie.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getRatingDescription(movie.rating)}</span>
            <span className="movie-rating__count">{movie.scoresCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{movie.description}</p>

          <p>{movie.description}</p>

          <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {movie.starring.slice(0, 4).join(`, `)} and other</strong></p>
        </div>
      </>;
    case Tab.DETAILS:
      return <>
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{movie.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value" dangerouslySetInnerHTML={{__html: movie.starring.join(`, <br/>`)}}/>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{minutesToTime(movie.runTime)}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{movie.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{movie.released}</span>
            </p>
          </div>
        </div>
      </>;
    case Tab.REVIEWS:
      if (!comments) {
        return <Loading/>;
      } else if (comments.length === 0) {
        return <p>Nothing to show...</p>;
      }

      return <>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {comments.map((comment) => (
              <div className="review" key={comment.id}>
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime={comment.date}>{dayjs(comment.date).format(`MMMM D, YYYY`)}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </>;
  }
  return null;
};

const Tabs = ({movie}) => {
  const [activeTab, setActiveTab] = useState(Tab.OVERVIEW);

  const handleClick = (evt, value) => {
    evt.preventDefault();

    setActiveTab(value);
  };

  return <>
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          { Object.values(Tab).map((value, index) => {
            const isActiveTab = (value === activeTab);
            return <li className={`movie-nav__item ${isActiveTab ? ` movie-nav__item--active` : ``}`} key={value + index}>
              <a href="#" className="movie-nav__link"
                onClick={(evt) => handleClick(evt, value)}>{value}
              </a>
            </li>;
          }) }
        </ul>
      </nav>

      {getTabContent(movie, activeTab)}
    </div>
  </>;
};

Tabs.propTypes = {
  movie: movieProp
};


export default Tabs;
