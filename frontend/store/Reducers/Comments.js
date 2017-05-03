import { COMMENT_CHANGED } from '../../CommentBox/Actions';

const initialState = {
  text: "",
  posting: false,
  error: false,
};

export function comment(state = initialState, action) {
 switch (action.type) {
    case COMMENT_CHANGED:
	   return { ...state, text: action.data };
    default:
      return state;
  }
}

export default comment;
