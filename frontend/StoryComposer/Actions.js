import {sendContentAuth} from '../store/callApiHelpers';

export const SEND_STORY = 'SEND_STORY';
export const SEND_STORY_OK = 'SEND_STORY_OK';
export const SEND_STORY_FAILURE = 'SEND_STORY_FAILURE';

export const TITLE_CHANGED = 'TITLE_CHANGED';
export const CONTENT_CHANGED = 'CONTENT_CHANGED';
export const CATEGORY_CHANGED = 'CATEGORY_CHANGED';

export function updateContent(newContent)
{
  return { type:CONTENT_CHANGED, data: newContent};
}

export function updateTitle(newTitle)
{
  return { type:TITLE_CHANGED, data: newTitle};
}

export function updateCategory(newCategory)
{
  return { type:CATEGORY_CHANGED, data: newCategory};
}

export default function postNewStory()
{
    return (dispatch, getState) => {

  	  const state = getState();
      
  	  /*if(!state.toolbar.loggedIn) return dispatch(authenticationRequired());*/

  	  const _user = state.session.user.id;
  	  const _title = state.composer.title;
  	  const _tags = state.composer.tags;
      const _category = state.composer.category.id;
  	  const _content = JSON.stringify(state.composer.content);
      const _token = state.session.token;
      const endpoint = "stories";

  	  //const userId = state.toolbar.user.id;
  	  const jsonData = JSON.stringify({
         title: _title,
         tags: _tags,
         content: _content,
         author: _user,
         category: _category
      });

      const types = [SEND_STORY, SEND_STORY_OK, SEND_STORY_FAILURE];

      dispatch(sendContentAuth(endpoint, types, jsonData, _token));
    }
}
