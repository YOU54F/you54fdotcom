import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import styled from "styled-components";

const Highlighter = (dark?: boolean) => {
  return {
    code({
      node,
      inline,
      className,
      children,
      ...props
    }: SyntaxHighlighterProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          wrapLongLines={true}
          {...props}
        />
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };
};

export default function GetBlogPost(props: {
  filePath: string;
  darkMode?: boolean;
}) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(props.filePath)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [props.filePath]);

  return (
    <>
      <StyledReactMarkdown
        children={markdown}
        linkTarget="_blank"
        remarkPlugins={[gfm]}
        components={Highlighter(props.darkMode)}
      />
    </>
  );
}

// styled for new lines
const StyledReactMarkdown = styled(ReactMarkdown)`
  white-space: pre-wrap;
`;
