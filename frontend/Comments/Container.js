import React from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import {updateCommentText} from '../CommentBox/Actions';

const mapStateToProps = (state) => {
  return {
    commentText: state.comments.text,
    insertQuoteFn: state.comments.insertQuoteFn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      updateCommentText: (text) => {
	    dispatch(updateCommentText(text));
	  }
  }
}

const ConnectedComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)

export default ConnectedComment;