import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from "../private-route/private-route";
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
        <Main/>
      </Route>
      <Route path="/login" exact>
        <SignIn/>
      </Route>
      <PrivateRoute path="/mylist" exact
        render={() => <MyList movies={movies}/>}>
      </PrivateRoute>
      <Route path="/films/:id" exact>
        <MoviePage movie={movies[0]} similarMovies={movies}/>
      </Route>
      <PrivateRoute path="/films/:id/review" exact
        render={() => <AddReview movie={movies[0]}/>}>
      </PrivateRoute>
      <Route path="/player/:id" exact>
        <Player movie={movies[0]}/>
      </Route>
      <Route path="/logout">
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  </BrowserRouter>;
};

App.propTypes = {
  movies: PropTypes.arrayOf(movieProp)
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStateToProps)(App);
