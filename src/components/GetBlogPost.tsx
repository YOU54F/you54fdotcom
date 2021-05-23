import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function GetBlogPost(props: { filePath: string }) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(props.filePath)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [props.filePath]);

  return (
    <>
      <ReactMarkdown children={markdown} />
    </>
  );
}
