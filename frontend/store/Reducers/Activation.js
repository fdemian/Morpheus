import
{
  REQUEST_USER_ACTIVATION,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_FAILURE
} from '../../Activation/Actions';

const initialState = {
  isFetching: false,
  success: false,
  error: false
}

export function activation(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_ACTIVATION:
	    return { ...state, isFetching: true }
    case USER_ACTIVATION_SUCCESS:
	    return  { ...state, isFetching: false, success: true, error: false};
    case USER_ACTIVATION_FAILURE:
        return { ...state, isFetching: false, success: false, error: true};
    default:
        return state;
  }
}

export default activation;
