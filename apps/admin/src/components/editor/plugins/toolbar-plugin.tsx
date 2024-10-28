import React from "react";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Toggle } from "~/components/ui/toggle";
import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  FontBoldIcon,
  FontItalicIcon,
  ReloadIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";

import BlockTypeDropdown from "../components/block-type-dropdown";
import { blockTypeToBlockName } from "../components/block-types";
import { Highlighter, StrikethroughIcon } from "lucide-react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState<boolean>(false);
  const [isItalic, setIsItalic] = React.useState<boolean>(false);
  const [isUnderline, setIsUnderline] = React.useState<boolean>(false);
  const [isStrikeThrough, setIsStrikeThrough] = React.useState<boolean>(false);
  const [isHighlight, setIsHighlight] = React.useState<boolean>(false);
  const [blockType, setBlockType] =
    React.useState<keyof typeof blockTypeToBlockName>("paragraph");

  const [canUndo, setCanUndo] = React.useState<boolean>(false);
  const [canRedo, setCanRedo] = React.useState<boolean>(false);

  const $updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikeThrough(selection.hasFormat("strikethrough"));
      setIsHighlight(selection.hasFormat("highlight"));

      const anchorNode = selection.anchor.getNode();

      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementDOM = editor.getElementByKey(element.getKey());

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
        }
      }
    }
  }, [editor]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [editor, $updateToolbar]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor]);

  return (
    <div className="w-full z-10 relative">
      <div className="flex space-x-2 justify-center p-1">
        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        >
          {/* reload flip to left */}
          <ReloadIcon className="transform -scale-x-100" />
        </Button>

        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        >
          <ReloadIcon />
        </Button>

        <Separator orientation="vertical" className="h-auto my-1" />

        <BlockTypeDropdown blockType={blockType} />

        <Separator orientation="vertical" className="h-auto my-1" />

        <Toggle
          area-label="Bold"
          size="sm"
          pressed={isBold}
          onPressedChange={(pressed) => {
            console.log(editor.getEditorState().toJSON());
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            setIsBold(pressed);
          }}
        >
          <FontBoldIcon />
        </Toggle>

        <Toggle
          area-label="Italic"
          size="sm"
          pressed={isItalic}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            setIsItalic(pressed);
          }}
        >
          <FontItalicIcon />
        </Toggle>

        <Toggle
          area-label="Underline"
          size="sm"
          pressed={isUnderline}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            setIsUnderline(pressed);
          }}
        >
          <UnderlineIcon />
        </Toggle>
        <Toggle
          area-label="Strikethrough"
          size="sm"
          pressed={isStrikeThrough}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            setIsUnderline(pressed);
          }}
        >
          <StrikethroughIcon className="size-4"/>
        </Toggle>
        <Toggle
          area-label="Strikethrough"
          size="sm"
          pressed={isHighlight}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
            setIsUnderline(pressed);
          }}
        >
          <Highlighter className="size-4"/>
        </Toggle>
      </div>
    </div>
  );
}
