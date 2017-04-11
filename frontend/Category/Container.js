import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import loadCategory, {loadCategoryTopics} from './Actions';

const mapStateToProps = (state) => {
  return {
    category: state.category,
	  isFetching: state.category.isFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: (categoryId) => {
	    dispatch(loadCategory(categoryId));
	    dispatch(loadCategoryTopics(categoryId, 1));
	}
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default Container;
