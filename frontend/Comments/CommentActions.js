import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import insertTex from '../Editor/TextElements/Latex/insertTeXBlock';

function reply(comment, insertQuoteFn)
{
    insertQuoteFn(comment);
}

const CommentActions = ({loggedIn, comment, insertQuoteFn }) => {

  if(loggedIn){
   return(
   <div>
     <FlatButton
       onClick={() => reply(comment, insertQuoteFn)}
       label="Reply"
       labelPosition="after"
       hoverColor="gainsboro"
       labelStyle={{'color': '#3b5998'}}
       icon={<ReplyIcon color='#3b5998' />}
     />
   </div>
   );
  }
  else
    return null;
}

export default CommentActions;