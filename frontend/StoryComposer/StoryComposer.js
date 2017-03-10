import React, { Component } from 'react';
import {withRouter} from 'react-router';
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

 contextTypes: {
    router: React.PropTypes.func
 }

 constructor(props) {
   super(props)
   this.onDiscardClick = this.onDiscardClick.bind(this);
   this.clearEditor = null;
   this.setClearFn = this.setClearFn.bind(this);
   this.postStory = this.postStory.bind(this);
 }
 
 onDiscardClick(){
   const { router, clearFn, editing } = this.props;

   if(editing)
      clearFn();

   router.goBack();
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
 
 render() {

   const { router } = this.props;
   const {onEditorChange, onTitleChange, onCategoryChange} = this.props;
   const {title, content, category, tags, id, posted, editing, categories} = this.props;
   const {clearFn} = this.props;
   const _initialComposerState = (content == null ? null : JSON.parse(content));
   
   if(posted)
   {
       clearFn();
	   router.replace('/stories/' + id + '/' + title);
   }

   return (
   <div className="Story">
	 
     <div styleName="TitleInput">
        <TextField hintText="Title" value={title} onChange={onTitleChange} fullWidth={true} />
     </div>

	 <div styleName="CategoryInput">
        <CategoriesDropdown categories={categories} onChange={onCategoryChange} />
     </div>
     
     <div styleName="StoryContent">
       <StoryEditor
           onEditorChange={onEditorChange}
           setClearEditorFn={this.setClearFn}
           initialState={_initialComposerState}
           editorStyles={EditorStyles}
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
          onClick={this.onDiscardClick}
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

const composerComponent = cssModules(StoryComposer, Styles, { allowMultiple: true });
export default withRouter(composerComponent, { withRef: true });
