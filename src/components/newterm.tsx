import React, { Suspense } from "react";
import { ReactTerminal } from "react-terminal";
import { createGlobalStyle } from "styled-components";
import GetBlogPost from "./GetBlogPost";

export default function BlogTerminal() {
  // Welcome Message
  const welcomeMessage = (
    <div className="header">
      <span>
        <Suspense fallback={<div>Loading...</div>}>
          <GetBlogPost filePath={"terminalFiles/lib/header.md"} />
        </Suspense>
      </span>
    </div>
  );

  // Terminal commands
  const commands = {
    help: (
      <Suspense fallback={<div>Loading...</div>}>
        <GetBlogPost filePath={"terminalFiles/lib/help.md"} />
      </Suspense>
    ),
    about: (
      <Suspense fallback={<div>Loading...</div>}>
        <GetBlogPost filePath={"terminalFiles/lib/about.md"} />
      </Suspense>
    ),
    ls: (
      <Suspense fallback={<div>Loading...</div>}>
        <GetBlogPost filePath={"terminalFiles/lib/ls.md"} />
      </Suspense>
    ),
    blog: (arg: string) => {
      switch (Number(arg)) {
        case 1:
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <GetBlogPost
                filePath={
                  "terminalFiles/blogs/configuring-cypress-to-work-with-iframes-cross-origin-sites.md"
                }
              />
            </Suspense>
          );
        case 2:
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <GetBlogPost
                filePath={"terminalFiles/blogs/the-journey-begins.md"}
              />
            </Suspense>
          );
        default:
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <GetBlogPost filePath={"terminalFiles/lib/ls.md"} />
            </Suspense>
          );
      }
    },
  };

  // Terminal
  return (
    <>
      <GlobalStyles />
      <div className="app">
        <ReactTerminal
          welcomeMessage={welcomeMessage}
          commands={commands}
          prompt="❯"
          showControlButtons={true}
          errorMessage="Command not found"
          themes={{
            draculaTheme: {
              themeBGColor: "#282a36",
              themeToolbarColor: "#282a36",
              themeColor: "#f8f8f2",
              themePromptColor: "#ff79c6",
            },
          }}
          theme="draculaTheme"
        />
      </div>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
:root {
  --background: #282a36;
  --focus: #44475a;
  --code: #6272a4;
  --white: #f8f8f2;
  --cyan: #8be9fd;
  --green: #50fa7b;
  --orange: #ffb86c;
  --purple: #bd93f9;
  --pink: #ff79c6;
  --red: #ff5555;
  --yellow: #f1fa8c;
}

  @font-face {
    font-family: "JetBrains Mono";
    src: local("JetBrains Mono"),
      url(./fonts/JetBrainsMono-Regular.ttf) format("truetype");
  }

  html,
  body {
    background-color: var(--background);
    font-family: 'JetBrains Mono' !important;
    color: var(--white);
    margin: 0;
    overflow: hidden;
    height: 100%;
  }
  
  a,
  a:visited {
    color: var(--green) !important;
  }

  a:hover {
    color: var(--orange) !important;
    text-decoration: none;
  }

  p {
    max-width: 90%;
  }

  ul {
    list-style-type: none;
  }

  td,
  th {
    border-bottom: 1px solid #44475a;
    text-align: left;
    padding: 9px 0 1px 5px;
  }

  table {
    table-layout: fixed;
    width: 100%;
    margin: 20px auto;
    font-family: "JetBrains Mono";
  }

  th {
    color: var(--purple);
    font-size: 1.2em;
  }

  td {
    color: var(--white);
  }

  td:hover {
    color: var(--cyan);
  }

  b,
  strong {
    color: var(--pink);
  }

  code {
    color: var(--code);
  }

  blockquote {
    color: var(--yellow);
  }

  i,
  em {
    font-style: normal;
    color: var(--pink);
  }

  .app {
    width: 100%;
    height: 100vh;
    font-family: "JetBrains Mono";
  }

  .header {
    white-space: pre;
    font-family: "JetBrains Mono";
  }

  @media screen and (max-width: 600px) {
    p {
      font-size: 16px;
    }
    table {
      width: 100%;
      font-size: 16px;
    }
    th,
    td {
      text-align: center;
    }
  }
`;
