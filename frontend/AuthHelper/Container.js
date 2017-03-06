import React from 'react';
import { connect } from 'react-redux';
import Authentication from './AuthDialog';
import signIn from './Actions';
import getUserInfo from '../Register/Actions';

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
    registerData(type, token){
      dispatch(getUserInfo(type, token));
    }
  }
}

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication)

export default AuthContainer;
