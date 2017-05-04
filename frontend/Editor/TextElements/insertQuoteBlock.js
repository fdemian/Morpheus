import {
  AtomicBlockUtils,
  EditorState,
} from 'draft-js';

export function insertQuote(editorState, quoteText, quoteSource) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('TOKEN','IMMUTABLE',{text: quoteText, source: quoteSource});
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentStateWithEntity}
  );
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}