import React from "react";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableNode } from "@lexical/table"
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { InitialValuePlugin } from "./plugins/initial-value-plugin";
import { OnChangePlugin } from "./plugins/handle-change-plugin";
import { cn } from "~/lib/utils";

interface EditorProps {
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  defaultValue,
  className,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const config: InitialConfigType = {
    namespace: "lexical-editor",
    theme: {
      text: {
        underline: "underline",
      },
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
      TableNode,
    ],
    onError: (error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div
        className={cn(
          "mx-auto relative flex flex-col border shadow rounded-lg prose dark:prose-invert bg-card transition divide-y",
          isFocused ? "border-ring outline-none ring-2 ring-ring/30 ring-offset-2" : null,
          className,
        )}
      >
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="focus:outline-none w-full px-4 min-h-[500px] overflow-auto relative"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {onChange && <OnChangePlugin onChange={onChange} />}
          <InitialValuePlugin value={defaultValue} />
        </div>
        <ListPlugin />
        <LinkPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;