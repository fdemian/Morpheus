import React from 'react';
import { connect } from 'react-redux';
import Stories from './Stories';

import loadStories, {deleteStory} from './Actions';
import {loadCategories} from '../Categories/Actions';

import { updateId, updateTitle, updateCategory, updateContent, updateEditingState} from '../StoryComposer/Actions';


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
	},
	onEditClick: (id, title, category, content) => {
	   dispatch(updateId(id));
       dispatch(updateTitle(title));
       dispatch(updateCategory(category));
       dispatch(updateContent(content));
       dispatch(updateEditingState(true));
	}
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories)

export default StoriesContainer;
