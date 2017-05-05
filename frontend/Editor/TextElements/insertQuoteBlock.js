import {
  AtomicBlockUtils,
  EditorState,
} from 'draft-js';

export function insertQuoteBlock(editor, type, value)
 {
   const {editorState} = editor.state;
   const contentState = editorState.getCurrentContent();
   const params = {text: value.text, author: value.author};
   const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', params);
   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

   editor.setState({
     editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'QuoteBlock')
     },
     () => {setTimeout(() => editor.focus(), 0); });
 }