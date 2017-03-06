import
{
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  RECEIVE_USER_DATA_FAILURE,
  REQUEST_USER_STORIES,
  RECEIVE_USER_STORIES,
  RECEIVE_USER_STORIES_FAILURE,
} from '../../User/Actions';

const initialState = {
  user: {},
  isFetching: false,
  error: false,
  stories: []
}

export function user(state = initialState, action) {
  switch (action.type)
  {
    case REQUEST_USER_DATA:
      return { ...state, isFetching: true }
    case RECEIVE_USER_DATA:
	    return { ...state, user: action.data.user, isFetching: false}
    case RECEIVE_USER_DATA_FAILURE:
	    return { ...state, error: true, isFetching: false}
    case REQUEST_USER_STORIES:
	    return { ...state, isFetching: true}
    case RECEIVE_USER_STORIES:
	    return { ...state, stories: action.data, isFetching: false}
    case RECEIVE_USER_STORIES_FAILURE:
  	  return { ...state, error: true, isFetching: false}
    default:
      return state;
  }
}

export default user;
