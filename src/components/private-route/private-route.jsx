import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {AppRoute} from "../../const";

const PrivateRoute = ({render, path, exact}) => {
  const {isAuthorized} = useSelector((state) => state.USER);

  return <Route path={path} exact={exact}
    render={(routeProps) => (isAuthorized === true) ? render(routeProps) : <Redirect to={AppRoute.LOGIN}/> }
  />;
};


PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};

export default PrivateRoute;
