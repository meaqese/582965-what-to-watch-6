import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({render, path, exact, isAuthorized}) => {
  return <Route path={path} exact={exact}
    render={(routeProps) => (isAuthorized === true) ? render(routeProps) : <Redirect to={`/login`}/> }
  />;
};


PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized
});


export default connect(mapStateToProps)(PrivateRoute);
