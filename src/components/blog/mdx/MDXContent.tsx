"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CallOut } from "../components/CallOut";
import { CodeBlock } from "../components/CodeBlock";
import { TabbedContent } from "../components/TabbedContent";
import { Highlight } from "../components/Highlight";
import ExternalLink from "../components/ExternalLink";

const components = {
  CallOut,
  CodeBlock,
  TabbedContent,
  Highlight,
  ExternalLink,
};
export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
