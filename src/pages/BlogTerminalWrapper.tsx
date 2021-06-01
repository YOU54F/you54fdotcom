import React from "react";
import { TerminalContextProvider } from "react-terminal";
import BlogTerminal from "pages/BlogTerminal";

function BlogTerminalWrapper() {
  return (
    <TerminalContextProvider>
      <BlogTerminal />
    </TerminalContextProvider>
  );
}

export default BlogTerminalWrapper;
