import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import {updateUsernameFn, updatePasswordFn} from '../Register/Actions';
import login from './Actions';

const mapStateToProps = (state) => {
  return {
    oauthProviders: state.app.oauth,
    isLoggedIn: state.session.loggedIn,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      localSignIn: (username, password) => {
	    dispatch(login(username, password));
	  },
	  updateUsername: (username) => {
	    dispatch(updateUsernameFn(username));
	  },
	  updatePassword: (password) => {
	    dispatch(updatePasswordFn(password));
	  }
  }
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default ConnectedLogin;