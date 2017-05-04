import Draft from 'draft-js';
import Spoiler from './TextElements/SpoilerWrapper';
import Media from './TextElements/Media';
import Link from  './TextElements/Link';
import TeXBlock from './TextElements/Latex/TeXBlock';
import {insertTeXBlock} from './TextElements/Latex/insertTeXBlock';

/* ----------------------- Icons  -------------------------------- */

import Quote from 'material-ui/svg-icons/editor/format-quote';
import Heading from 'material-ui/svg-icons/editor/title';
import UnorderedList from 'material-ui/svg-icons/editor/format-list-bulleted';
import OrderedList from 'material-ui/svg-icons/editor/format-list-numbered';
import Code from 'material-ui/svg-icons/action/code';

import Bold from 'material-ui/svg-icons/editor/format-bold';
import Italic from 'material-ui/svg-icons/editor/format-italic';
import Underline from 'material-ui/svg-icons/editor/format-underlined';
import Strikethrough from 'material-ui/svg-icons/editor/strikethrough-s';

import LinkInsert from 'material-ui/svg-icons/editor/insert-link';
import LinkRemove from 'material-ui/svg-icons/content/link';
//import Color from 'material-ui/svg-icons/editor/format-color-text';
//import BGColor from 'material-ui/svg-icons/editor/strikethrough-s';
import Image from 'material-ui/svg-icons/editor/insert-photo';
import SpoilerIcon from 'material-ui/svg-icons/action/visibility';
import Video from 'material-ui/svg-icons/av/movie';
import TexIcon from 'material-ui/svg-icons/social/share';

import {Map} from 'immutable';

/*---------------------------------------------------------------------*/

const {
 Editor,
 EditorState,
 RichUtils,
 AtomicBlockUtils,
 DefaultDraftBlockRenderMap
} = Draft;

const BLOCK_TYPES =
[
  {label: 'Quote', style: 'blockquote', icon: Quote},
  {label: 'Heading', style: 'header-two', icon: Heading},
  {label: 'Unordered List', style: 'unordered-list-item', icon: UnorderedList},
  {label: 'Ordered List', style: 'ordered-list-item', icon: OrderedList},
  {label: 'Code Block', style: 'code-block', icon: Code}
];

const INLINE_STYLES =
[
  {label: 'Bold', style: 'BOLD', icon: Bold},
  {label: 'Italic', style: 'ITALIC', icon: Italic},
  {label: 'Underline', style: 'UNDERLINE', icon: Underline},
  {label: 'Strikethrough', style: 'STRIKETHROUGH', icon: Strikethrough}
];

const CUSTOM_STYLES =
[
  /*{label: 'Quote', style: 'blockquote', toggleFn: insertQuote, requiresInput: false, requiresSelection: false, icon: Quote},*/
  {label: 'Link', style: 'Link', toggleFn: insertLink, requiresInput: true, requiresSelection: true, icon: LinkInsert},
  {label: 'LinkRemove', style: 'LinkRemove', toggleFn: removeLink, requiresInput: false, requiresSelection: false, icon: LinkRemove},
  {label: 'Image', style: 'Image', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: Image},
  {label: 'Spoiler', style: 'Spoiler', toggleFn: insertSpoiler, requiresInput: false, requiresSelection: true, icon: SpoilerIcon},
  {label: 'Video', style: 'Video', toggleFn: insertMedia, requiresInput: true, requiresSelection: false, icon: Video},
  {label: 'Latex', style: 'Latex', toggleFn: insertLaTexBlock, requiresInput: false, requiresSelection: false, icon: TexIcon}
];

/* ------------------------------------------------------------------------------------------------------ */

// TODO: todo esta implementado como toggleLink, editor state debería llegar por parámetro?
function insertEntity(editor, editorState, newContentState)
{
   const entityKey = newContentState.getLastCreatedEntityKey();
   const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
   editor.setState({
	   editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
   },() => {setTimeout(() => editor.refs.editor.focus(), 0); });
}

export function insertMedia(editor, type, value)
 {
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();
   const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {src: value});
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   editor.setState({
     editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'media')
   }, () => {setTimeout(() => editor.focus(), 0); });
 }
 
 export function insertLink(editor, type, value)
 {  
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();   
   const contentStateWithEntity = contentState.createEntity('LINK','MUTABLE', {url: value}); 
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
   const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity });
   const newStateSelection = newEditorState.getSelection();
     
   editor.setState({
     editorState: RichUtils.toggleLink(newEditorState, newStateSelection, entityKey)      
   }, 
   () => {	
       setTimeout(() => editor.focus(), 0);
   });	 
 }

 export function removeLink(editor)
 {
    const {editorState} = editor.state;
    const selection = editorState.getSelection();

    if(!selection.isCollapsed()) {
       editor.setState({
         editorState: RichUtils.toggleLink(editorState, selection, null)
       });
    }
 }

 export function insertSpoiler(editor)
 {
   const {editorState} = editor.state;
   const selection = editorState.getSelection();
   const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
   const selectionState = editorState.getSelection();
   const start = selectionState.getStartOffset();
   const end = selectionState.getEndOffset();
   const selectedText = contentBlock.getText().slice(start, end);
   const contentState = editorState.getCurrentContent();

   const contentStateWithEntity = contentState.createEntity('SPOILER', 'IMMUTABLE', {text: selectedText});
   insertEntity(editor, editorState, contentStateWithEntity);
 }

/*
function insertQuote(editor,editorState, newContentState)

 const {editorState} = editor.state;
   const selection = editorState.getSelection();
   const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
   const selectionState = editorState.getSelection();
   const start = selectionState.getStartOffset();
   const end = selectionState.getEndOffset();
   const selectedText = contentBlock.getText().slice(start, end);
   const contentState = editorState.getCurrentContent();
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
}*/

 export function insertLaTexBlock(editor){
      
   editor.setState({
     liveTeXEdits: Map(),
     editorState: insertTeXBlock(editor.state.editorState),
   });
 }

 const EditorStyles = { BLOCK_TYPES, INLINE_STYLES, CUSTOM_STYLES };

 export default EditorStyles;