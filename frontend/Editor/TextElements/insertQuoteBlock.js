import {
  AtomicBlockUtils,
  EditorState,
} from 'draft-js';

let count = 0;

export function insertQuote(editorState) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'TOKEN',
    'IMMUTABLE',
    {content:  '<latex>'},
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    {currentContent: contentStateWithEntity}
  );
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
