import React from 'react';
import { connect } from 'react-redux';
import CommentBox from './CommentBox';
import {updateCommentText, postNewComment, updateQuoteFn} from './Actions';
import login from './Actions';

const mapStateToProps = (state) => {
  return {
    commentText: state.comments.text,
    posting: state.comments.posting
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      updateCommentText: (text) => {
	    dispatch(updateCommentText(text));
	  },
      postComment: (content) => {
        dispatch(postNewComment(content));
	  },
	  updateQuoteFunction: (newFn) => {
	     dispatch(updateQuoteFn(newFn));
	  }
  }
}

const ConnectedCommentBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox)

export default ConnectedCommentBox;