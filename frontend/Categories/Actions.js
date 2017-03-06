import sendContent from '../store/callApiHelpers';

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

	  if(!state.toolbar.loggedIn)
		  return dispatch(authenticationRequired());

      const auth_token = state.session.token;
	  const endpoint = "categories";
	  const jsonData = JSON.stringify({categoryName: name, token: auth_token});

    const types = [CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE];

    dispatch(sendContent(endpoint, types, jsonData))
  }
}

/*
export function deleteCategory(id)
{
  return (dispatch, getState) => {

	  //const state = getState();
	  /if(!state.toolbar.loggedIn)
		  return dispatch(authenticationRequired());
	  /
	  const endpoint = "categories";
	  const jsonData = JSON.stringify({categoryName: name});

    const types = [CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE];

    dispatch(sendContent(endpoint, types, jsonData))
  }
}*/

export function loadCategories(){

  const _endpoint = "categories";

  return {

	  // Types of actions to emit before and after
    types: [REQUEST_CATEGORIES, RECEIVE_CATEGORIES, RECEIVE_CATEGORIES_FAILURE],

	  // Check the cache (optional):
    shouldCallAPI: (state) => true,

	  endpoint: _endpoint,

	  callHeaders: { mode: 'cors', cache: 'default' },

	  // Arguments to inject in begin/end actions
    payload: null
  }
}

export default loadCategories;
