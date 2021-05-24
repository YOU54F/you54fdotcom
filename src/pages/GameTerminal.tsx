import React, { useState, useRef } from "react";

import {
  ReactTerminal,
  TerminalContextProvider,
} from "../apps/react-terminal/src/index";
import "./index.css";
import { v4 as uuidV4 } from "uuid";
import styled from "styled-components";

const GameTerminal = () => {
  const [, setRefreshToggle] = useState("");

  const lateContent = useRef({ id: undefined, text: null });

  function setLateContent(content: any) {
    if (content.text === "ask question") addQuestionToContent(content);
    lateContent.current = content;
    setRefreshToggle(uuidV4());
  }

  function addQuestionToContent(content: any) {
    const question = {
      text: "Do you want to answer this question?",
      answers: [
        { text: "No", instruction: "You answered negatively :(" },
        { text: "Yes", instruction: "You answered positively :)" },
      ],
    };
    content.question = question;
  }

  function lateReply(text: string) {
    setTimeout(() => {
      setLateContent({ id: uuidV4(), text: text });
    }, 1000);
  }

  return (
    <>
      <StyledDiv>
        <TerminalContextProvider>
          <ReactTerminal
            theme="dark"
            showControlButtons={false}
            prompt="->"
            welcomeMessage="Game Terminal"
            lateResponse={lateContent.current}
            errorMessage="Unknown command, use '?' to evaluate expressions."
            commands={{
              __eval: (expr: string) => {
                lateReply(expr);
                return "You typed: " + expr;
              },
            }}
          ></ReactTerminal>
        </TerminalContextProvider>
      </StyledDiv>
    </>
  );
};

export default GameTerminal;

const StyledDiv = styled.div`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
