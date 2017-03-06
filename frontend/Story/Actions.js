import sendContent from '../store/callApiHelpers';

export const REQUEST_STORY = 'REQUEST_STORY';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const RECEIVE_STORY_FAILURE = 'RECEIVE_STORY_FAILURE';

export default function loadStory(storyId) {

  const _endpoint = "stories" + "/" + storyId;

  return {

	// Types of actions to emit before and after
    types: [REQUEST_STORY, RECEIVE_STORY, RECEIVE_STORY_FAILURE],

	// Check the cache (optional):
    shouldCallAPI: (state) => true,

	endpoint: _endpoint,

	callHeaders:  { mode: 'cors', cache: 'default' },

	// Arguments to inject in begin/end actions
    payload: null
  }
}

