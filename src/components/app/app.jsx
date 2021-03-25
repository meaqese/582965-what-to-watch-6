import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import movieProp from '../movie-card/movie-card.prop';

import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import MoviePage from "../movie-page/movie-page";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFound from "../not-found/not-found";


const App = ({movies}) => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Main movies={movies}/>
      </Route>
      <Route path="/login" exact>
        <SignIn/>
      </Route>
      <Route path="/mylist" exact>
        <MyList movies={movies}/>
      </Route>
      <Route path="/films/:id" exact>
        <MoviePage movie={movies[0]} similarMovies={movies}/>
      </Route>
      <Route path="/films/:id/review" exact>
        <AddReview movie={movies[0]}/>
      </Route>
      <Route path="/player/:id" exact>
        <Player movie={movies[0]}/>
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  </BrowserRouter>;
};

App.propTypes = {
  movies: PropTypes.arrayOf(movieProp).isRequired,
};


export default App;
