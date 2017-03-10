import React from 'react';
import Draft from 'draft-js';
import Immutable from 'immutable';
import cssModules from 'react-css-modules';
import Styles from './css/Editor.scss';
import EditorControls from './Controls';

import Spoiler from './TextElements/SpoilerWrapper';
import Media from './TextElements/Media';
import Link from  './TextElements/Link';

const {
 CompositeDecorator,
 ContentState,
 Editor,
 EditorState,
 RichUtils,
 AtomicBlockUtils,
 DefaultDraftBlockRenderMap,
 convertToRaw,
 convertFromRaw
} = Draft;

const {Map} = Immutable;
const blockRenderMap = Immutable.Map({'SPOILER':{ element: Spoiler }});
const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(block) {
	switch (block.getType()) {
	  case 'blockquote':
        return 'Blockquote';
		break;	 
	  case 'code-block':
	    return "Code";
		break;
	  default:
	    return null;
	}
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
     (character) => {
        const entityKey = character.getEntity();
        return (
           entityKey !== null &&
           contentState.getEntity(entityKey).getType() === 'LINK'
        );
     },
     callback
  );
}

function findSpoilerEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
     (character) => {
        const entityKey = character.getEntity();
        return (
           entityKey !== null &&
           contentState.getEntity(entityKey).getType() === 'SPOILER'
        );
     },
     callback
  );
}


class EditorComponent extends React.Component {

 constructor(props) {

   super(props);

   const decorator = new CompositeDecorator([
      {
        strategy: (contentBlock, callback, contentState) => findLinkEntities(contentBlock, callback, contentState),
       component: Link,
      },
      {
        strategy: (contentBlock, callback, contentState) => findSpoilerEntities(contentBlock, callback, contentState),
        component: Spoiler,
      },
   ]);

   const {initialState} = this.props;
   
   let _initalEditorState;
   
   if(initialState == null)
   {
	 _initalEditorState = EditorState.createEmpty(decorator); 
   }
   else
   {
     const _contentState = convertFromRaw(JSON.parse(initialState));
     _initalEditorState = EditorState.createWithContent(_contentState, decorator);
   }

   this.setClearEditorFn = this.props.setClearEditorFn;
   this.state = {editorState: _initalEditorState };
   this.editorStyles = this.props.editorStyles;
   this.focus = () => this.refs.editor.focus();
   this.onStateChange = (rawState) => this.props.onEditorChange(rawState);
   this.onChange = (state) => this._handleChange(state);
   this.handleKeyCommand = (command) => this._handleKeyCommand(command);
   this.toggleBlockType = (type) => this._toggleBlockType(type);
   this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
   this.spoilerBlockRender = (style) => this._spoilerBlockRender(style);
   this.selectionIsCollapsed = () => this._selectionIsCollapsed();
   this.getRawContentJSON = (state) => this._getRawContentJSON(state);
   this.blockIsActive = (block) => this._blockIsActive(block);
   this.inlineIsActive = (style) => this._inlineIsActive(style);
   this.customBlockIsActive = (block) => this._customBlockIsActive(block);
   this.clear = () => this._clear();

   this.setClearEditorFn(this.clear)
 } 
 
 _clear()
 {
   const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
   this.setState({ editorState });
 }

 _blockIsActive(block)
 {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

	return block === blockType;
 }

 _inlineIsActive(style)
 {
    const currentStyle = this.state.editorState.getCurrentInlineStyle();

    if(currentStyle === undefined)
	  return false;

    return currentStyle.has(style);
 }

 _customBlockIsActive(block)
 {
    return false;
 }

 _handleChange(state)
 {
	this.setState({editorState: state});
 	const rawContent = this.getRawContentJSON(state);
	this.onStateChange(rawContent);
 }

 // Get the JSON with the rawContent JS used to generate the editor's content.
 _getRawContentJSON(editorState)
 {
    const contentState = editorState.getCurrentContent();
	const rawContent = convertToRaw(contentState);
	const rawContentJson = JSON.stringify(rawContent);

    return rawContentJson;
 }

 _handleKeyCommand(command)
 {
   const {editorState} = this.state;
   const newState = RichUtils.handleKeyCommand(editorState, command);

   if (newState)
   {
		this.onChange(newState);
		return true;
    }

   return false;
 }

 customRenderFn(contentBlock)
 {
	const type = contentBlock.getType();

	if (type === 'atomic') {
     return {
       component: Media,
       editable: false,
     };
    }

    return null;
 }

 _selectionIsCollapsed()
 {
   const {editorState} = this.state;
   const selection = editorState.getSelection();
   return selection.isCollapsed();
 }

 _toggleBlockType(blockType)
 {
   this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
 }

 _toggleInlineStyle(inlineStyle)
 {
   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState,inlineStyle));
 }

 render() {

  const {editorState} = this.state;

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
	if (contentState.getBlockMap().first().getType() !== 'unstyled') {
	  className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
  <div style={{'height': '100%'}}>
    <EditorControls
	 editorState={editorState}
	 editorStyles={this.editorStyles}
	 onToggleBlock={this.toggleBlockType}
	 onToggleInline={this.toggleInlineStyle}
     selectionCollapsed={this.selectionIsCollapsed}
	 blockIsActive={this.blockIsActive}
     inlineIsActive={this.inlineIsActive}
     customBlockIsActive={this.customBlockIsActive}
     editor={this}
	/>
	<div className={className} onClick={this.focus} styleName="MainEditor">
	   <Editor
		blockStyleFn={getBlockStyle}
		blockRendererFn={this.customRenderFn.bind(this)}
		blockRenderMap={extendedBlockRenderMap}
		editorState={editorState}
		handleKeyCommand={this.handleKeyCommand}
		onChange={this.onChange}
		ref="editor"
		spellCheck={false}
	   />
	</div>
  </div>
  );
 }
}

export default cssModules(EditorComponent, Styles, { allowMultiple: true });
