import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { BulletedList, NumberedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  CodeMark,
  Highlight,
  Italic,
  Strike,
  Underline,
} from "@yoopta/marks";
import Paragraph from "@yoopta/paragraph";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";

const headingsExtended = {
  options: {
    HTMLAttributes: {
      className: "my-7",
    },
  },
};

const fontExtentended = "text-lg";

export const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Code,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Embed,
  Link,

  Paragraph.extend({ options: { HTMLAttributes: { className: "text-lg" } } }),
  Code.extend({ options: { HTMLAttributes: { className: fontExtentended } } }),
  Blockquote.extend({
    options: { HTMLAttributes: { className: fontExtentended } },
  }),
  Callout.extend({
    options: { HTMLAttributes: { className: fontExtentended } },
  }),
  NumberedList.extend({
    options: { HTMLAttributes: { className: fontExtentended } },
  }),
  BulletedList.extend({
    options: { HTMLAttributes: { className: fontExtentended } },
  }),
  TodoList.extend({
    options: { HTMLAttributes: { className: fontExtentended } },
  }),

  HeadingOne.extend(headingsExtended),
  HeadingTwo.extend(headingsExtended),
  HeadingThree.extend(headingsExtended),
];

export const tools = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

export const marksStyle = [
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
];
