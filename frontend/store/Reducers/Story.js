import
{
  REQUEST_STORY,
  RECEIVE_STORY,
  RECEIVE_STORY_FAILURE,
}
from '../../Story/Actions';

import {
 POST_COMMENT,
 POST_COMMENT_OK,
 POST_COMMENT_FAILURE
} from '../../CommentBox/Actions';

const initialState = {
  id : 0,
  title: "",
  category: {id:0, name:""},
  content: "",
  comments: [],
  isFetching: true,
  error: false
}

export function story(state = initialState, action) {
 switch (action.type) {
    case REQUEST_STORY:
	     return { ...state, isFetching: true, error:false };
    case RECEIVE_STORY:
         const new_story = action.data;
         new_story["isFetching"] = false;
         new_story["error"] = false;
	     return new_story ;
    case RECEIVE_STORY_FAILURE:
	     return { ...state, isFetching: false, error:true };

    case POST_COMMENT:
       return state;
    case POST_COMMENT_FAILURE:
       return state;
    case POST_COMMENT_OK:
       const items = state.comments.concat(action.data);
       return {...state, posting:false, comments: items };
    default:
      return state;
  }
}

export default story;
