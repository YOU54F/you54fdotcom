import * as React from "react";
import { isMobile } from "react-device-detect";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { TerminalContext } from "../contexts/TerminalContext";

import exec from "../common/executor";

export const useEditorInput = (
  consoleFocused: boolean,
  editorInput: string,
  setEditorInput: any,
  editorInputAfter: string,
  setEditorInputAfter: any,
  setProcessCurrentLine: any,
  enableInput: boolean //enableInput parameter
) => {
  const { getPreviousCommand, getNextCommand } =
    React.useContext(TerminalContext);

  const handleKeyDownEvent = (event: any) => {
    if (!consoleFocused) {
      return;
    }
    //checks the value of enableInput and returns if its false
    if (!enableInput) {
      return;
    }
    event.preventDefault();

    const eventKey = event.key;

    if (eventKey === "Enter") {
      setEditorInput(editorInput + editorInputAfter);
      setEditorInputAfter("");
      setProcessCurrentLine(true);
      return;
    }

    let nextInput = null;
    let afterInput = editorInputAfter;

    if (eventKey === "Backspace") {
      nextInput = editorInput.slice(0, -1);
    } else if (eventKey === "Delete") {
      nextInput = editorInput;
      afterInput = editorInputAfter.slice(1);
    } else if (eventKey === "ArrowUp") {
      nextInput = getPreviousCommand();
    } else if (eventKey === "ArrowDown") {
      nextInput = editorInput.slice(0, -1);
    } else if (eventKey === "ArrowLeft") {
      nextInput = editorInput.slice(0, -1);
      afterInput = editorInput.slice(-1) + afterInput;
    } else if (eventKey === "ArrowRight") {
      nextInput = editorInput + editorInputAfter.slice(0, 1);
      afterInput = editorInputAfter.slice(1);
    } else if (eventKey === "End") {
      nextInput = editorInput + editorInputAfter;
      afterInput = "";
    } else if (eventKey === "Home") {
      nextInput = "";
      afterInput = editorInput + editorInputAfter;
    } else {
      nextInput =
        eventKey && eventKey.length === 1
          ? editorInput + eventKey
          : editorInput;
    }

    setEditorInput(nextInput);
    setEditorInputAfter(afterInput);
    setProcessCurrentLine(false);
  };

  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  });
};

function extendBufferedContent(
  newText: string,
  bufferedContent: any,
  themeStyles: any,
  style: any,
  prompt: any,
  currentText: any
) {
  return (
    <>
      {bufferedContent}
      <span style={{ color: themeStyles.themePromptColor }}>{prompt}</span>
      <span className={`${style.lineText} ${style.preWhiteSpace}`}>
        {currentText}
      </span>
      {newText ? (
        <span>
          <br />
          {newText &&
            newText.split("\n").map((line: any) => (
              <>
                {line}
                <br />
              </>
            ))}
        </span>
      ) : null}
    </>
  );
}

export const useBufferedContent = (
  processCurrentLine: any,
  setProcessCurrentLine: any,
  prompt: string,
  currentText: any,
  setCurrentText: any,
  commands: any,
  errorMessage: any,
  currentQuestion: any
) => {
  const { bufferedContent, setBufferedContent } =
    React.useContext(TerminalContext);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (!processCurrentLine) {
      return;
    }

    const processCommand = async (text: string) => {
      const [command] = text ? text.trim().split(" ") : [];

      if (command === "clear") {
        setBufferedContent("");
        setCurrentText("");
        setProcessCurrentLine(false);
        return;
      }

      const waiting = (
        <>
          {bufferedContent}
          <span style={{ color: themeStyles.themePromptColor }}>{prompt}</span>
          <span className={`${style.lineText} ${style.preWhiteSpace}`}>
            {currentText}
          </span>
          <br />
        </>
      );
      setBufferedContent(waiting);
      setCurrentText("");

      const output = text
        ? await exec(commands, text, errorMessage, currentQuestion)
        : "";

      console.log(`output: ${output}, type:${typeof output}`);

      const nextBufferedContent = extendBufferedContent(
        output ? output : "",
        bufferedContent,
        themeStyles,
        style,
        prompt,
        currentText
      );

      setBufferedContent(nextBufferedContent);
      setProcessCurrentLine(false);
    };

    processCommand(currentText);
  }, [processCurrentLine]);
};

export const useCurrentLine = (
  caret: boolean, // caret parameter
  consoleFocused: boolean,
  prompt: string,
  commands: any,
  errorMessage: any,
  enableInput: boolean,
  currentQuestion: any //enableInput parameter
) => {
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);
  const { appendCommandToHistory } = React.useContext(TerminalContext);
  const mobileInputRef = React.useRef(null);
  const [editorInput, setEditorInput] = React.useState("");
  const [editorInputAfter, setEditorInputAfter] = React.useState("");
  const [processCurrentLine, setProcessCurrentLine] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) {
      return;
    }

    if (consoleFocused) {
      // @ts-ignore

      mobileInputRef.current.focus();
    }
  }, [consoleFocused]);

  React.useEffect(() => {
    if (!processCurrentLine) {
      return;
    }
    appendCommandToHistory(editorInput);
  }, [processCurrentLine]);

  const mobileInput =
    isMobile && enableInput ? ( //enableInput functionality on mobile
      <div className={style.mobileInput}>
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={editorInput}
          onChange={(event) => setEditorInput(event.target.value)}
          ref={mobileInputRef}
        />
        eh
      </div>
    ) : null;
  const currentLine = !processCurrentLine ? (
    <>
      {mobileInput}
      <span style={{ color: themeStyles.themePromptColor }}>{prompt}</span>
      <div className={style.lineText}>
        <span className={style.preWhiteSpace}>{editorInput}</span>
        {consoleFocused && caret ? ( //if caret isn't true, caret won't be displayed
          <span className={style.caret}>
            <span
              className={style.caretAfter}
              style={{ background: themeStyles.themeColor }}
            />
          </span>
        ) : null}
        <span className={style.preWhiteSpace}>{editorInputAfter}</span>
      </div>
    </>
  ) : (
    <>
      {mobileInput}
      <div className={style.lineText}>
        {consoleFocused && caret ? ( //if caret isn't true, caret won't be displayed
          <span className={style.caret}>
            <span
              className={style.caretAfter}
              style={{ background: themeStyles.themeColor }}
            />
          </span>
        ) : null}
      </div>
    </>
  );

  useEditorInput(
    consoleFocused,
    editorInput,
    setEditorInput,
    editorInputAfter,
    setEditorInputAfter,
    setProcessCurrentLine,
    enableInput //enableInput from useCurrentLine()
  );

  useBufferedContent(
    processCurrentLine,
    setProcessCurrentLine,
    prompt,
    editorInput,
    setEditorInput,
    commands,
    errorMessage,
    currentQuestion
  );

  return currentLine;
};

export const useScrollToBottom = (changesToWatch: any, wrapperRef: any) => {
  React.useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
  }, [changesToWatch]);
};
