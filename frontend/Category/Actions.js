export const REQUEST_CATEGORY_DATA = 'REQUEST_CATEGORY_DATA';
export const RECEIVE_CATEGORY_DATA = 'RECEIVE_CATEGORY_DATA';
export const RECEIVE_CATEGORY_FAILURE = 'RECEIVE_CATEGORY_FAILURE';

export const REQUEST_CATEGORY_TOPICS = 'REQUEST_CATEGORY_TOPICS';
export const RECEIVE_CATEGORY_TOPICS = 'RECEIVE_CATEGORY_TOPICS';
export const RECEIVE_CATEGORY_TOPICS_FAILURE = 'RECEIVE_CATEGORY_TOPICS_FAILURE';

export default function loadCategory(id) {

  const _endpoint = "categories/" + id;

  return {

	  // Types of actions to emit before and after
    types: [REQUEST_CATEGORY_DATA, RECEIVE_CATEGORY_DATA, RECEIVE_CATEGORY_FAILURE],

	  // Check the cache (optional):
    shouldCallAPI: (state) => true,

	  endpoint: _endpoint,

	  callHeaders: { mode: 'cors', cache: 'default' },

	  // Arguments to inject in begin/end actions
    payload: null
  }
}
