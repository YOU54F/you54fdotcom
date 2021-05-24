import * as React from "react";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";
import { useCurrentLine, useScrollToBottom } from "../hooks/editor";
import { ConsoleView } from "react-device-detect";

import exec from "../common/executor";

export default function Editor(props: any) {
  const wrapperRef = React.useRef(null);
  const currentQuestion = React.useRef(undefined);
  const lateResponseId = React.useRef(undefined);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { bufferedContent, setBufferedContent } =
    React.useContext(TerminalContext);

  useScrollToBottom(bufferedContent, wrapperRef);

  const {
    enableInput, //get both props
    caret,
    consoleFocused,
    prompt,
    commands,
    welcomeMessage,
    lateResponse,
    errorMessage,
  } = props;

  const newLateResponse =
    lateResponse &&
    lateResponse.id &&
    lateResponse.id !== lateResponseId.current;

  if (newLateResponse) lateResponseId.current = lateResponse.id;

  if (newLateResponse && lateResponse.question)
    currentQuestion.current = lateResponse.question;

  const currentLine = useCurrentLine(
    caret, // useCurrentLine takes both props as parameters
    consoleFocused,
    prompt,
    commands,
    errorMessage,
    enableInput,
    currentQuestion.current //enableInput prop as a parameter
  );

  console.log(
    `lateResponse: ${lateResponse}, id: ${
      lateResponse ? lateResponse.id : "err"
    }, text: ${lateResponse ? lateResponse.text : "err"}`
  );

  if (newLateResponse && lateResponse.text)
    setBufferedContent(
      <>
        {bufferedContent}
        <span>
          {lateResponse.text.split("\n").map((line: string[]) => (
            <>
              {line}
              <br />
            </>
          ))}
          {lateResponse.question ? (
            <span>
              {lateResponse.question.text}
              <ul>
                // @ts-ignore
                {lateResponse.question.answers.map((a: any, i: number) => {
                  return (
                    <li>
                      <input
                        type="radio"
                        key={"ans" + i}
                        id={"ans" + i}
                        name="answer"
                        value={a.instruction}
                        onChange={() =>
                          exec(
                            commands,
                            a.text,
                            errorMessage,
                            lateResponse.question
                          )
                        }
                      />
                      <label htmlFor={"ans" + i}>{a.text}</label>
                    </li>
                  );
                })}
              </ul>
            </span>
          ) : null}
        </span>
      </>
    );

  return (
    <div
      ref={wrapperRef}
      // @ts-ignore
      className={style.editor}
      // @ts-ignore
      style={{ background: themeStyles.themeBGColor }}
    >
      {welcomeMessage}
      <br />
      {bufferedContent}
      {currentLine}
    </div>
  );
}
