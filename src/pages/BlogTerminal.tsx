import React, { Suspense } from "react";
import { ReactTerminal } from "react-terminal";
import { createGlobalStyle } from "styled-components";
import GetBlogPost from "../components/GetBlogPost";

export default function BlogTerminal() {
  const welcomeMessage = (
    <div className="header">
      <span>
        <Suspense fallback={<div>Loading...</div>}>
          <GetBlogPost filePath={"terminalFiles/lib/header.md"} />
        </Suspense>
      </span>
    </div>
  );

  const blogPostRouter = (postUrl: string) => (
    <Suspense fallback={<div>Loading...</div>}>
      <GetBlogPost filePath={postUrl} />
    </Suspense>
  );

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
          return blogPostRouter(
            "terminalFiles/blogs/configuring-cypress-to-work-with-iframes-cross-origin-sites.md"
          );
        case 2:
          return blogPostRouter(
            "terminalFiles/blogs/cross-browser-testing-without-the-browser.md"
          );
        case 3:
          return blogPostRouter(
            "terminalFiles/blogs/cypress-edge-now-available-for-windows.md"
          );
        case 4:
          return blogPostRouter(
            "terminalFiles/blogs/dynamically-generate-data-in-cypress-from-csv-xlsx.md"
          );
        case 5:
          return blogPostRouter(
            "terminalFiles/blogs/jest-pact-a-jest-adaptor-to-help-write-pact-files-with-ease.md"
          );
        case 6:
          return blogPostRouter(
            "terminalFiles/blogs/just-because-youre-paranoid-doesnt-mean-they-arent-after-you.md"
          );
        case 7:
          return blogPostRouter(
            "terminalFiles/blogs/protecting-your-api-development-workflows-with-swagger-openapi-pact-io.md"
          );
        case 8:
          return blogPostRouter(
            "terminalFiles/blogs/securing-the-pact-broker-with-nginx-letsencrypt.md"
          );
        case 9:
          return blogPostRouter(
            "terminalFiles/blogs/slack-reporting-for-cypress-io.md"
          );
        case 10:
          return blogPostRouter("terminalFiles/blogs/the-journey-begins.md");
        case 11:
          return blogPostRouter(
            "terminalFiles/blogs/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked - and-it-works-with-cypress-and-now-you-can-test-it-too/md"
          );
        case 12:
          return blogPostRouter(
            "terminalFiles/blogs/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked - and-it-works-with-cypress.md"
          );
        case 13:
          return blogPostRouter(
            "terminalFiles/blogs/tinkering-with-the-touchbar.md"
          );
        case 14:
          return blogPostRouter(
            "terminalFiles/blogs/2021-05-23-grey-box-testing-talks-parti.md"
          );
        case 15:
          return blogPostRouter(
            "terminalFiles/blogs/2020-01-28-spicy-meatballs-frying-a-swedish-ecu.md"
          );
        default:
          return blogPostRouter("terminalFiles/lib/ls.md");
      }
    },
  };

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
