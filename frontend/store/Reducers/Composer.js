import format_title_string from '../../utils/formats.js';

import
{
  SEND_STORY,
  SEND_STORY_OK,
  SEND_STORY_FAILURE,
  TITLE_CHANGED,
  CONTENT_CHANGED,
  CATEGORY_CHANGED,
  ID_CHANGED,
  EDITING_STATE_CHANGED,
  POSTED_STATE_CHANGED,
  UPDATE_STORY,
  UPDATE_STORY_OK,
  UPDATE_STORY_FAILURE
} from '../../StoryComposer/Actions';

const initialState = {
  id:-1,
  title: "",
  content : null,
  category: {id:-1, name:""},
  tags: [],
  posted: false,
  editing: false,
  posting: false
}

export function composer(state = initialState, action) {
 switch (action.type) {
   case TITLE_CHANGED:
      return { ...state, title: action.data };
   case CONTENT_CHANGED:
      return { ...state, content: action.data };
   case CATEGORY_CHANGED:
      return {... state, category: action.data};
   case ID_CHANGED:
      return {...state, id: action.data};
   case EDITING_STATE_CHANGED:
      return {...state, editing: action.data};
   case POSTED_STATE_CHANGED:
      return {...state, posted: action.data};
   case SEND_STORY_OK:
	  const newTitle = format_title_string(state.title);
      return { ...state, posted: true, id: action.data.id, title: newTitle};	  
   case UPDATE_STORY:
      return { ...state, posting: true, editing: true, posted: false};
   case UPDATE_STORY_OK:	  
      return { ...state, posting: false, editing: false, posted: true};
   case UPDATE_STORY_FAILURE:
      return { ...state, posted: false};

   default:
	    return state;
 }
}

export default composer;
