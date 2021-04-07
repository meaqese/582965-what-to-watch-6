import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../store/api-actions";

import Loading from "../loading/loading";
import NotFound from "../not-found/not-found";
import {redirectToRoute} from "../../store/action";
import {AppRoute} from "../../const";
import {format} from "../../utils";

const Player = ({id}) => {
  const {movies, isDataLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  const [isPlaying, setPlaying] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const videoRef = useRef();
  const playerRef = useRef();

  const convertSecondsToTime = (sec) => {
    const seconds = Math.round(sec);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(Math.floor(seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}:${minutes}:${secs}`;
  };

  const getTimeLineWidth = () => {
    if (videoRef.current) {
      return currentTime / (videoRef.current.duration / 100);
    } else {
      return 0;
    }
  };

  const handleTimeUpdate = () => {
    setTimeLeft(videoRef.current.duration - videoRef.current.currentTime);
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleExit = () => {
    document.exitFullscreen();
    dispatch(redirectToRoute(format(AppRoute.MOVIE, {[`:id`]: movie.id})));
  };

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchMovies());
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    }
    return () => {
      videoRef.current.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isFullscreen) {
      playerRef.current.requestFullscreen();
    }

    return () => {
      if (isFullscreen) {
        document.exitFullscreen();
      }
    };
  }, [isFullscreen]);

  if (!isDataLoaded) {
    return <Loading/>;
  }

  const movieId = movies.findIndex((value) => value.id === +id);
  if (movieId === -1) {
    return <NotFound/>;
  }
  const movie = movies[movieId];

  return (
    <div className="player" ref={playerRef}>
      <video src={movie.videoLink} className="player__video" poster={movie.posterImage} ref={videoRef} onTimeUpdate={handleTimeUpdate}/>

      <button type="button" className="player__exit" onClick={handleExit}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={getTimeLineWidth()} max="100"/>
            <div className="player__toggler" style={{left: `${getTimeLineWidth()}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{convertSecondsToTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setPlaying((isPlayState) => !isPlayState)}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? `#pause` : `#play-s`}/>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie.name}</div>

          <button type="button" className="player__full-screen" onClick={() => setFullscreen((isFullscreenState) => !isFullscreenState)}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  id: PropTypes.string.isRequired
};


export default Player;
