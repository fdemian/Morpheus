import {_POST, _PUT, _DELETE} from '../store/callApiHelpers';


export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_CATEGORIES_FAILURE = 'RECEIVE_CATEGORIES_FAILURE';


export function createCategory(name)
{
  return (dispatch, getState) => {

	const state = getState();

    const _token = state.session.token;
	const endpoint = "categories";
	const jsonData = JSON.stringify({name: name});
    const types = [CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE];

    dispatch(_POST(endpoint, types, jsonData, _token));
  }
}


export function deleteCategory(id)
{
  return (dispatch, getState) => {

      const state = getState();
      const _token = state.session.token;
	  const endpoint = "categories/" + id;
      const types = [DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE];
      dispatch(_DELETE(endpoint, types, _token));
  }
}

export function loadCategories()
{

  const _endpoint = "categories";

  return {
    types: [REQUEST_CATEGORIES, RECEIVE_CATEGORIES, RECEIVE_CATEGORIES_FAILURE],
    shouldCallAPI: (state) => true,
    endpoint: _endpoint,
	callHeaders: { mode: 'cors', cache: 'default' },
    payload: null
  }
}

export default loadCategories;
