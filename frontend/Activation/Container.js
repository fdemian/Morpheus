import React from 'react';
import { connect } from 'react-redux';
import Activation from './Activation';
import activateUser from './Actions';

const mapStateToProps = (state) => {
  return {
    isFetching: state.activation.isFetching,
    success: state.activation.success,
	error: state.activation.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: (code) => {
	    dispatch(activateUser(code));
	}
  }
}

const ActivationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Activation)

export default ActivationContainer;
