import { COMMENT_CHANGED, INSERT_QUOTE_FN_CHANGED } from '../../CommentBox/Actions';

const initialState = {
  text: "",
  posting: false,
  error: false,
  insertQuoteFn: null
};

export function comment(state = initialState, action) {
 switch (action.type) {

    /* UPDATE COMMENT */
    case COMMENT_CHANGED:
	   return { ...state, text: action.data };

	/* SET REPLY FUNCTION */
	case INSERT_QUOTE_FN_CHANGED:
	   return { ...state, 	insertQuoteFn: action.data };

    default:
      return state;
  }
}

export default comment;
