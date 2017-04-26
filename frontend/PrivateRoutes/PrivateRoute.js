import React from 'react';
import { Route } from 'react-router';
import {  Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest, state }) => (
  <Route {...rest} render={props => (state.session.loggedIn ? (<Component {...props}/>) :
  (<Redirect to={{pathname: '/login', state: { from: props.location }}} />) )}
  />
);

export default PrivateRoute;