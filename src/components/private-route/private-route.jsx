import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const PrivateRoute = ({render, path, exact}) => {
  const {isAuthorized} = useSelector((state) => state.USER);

  return <Route path={path} exact={exact}
    render={(routeProps) => (isAuthorized === true) ? render(routeProps) : <Redirect to={`/login`}/> }
  />;
};


PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};

export default PrivateRoute;
