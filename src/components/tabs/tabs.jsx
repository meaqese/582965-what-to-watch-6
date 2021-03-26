import React, {useState} from 'react';
import movieProp from '../movie-card/movie-card.prop';
import {Tab} from "../../const";

const getTabContent = (movie, activeTab) => {
  switch (activeTab) {
    case Tab.OVERVIEW:
      return <>
        <div className="movie-rating">
          <div className="movie-rating__score">{movie.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">Very good</span>
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
              <span className="movie-card__details-value">1h 39m</span>
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
      return <>
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious
                  Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed movies in
                  years.</p>

                <footer className="review__details">
                  <cite className="review__author">Kate Muir</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,9</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us willing to
                  lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he
                  has added a hint of gravitas to the mix, improving the recipe.</p>

                <footer className="review__details">
                  <cite className="review__author">Bill Goodykoontz</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity, it&apos;s an
                  hour and 40 minutes I wish I could take back.</p>

                <footer className="review__details">
                  <cite className="review__author">Amanda Greever</cite>
                  <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                </footer>
              </blockquote>

              <div className="review__rating">8,0</div>
            </div>
          </div>
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly,
                  and here and there, gruesome and/or heartbreaking.</p>

                <footer className="review__details">
                  <cite className="review__author">Matthew Lickona</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,2</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the
                  content is a little more adult.</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,6</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the
                  content is a little more adult.</p>

                <footer className="review__details">
                  <cite className="review__author">Paula Fleri-Soler</cite>
                  <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">7,0</div>
            </div>
          </div>
        </div>
      </>;
  }
  return <></>;
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
