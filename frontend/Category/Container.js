import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import loadCategory from './Actions';

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
	  }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default Container;
