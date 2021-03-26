import React, {useRef, useEffect} from 'react';
import PropTypes from "prop-types";


const VideoPlayer = ({isPlaying, movie}) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.volume = 0;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        videoRef.current.src = movie.previewVideoLink;
        videoRef.current.play();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      videoRef.current.pause();
      videoRef.current.src = ``;
    };
  }, [isPlaying]);

  return (
    <video src={movie.previewVideoLink} poster={movie.previewImage} ref={videoRef} width={280} height={175}/>
  );
};

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired
  })
};

export default VideoPlayer;
