import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

export function InitialValuePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!value) return;

    try {
      const parsedState = JSON.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      editor.setEditorState(editor.parseEditorState(parsedState));
    } catch (error) {
      console.error('Failed to parse initial value:', error);
      editor.update(() => {
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(value));
        root.clear();
        root.append(paragraph);
      });
    }
  }, [editor, value]);

  return null;
}