import React from 'react';
import { connect } from 'react-redux';
import Story from './Story';

import loadStory from './Actions';

const mapStateToProps = (state) => {
  return {
    story: state.story,
    isLoggedIn: state.session.loggedIn,
    oauthProviders: state.app.oauth
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: (storyId) => {
	    dispatch(loadStory(storyId));
	}
  }
}

const StoryComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Story)

export default StoryComponent;
