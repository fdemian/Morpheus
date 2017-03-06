import
{
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  RECEIVE_TOPICS_FAILURE,
  DELETE_STORY,
  DELETE_STORY_OK,
  DELETE_STORY_FAILURE
} from '../../Stories/Actions';

const initialStoriesState = {
  stories: [],
  isFetching: false,
  error: false
}

export function topics(state = initialStoriesState, action) {
 switch (action.type) {
  case REQUEST_TOPICS:
	  return { ...state, isFetching: true }
  case RECEIVE_TOPICS:
	  return { ...state, stories: action.data, isFetching: false, error: false }
	case RECEIVE_TOPICS_FAILURE:
	  return { ...state, isFetching: false, error: true }
  case DELETE_STORY:
      console.log(state.stories)
	  return { ...state, isFetching: true }
  case DELETE_STORY_OK:
      const updatedStories = state.stories.filter(element => element.id != action.data.id);
	  return { ...state, stories: updatedStories, isFetching: false, error: false }
	case DELETE_STORY_FAILURE:
	  return { ...state, isFetching: false, error: true }
	default:
      return state;
  }
}

export default topics;
