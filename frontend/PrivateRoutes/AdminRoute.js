import React from 'react';
import { Route } from 'react-router';
import {  Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, store, ...rest }) => {
 
 const state = store.getState();
 const willRedirect = (state.session.loggedIn && state.session.user.role == "author");		
  
 return(
 <Route {...rest}
    render={props => willRedirect ? (<Component {...props}/>) :
	  (<Redirect to={{pathname: '/login', state: { from: props.location }}} />)
    }
  />
 );
  
}

/*
const AdminRoute = ({ component: Component, state, ...rest }) => (
  <Route {...rest}
    render={props => ((state.session.loggedIn && state.session.user.role == "author") ?
            (<Component {...props}/>) :
            (<Redirect to={{pathname: '/login', state: { from: props.location }}} />) )
    }
  />
);*/

export default AdminRoute;