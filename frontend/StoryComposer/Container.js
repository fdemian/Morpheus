import React from 'react';
import { connect } from 'react-redux';
import StoryComposer from './StoryComposer';
import { 
  updateTitle, 
  updateContent, 
  updateCategory, 
  updateEditingState,
  updatePostedState,
  updateId,
  editStory,
  postNewStory
} from './Actions';

const mapStateToProps = (state) => {
  return {
  	  id: state.composer.id,
	  title: state.composer.title,
      content: state.composer.content,
      category: state.composer.category,
      categories: state.categories.items,
      tags: state.composer.tags,
	  posted: state.composer.posted,
	  editing: state.composer.editing
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
	onUpdateClick: () => {
	   dispatch(editStory());		
	},
    clearFn: () => {
       dispatch(updateId(-1));
       dispatch(updateTitle(""));
       dispatch(updateContent(null));
       dispatch(updateCategory({id: -1, name: ""}));
       dispatch(updateEditingState(false));
       dispatch(updatePostedState(false));
    }
  }
}

const StoryComposerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryComposer)

export default StoryComposerContainer;
