import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

export function OnChangePlugin({ onChange }: { onChange?: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!onChange) return;

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const serializedState = JSON.stringify(editorState);
        onChange(serializedState);
      });
    });
  }, [editor, onChange]);

  return null;
}