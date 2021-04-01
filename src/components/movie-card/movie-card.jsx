import React, {useState} from "react";
import movieProp from './movie-card.prop';
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";

const MovieCard = ({movie: {id, name, previewImage, previewVideoLink}}) => {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image"
        onMouseEnter={() => setPlaying(true)} onMouseLeave={() => setPlaying(false)}>
        <VideoPlayer movie={{previewImage, previewVideoLink}} isPlaying={isPlaying}/>
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: movieProp
};

export default MovieCard;

