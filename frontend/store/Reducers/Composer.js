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
  EDITING_STATE_CHANGED
} from '../../StoryComposer/Actions';

const initialState = {
  id:-1,
  title: "",
  content : null,
  category: {id:-1, name:""},
  tags: [],
  posted: false,
  editing: true
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
      return {... state, id: action.data};
   case SEND_STORY_OK:
	    const newTitle = format_title_string(state.title);
      return { ...state, posted: true, id: action.data.id, title: newTitle};
   default:
	    return state;
 }
}

export default composer;
