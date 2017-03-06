import React from 'react';
import { connect } from 'react-redux';
import Stories from './Stories';

import loadStories, {deleteStory} from './Actions';
import {loadCategories} from '../Categories/Actions';

const mapStateToProps = (state) => {
  return {
      stories: state.stories.stories,
	  isFetching: state.stories.isFetching,
	  error: state.stories.error,
	  loggedIn: state.session.loggedIn,
	  userRole: state.session.user.role
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
	  dispatch(loadStories());
      dispatch(loadCategories());
	},
	onDelete: (id) => {
	  dispatch(deleteStory(id));
	}
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories)

export default StoriesContainer;
