import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import ReplyIcon from 'material-ui/svg-icons/content/reply';

const CommentActions = ({loggedIn}) => {

  if(loggedIn){
   return(
   <div>

     <FlatButton
       label="Quote"
       labelPosition="after"
       hoverColor="gainsboro"
       labelStyle={{'color': '#3b5998'}}
       icon={<QuoteIcon color='#3b5998' />}
       style={{'marginLeft': '60%'}}
      />

     <FlatButton
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