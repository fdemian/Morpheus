import React from 'react';
import { connect } from 'react-redux';
import Register from './Register';

import {
  register,
  updateEmailFn,
  updateNameFn,
  updateUsernameFn,
  updatePasswordFn
} from './Actions';

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    isLoggedIn: state.session.isLoggedIn,
    error: state.session.error,
    authType: state.session.authType,
    oauthProviders: state.app.oauth
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRegisterClick: () => {
	  dispatch(register());
	},
    updateEmail: (value) =>{
      dispatch(updateEmailFn(value));
    },
    updateName: (value) => {
      dispatch(updateNameFn(value));
    },
    updateUsername: (value) => {
      dispatch(updateUsernameFn(value));
    },
    updatePassword: (value) => {
      dispatch(updatePasswordFn(value));
    }
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default RegisterContainer;
