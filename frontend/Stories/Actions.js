import {_DELETE} from '../store/callApiHelpers';
import Fetch from '../store/Fetch';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const RECEIVE_TOPICS_FAILURE = 'RECEIVE_TOPICS_FAILURE';

export const DELETE_STORY = 'DELETE_STORY';
export const DELETE_STORY_OK = 'DELETE_STORY_OK';
export const DELETE_STORY_FAILURE = 'DELETE_STORY_FAILURE';

function loadTopics() {
 return (dispatch, getState) => {
  dispatch(Fetch.GET('/api/stories', [REQUEST_TOPICS, RECEIVE_TOPICS, RECEIVE_TOPICS_FAILURE]));
 }
}

export default loadTopics;


export function deleteStory(id){

      return (dispatch, getState) => {

  	  const state = getState();
      const _token = state.session.token;

      dispatch(Fetch.DELETE('/api/stories/' + id, [DELETE_STORY, DELETE_STORY_OK, DELETE_STORY_FAILURE]));
    }
}