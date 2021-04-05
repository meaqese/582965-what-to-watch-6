import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../private-route/private-route";
import BrowserHistory from '../../browser-history';
import {AppRoute} from "../../const";

import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import MoviePage from "../movie-page/movie-page";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFound from "../not-found/not-found";


const App = () => {
  return <Router history={BrowserHistory}>
    <Switch>
      <Route path={AppRoute.ROOT} exact
        render={({history}) => <Main onMyListClick={() => history.push(AppRoute.MY_LIST)}/>}>
      </Route>
      <Route path={AppRoute.LOGIN} exact>
        <SignIn/>
      </Route>
      <PrivateRoute path={AppRoute.MY_LIST} exact
        render={() => <MyList/>}>
      </PrivateRoute>
      <Route path={AppRoute.MOVIE} exact
        render={({match: {params}, history}) =>
          <MoviePage {...params} history={history}/>}>
      </Route>
      <PrivateRoute path={AppRoute.REVIEW} exact
        render={({match: {params}}) => <AddReview {...params}/>}>
      </PrivateRoute>
      <Route path={AppRoute.PLAYER} exact
        render={({match: {params}}) => <Player {...params}/>}>
      </Route>
      <Route path={AppRoute.LOGOUT}>
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  </Router>;
};


export default App;
