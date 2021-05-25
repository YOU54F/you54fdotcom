import React, { useRef, useState } from "react";
import "../styles/devices.min.css";

import { ReactTerminal } from "react-terminal";
import styled from "styled-components";
import { DeviceFrame } from "../components/DeviceFrame";
import appContent from "../config";
import {
  aboutMe,
  bootloader,
  welcomeMessage,
  safHelp,
} from "./terminalContent";

const { experienceDuration } = appContent;
const StyledTerm = styled.div`
  width: 100%;
`;
export default function Terminal() {
  const [theme, setTheme] = useState<"dark" | "default">("dark");

  const ref = useRef(".index-editor");

  const commands = {
    help: safHelp,

    "saf.about": aboutMe(),

    lilo: bootloader(),

    "saf.experience()": () => {
      return `${experienceDuration} years`;
    },

    "saf.toggle_theme()": () => setTheme(theme === "dark" ? "default" : "dark"),
  };

  return (
    <StyledTerm className="console">
      <link rel="stylesheet" href="devices.min.css" type="text/css" />
      <DeviceFrame
        children={
          <ReactTerminal
            theme={theme && theme === "dark" ? "dracula" : "light"}
            welcomeMessage={welcomeMessage}
            commands={commands}
            showControlButtons={true}
            childRef={ref}
            id="reactTerminal"
          />
        }
      />
    </StyledTerm>
  );
}
