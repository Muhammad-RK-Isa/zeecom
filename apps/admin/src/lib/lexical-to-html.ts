import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

export const lexicalJsonToHtml = (jsonString: string): string => {
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
    editor.setEditorState(editor.parseEditorState(jsonString));

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
