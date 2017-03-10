import sendContent from '../store/callApiHelpers';

export const REQUEST_STORY = 'REQUEST_STORY';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const RECEIVE_STORY_FAILURE = 'RECEIVE_STORY_FAILURE';

export default function loadStory(storyId) {

  const _endpoint = "stories" + "/" + storyId;

  return {
    types: [REQUEST_STORY, RECEIVE_STORY, RECEIVE_STORY_FAILURE],
    shouldCallAPI: (state) => true,
	endpoint: _endpoint,
	callHeaders:  { mode: 'cors', cache: 'default' },
    payload: null
  }
}

