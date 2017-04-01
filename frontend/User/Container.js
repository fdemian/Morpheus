import React from 'react';
import { connect } from 'react-redux';
import User from './User';
import {loadUser, loadUserStories} from './Actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
	isFetching: state.user.isFetching,
    error: state.user.error,
    stories: state.user.stories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
   onLoad: (userId) => {
      dispatch(loadUser(userId));
      dispatch(loadUserStories(userId));
   }
 }
}

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default UserContainer;
