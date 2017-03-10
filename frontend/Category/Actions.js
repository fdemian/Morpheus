export const REQUEST_CATEGORY_DATA = 'REQUEST_CATEGORY_DATA';
export const RECEIVE_CATEGORY_DATA = 'RECEIVE_CATEGORY_DATA';
export const RECEIVE_CATEGORY_FAILURE = 'RECEIVE_CATEGORY_FAILURE';

export const REQUEST_CATEGORY_TOPICS = 'REQUEST_CATEGORY_TOPICS';
export const RECEIVE_CATEGORY_TOPICS = 'RECEIVE_CATEGORY_TOPICS';
export const RECEIVE_CATEGORY_TOPICS_FAILURE = 'RECEIVE_CATEGORY_TOPICS_FAILURE';

export default function loadCategory(id) {

  const _endpoint = "categories/" + id;

  return {
    types: [REQUEST_CATEGORY_DATA, RECEIVE_CATEGORY_DATA, RECEIVE_CATEGORY_FAILURE],
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders: { mode: 'cors', cache: 'default' },
    payload: null
  }
}
