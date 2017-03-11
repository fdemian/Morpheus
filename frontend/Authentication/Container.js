import React from 'react';
import { connect } from 'react-redux';
import Authentication from './Authentication';
import signIn from './Actions';
import register from '../Register/Actions';

const mapStateToProps = (state) => {
  return {
     user: state.session.user,
	 isFetching: state.session.isFetching,
	 error: state.session.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    performAuth:(type, token, redirectURL, username, password) => {
	  dispatch(signIn(type, token, redirectURL, username, password));
	},
    performRegistration(type, token){
      dispatch(register(type, token));
    }
  }
}

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication)

export default AuthContainer;
