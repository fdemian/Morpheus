import
{
  REQUEST_CONFIG_DATA,
  RECEIVE_CONFIG_DATA,
  RECEIVE_CONFIG_FAILURE
} from '../../App/Actions';

const initialState = {
  oauth: [],
  isFetching: false,
  error: false
}

export function app(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CONFIG_DATA:
	    return { ...state, isFetching: true }
    case RECEIVE_CONFIG_DATA:
	    return  { ...state, oauth: action.data.oauth };
    case RECEIVE_CONFIG_FAILURE:
        return { ...state, isFetching: false, error: true};
    default:
        return state;
  }
}

export default app;
