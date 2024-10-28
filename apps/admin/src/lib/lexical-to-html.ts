import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

export const lexicalJsonToHtml = (jsonString: string): string => {
  // Create a temporary editor instance
  const editor = createEditor({
    namespace: 'html-converter',
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
    ],
  });

  try {
    // Parse the JSON string into a state object
    const parsedState = JSON.parse(jsonString);

    // Set the editor state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    editor.setEditorState(editor.parseEditorState(parsedState));

    let htmlOutput = '';
    editor.update(() => {
      htmlOutput = $generateHtmlFromNodes(editor);
    });

    return htmlOutput;
  } catch (error) {
    console.error('Error converting Lexical JSON to HTML:', error);
    return '';
  }
};