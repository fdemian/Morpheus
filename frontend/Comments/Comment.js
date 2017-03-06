import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import Renderer from '../Story/DraftRenderer';
import FlatButton from 'material-ui/FlatButton';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote';
import ReplyIcon from 'material-ui/svg-icons/content/reply';

const linkStyle = {'color': 'blue' };

const authorTextStyle = {
 'color': 'blue',
 'marginTop': '13px',
 'marginLeft': '20px',
 'display': 'inline-block',
 'verticalAlign': 'top',
 'fontSize': '20px',
 'display': 'inline-block',
 'marginTop': '7px'
};

const Comment = ({comment, loggedIn}) => {

   const rawContent = JSON.parse(comment.content);

   let CommentActions;

   if(loggedIn)
   {
       CommentActions =  (
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
      CommentActions = <div></div>;

   return(
   <div>

    <div>
	  <Avatar src={"/static/avatars/" + comment.avatar} size={40} />
	  <span style={authorTextStyle}>
         {comment.author}
	   </span>
	</div>

    <div>
	  <Renderer raw={rawContent} />
    </div>

    {CommentActions}
	 
   </div>
   );
}

export default Comment;
