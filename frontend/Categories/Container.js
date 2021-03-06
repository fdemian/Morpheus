import React from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import loadCategories, {createCategory, deleteCategory} from './Actions';

const mapStateToProps = (state) => {
  return {
    categories: state.categories.items,
	isFetching: state.categories.isFetching,
    error: state.categories.error,
    isLoggedIn: state.session.loggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
  	  dispatch(loadCategories());
    },
    onCreate: (name) => {
      dispatch(createCategory(name));
    },
    onDelete: (id) => {
      dispatch(deleteCategory(id));
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default Container;
