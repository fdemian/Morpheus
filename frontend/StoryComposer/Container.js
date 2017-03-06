import React from 'react';
import { connect } from 'react-redux';
import StoryComposer from './StoryComposer';

import { updateTitle, updateContent, updateCategory} from './Actions';
import postNewStory from './Actions';

const mapStateToProps = (state) => {
  return {
	  title: state.composer.title,
      content: state.composer.content,
      category: state.composer.category,
      categories: state.categories.items,
      tags: state.composer.tags,
	  posted: state.composer.posted,
	  id: state.composer.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
	onEditorChange: (rawState) => {
        dispatch(updateContent(rawState));
	},
    onTitleChange: (titleEvent) => {
        const title = titleEvent.target.value;
	    dispatch(updateTitle(title));
	},
    onCategoryChange: (category)  => {
       dispatch(updateCategory(category));
    },
	onSendClick: () => {
       dispatch(postNewStory());
	},
    onLoad: () => {
       dispatch(updateTitle(""));
       dispatch(updateContent(""));
    }
  }
}

const StoryComposerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryComposer)

export default StoryComposerContainer;
