export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export const RECEIVE_USER_DATA_FAILURE = 'RECEIVE_USER_DATA_FAILURE';

export const REQUEST_USER_STORIES = 'REQUEST_USER_STORIES';
export const RECEIVE_USER_STORIES = 'RECEIVE_USER_STORIES';
export const RECEIVE_USER_STORIES_FAILURE = 'RECEIVE_USER_STORIES_FAILURE';

export function loadUser(userId) {

  const _endpoint = "users" + "/" + userId;

  return {
    types: [REQUEST_USER_DATA, RECEIVE_USER_DATA, RECEIVE_USER_DATA_FAILURE],
    shouldCallAPI: (state) => true,
    endpoint: _endpoint,
    callHeaders: { mode: 'cors', cache: 'default' },
    payload: null
  }
}

export function loadUserStories(userName) {

  const _endpoint = "users" + "/" + userName + "/stories";

  return {

    types: [REQUEST_USER_STORIES, RECEIVE_USER_STORIES, RECEIVE_USER_STORIES_FAILURE],
    shouldCallAPI: (state) => true,
    endpoint: _endpoint,
    callHeaders: { mode: 'cors', cache: 'default' },
    payload: null
  }
}
