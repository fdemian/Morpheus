import {sendContentAuth} from '../store/callApiHelpers';

export const COMMENT_CHANGED = 'COMMENT_CHANGED';

export const POST_COMMENT = 'POST_COMMENT';
export const POST_COMMENT_OK = 'POST_COMMENT_OK';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';


export function updateCommentText(text){

   return dispatch =>{
      dispatch({ type:COMMENT_CHANGED, data: text});
   }
}

export function postNewComment(commentContent) {
    return (dispatch, getState) => {

      /*if(!state.toolbar.loggedIn) return dispatch(authenticationRequired());*/

  	  const state = getState();

      //const _content =  JSON.stringify(commentContent);
      const storyId = state.story.id;
  	  const _name = state.session.user.username;
  	  const _avatar = state.session.user.avatar;
      const _content = commentContent;
      const _url = state.session.user.link;
      const _token = state.session.token;

      const endpoint = "stories/" + storyId + "/comments";

  	  //const userId = state.toolbar.user.id;
  	  const jsonData = JSON.stringify({
         name: _name,
         content: _content,
         avatar: _avatar,
         url: _url
      });

      const types = [POST_COMMENT, POST_COMMENT_OK, POST_COMMENT_FAILURE];

      dispatch(sendContentAuth(endpoint, types, jsonData, _token));

    }
}
