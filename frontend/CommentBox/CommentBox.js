import React from 'react';
import cssModules from 'react-css-modules';
import Styles from './CommentBox.scss';

// Editor
import Editor from '../Editor/Editor';
import EditorStyles from '../Editor/EditorStyles';

import MessageIcon from 'material-ui/svg-icons/communication/chat-bubble-outline';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../Fetching/FetchingIndicator';

class CommentBox extends React.Component {

 constructor(props)
 {
    super(props);

	console.log(this.props);
	console.log("==============");

    this.postCommentFn = this.props.postComment;
    this.updateQuoteFunction = this.props.updateQuoteFunction;
    this.onInputChange = this.onInputChange.bind(this);
    this.postComment = this.postComment.bind(this);
	this.postingComment = this.props.posting;
	this.updateCommentText = this.props.updateCommentText;
	this.clearEditor = null;
	this.insertElement = null;
	this.setClearFn = this.setClearFn.bind(this);
	this.setInsertFn = this.setInsertFn.bind(this);
 }

 onInputChange(draftText)
 {
    this.updateCommentText(draftText);
 }

 setClearFn(clearFn)
 {
   this.clearEditor = clearFn;
 }

 setInsertFn(insertFn)
 {
    this.updateQuoteFunction(insertFn);
 }

 postComment()
 {
   if(this.props.commentText == "")
      return;

   const commentContent = this.props.commentText;
   this.postCommentFn(commentContent);

   if(this.clearEditor != null)
      this.clearEditor();
 }

 render() {

   if(this.postingComment)
	  return (<Loading />);

   const initialState = null; // this.props.commentText ? Por ahora null, se inicia sin texto.

   return(
   <div id="new-comment" style={{'marginTop': '40px'}}>

     <hr />

	 <div styleName="EditorContainer">
	    <Editor
	        onEditorChange={this.onInputChange}
            setClearEditorFn={this.setClearFn}
            setInsertFn={this.setInsertFn}
            initialState={initialState}
            editorStyles={EditorStyles}
	    />
	 </div>

	 <div styleName="CommentButton">
	    <FlatButton
         label="Comment"
         labelPosition="before"
	     hoverColor="gainsboro"
	     labelStyle={{'color': '#3b5998'}}
         icon={<MessageIcon color='#3b5998' />}
	     onClick={this.postComment}
	    />
	 </div>

   </div>
   );
 }

}

export default cssModules(CommentBox, Styles, { allowMultiple: true });
