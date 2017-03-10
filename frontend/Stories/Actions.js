import {_DELETE} from '../store/callApiHelpers';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const RECEIVE_TOPICS_FAILURE = 'RECEIVE_TOPICS_FAILURE';

export const DELETE_STORY = 'DELETE_STORY';
export const DELETE_STORY_OK = 'DELETE_STORY_OK';
export const DELETE_STORY_FAILURE = 'DELETE_STORY_FAILURE';

function loadTopics() {

  const _endpoint = 'stories';

  return {
   types: [REQUEST_TOPICS, RECEIVE_TOPICS, RECEIVE_TOPICS_FAILURE],
   shouldCallAPI: (state) => true,
   endpoint: _endpoint,
   callHeaders: { mode: 'cors', cache: 'default' },
   payload: null
  }
}

export default loadTopics;


export function deleteStory(id){

      return (dispatch, getState) => {
  	  const state = getState();
      const _token = state.session.token;

      const _endpoint = 'stories/' + id;
      const _types = [DELETE_STORY, DELETE_STORY_OK, DELETE_STORY_FAILURE];

      dispatch(_DELETE(_endpoint, _types, _token));
    }
}