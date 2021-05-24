import * as React from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";

export default function Terminal(props: TerminalProps) {
  const wrapperRef = React.useRef(null);
  const [consoleFocused, setConsoleFocused] = React.useState(!isMobile);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);

  useClickOutsideEvent(wrapperRef, consoleFocused, setConsoleFocused);

  // Get all props destructively
  const {
    caret, //caret prop
    theme,
    showControlButtons,
    controlButtonLabels,
    prompt,
    commands,
    welcomeMessage,
    lateResponse,
    errorMessage,
    enableInput, //enableInput prop
  } = props;

  console.log("term redraw");

  return (
    <div
      ref={wrapperRef}
      // @ts-ignore
      id={"terminalContainer"}
      // id={style.terminalContainer}
      // @ts-ignore
      className={style[`theme--${theme}`]}
    >
      <div
        // @ts-ignore
        className={"terminal"}
        // className={`${style.terminal}`}
        style={{
          // @ts-ignore
          background: themeStyles.themeToolbarColor,
          // @ts-ignore
          color: themeStyles.themeColor,
        }}
      >
        <Controls
          consoleFocused={consoleFocused}
          showControlButtons={showControlButtons}
          controlButtonLabels={controlButtonLabels}
        />
        <Editor
          caret={caret} // caret prop
          consoleFocused={consoleFocused}
          prompt={prompt}
          commands={commands}
          welcomeMessage={welcomeMessage}
          lateResponse={lateResponse}
          errorMessage={errorMessage}
          enableInput={enableInput} //enableInput prop
        />
      </div>
    </div>
  );
}

interface TerminalProps {
  enableInput: boolean; //added both props with their types
  caret: boolean;
  theme: string;
  showControlButtons: boolean;
  controlButtonLabels: string[];
  prompt: string;
  commands: string | (() => void) | Node;
  welcomeMessage: string | (() => void) | Node;
  errorMessage: string;
  lateResponse: any;
}
Terminal.defaultProps = {
  enableInput: true, //Input and caret are enabled by default
  caret: true,
  theme: "light",
  showControlButtons: true,
  controlButtonLabels: ["close", "minimize", "maximize"],
  prompt: ">>>",
  commands: {},
  welcomeMessage: "",
  errorMessage: "not found!",
};
