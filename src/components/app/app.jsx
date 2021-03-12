import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

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
        <MyList/>
      </Route>
      <Route path="/films/:id" exact>
        <MoviePage/>
      </Route>
      <Route path="/films/:id/review" exact>
        <AddReview/>
      </Route>
      <Route path="/player/:id" exact>
        <Player/>
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  </BrowserRouter>;
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
