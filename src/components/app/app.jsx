import React from 'react';
import PropTypes from 'prop-types';
import Main from "../main/main";


const App = ({movies}) => {
  return <Main movies={movies}/>;
};

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired
      })
  ).isRequired
};


export default App;
