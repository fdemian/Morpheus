import React, { Component } from 'react';
import CategoriesDropdown from './CategoriesDropdown';

// Editor and styles
import StoryEditor from '../Editor/Editor';
import EditorStyles from '../Editor/EditorStyles';

// Material UI components
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Confirm from 'material-ui/svg-icons/action/done';
import Cancel from 'material-ui/svg-icons/content/clear';
import cssModules from 'react-css-modules';
import Styles from './Styles.scss';

class StoryComposer extends Component {

 constructor(props) {
   super(props)
      
   // Class functions.
   this.onDiscardClick = this.onDiscardClick.bind(this);
   this.clearEditor = null;
   this.setClearFn = this.setClearFn.bind(this);
   this.postStory = this.postStory.bind(this);
   this.clearStateAndRedirect = this.clearStateAndRedirect.bind(this);

   // Inherited functions
   this.clearFn = this.props.clearFn;
   this.onEditorChange = this.props.onEditorChange;
   this.onTitleChange = this.props.onTitleChange;
   this.onCategoryChange = this.props.onCategoryChange;
   this.onTagsChange = this.props.onTagsChange;
 }
 
 componentDidUpdate()
 {
   const {posted} = this.props;

   if(posted)
   {
     this.clearStateAndRedirect();
   }
 }
 
 onDiscardClick(){
   const { history, clearFn, editing } = this.props;

   if(editing)
      clearFn();

   history.goBack();
 }

 setClearFn(clearFunction){
   this.clearEditor = clearFunction;
 }
 
 postStory(isEditing)
 {
   if(!isEditing)
   {
     this.props.onSendClick();
   }
   else
   {
     this.props.onUpdateClick();   
   }
 }

 clearStateAndRedirect()
 {
   const { history, id, title } = this.props;

   this.clearFn();
   history.push('/stories/' + id + '/' + title);
 }
  
 render() {

   const {title, content, category, tags, id, editing, categories} = this.props;
   const _initialComposerState = (content == null ? null : JSON.parse(content));
   
   return (
   <div className="Story">
	 
     <div styleName="TitleInput">
        <TextField hintText="Title" value={title} onChange={(e) => this.onTitleChange(e)} fullWidth={true} />		
     </div>

	 <div styleName="CategoryInput">
        <CategoriesDropdown categories={categories} onChange={(c) => this.onCategoryChange(c)} />
     </div>
     
     <div styleName="StoryContent">
       <StoryEditor
           onEditorChange={this.onEditorChange}
           setClearEditorFn={this.setClearFn}
           setInsertFn={function(){}}
           initialState={_initialComposerState}
           editorStyles={EditorStyles}
       />
     </div>

     <div styleName="StoryTags">
        <TextField
            hintText="Tags"
            floatingLabelText="Comma separated values."
            value={tags}
            onChange={(e) => this.onTagsChange(e)}
            fullWidth={true}
        />
     </div>
     
     <div styleName="StoryControls">
	 	 <FlatButton
          label="Discard"
          labelPosition="before"
		  backgroundColor="#e62117"
		  labelStyle={{'color':'black'}}
		  hoverColor="red"
		  icon={<Cancel />}
          onClick={() => this.onDiscardClick}
		 />
	 	 <FlatButton
          label="Send"
          labelPosition="before"
		  hoverColor="blue"
		  backgroundColor="#3b5998"
		  labelStyle={{'color':'black'}}
		  icon={<Confirm />}
          onClick={() => this.postStory(editing)}
		 />		 
     </div>	 
	 
   </div>
   );
 }

}

export default cssModules(StoryComposer, Styles, { allowMultiple: true });