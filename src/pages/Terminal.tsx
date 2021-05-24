import React, { useRef, useState } from "react";
import "../styles/devices.min.css";

import { ReactTerminal } from "react-terminal";
import styled from "styled-components";
import { DeviceFrame } from "../components/DeviceFrame";
import appContent from "../config";

const { experienceDuration, blogUrl } = appContent;
const StyledTerm = styled.div`
  width: 100%;
`;
export default function Terminal() {
  const [theme, setTheme] = useState<"dark" | "default">("dark");

  const ref = useRef(".index-editor");

  const welcomeMessage = (
    <span>
      LILO 2.27 Boot Menu <br />
      ___________________
      <br />
      <br />
      Select an option to continue <br />
      <br />
      {bootloader()} <br />
      <br />
      or type "help" for more information. <br />
      <br />
    </span>
  );

  const commands = {
    help: (
      <span>
        <br />
        <span>Help on module saf:</span>
        <br />
        <br />
        <span>VARIABLES</span>
        <br />
        <span style={{ marginLeft: "20px" }}>
          <strong>saf.about</strong> -- know more about me
        </span>
        <br />
        <br />
        <span>FUNCTIONS</span>
        <br />
        <span style={{ marginLeft: "20px" }}>
          <strong>saf.experience()</strong> -&gt; float
        </span>
        <br />
        <span style={{ marginLeft: "40px" }}>
          returns the total years of working experience
        </span>
        <br />
        <span style={{ marginLeft: "20px" }}>
          <strong>saf.toggle_theme()</strong> -&gt; None
        </span>
        <br />
        <span style={{ marginLeft: "40px" }}>toggle the website's theme</span>
        <br />
      </span>
    ),

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

const bootloader = () => (
  <span>
    {bootItem("macOS", "macos")}
    {bootItem("Ubuntu", "ubuntu")}
    {bootItem("Blog", "blog")}
    {bootItem("Repl Workspace 🚧 - Under construction", "replworkspace")}
    {bootItem("Embedded Repl 🚧 - Under construction", "replembedded")}
  </span>
);

const bootItem = (name: string, link: string) => (
  <span>
    -&gt;{" "}
    <a
      target="_self"
      aria-label={name}
      rel="noopener noreferrer"
      href={`/${link}`}
    >
      {name}
    </a>
    <br />
  </span>
);

export const aboutMe = () => (
  <span>
    <br />
    <span>
      I'm <span className="bold">Yousaf Nabi</span>, a software consultant with
      a passion for testing, tech and all things automotive.
    </span>
    <br />
    <span>
      I've had {experienceDuration} years experience, testing software at scale
      across a multitude of organisations.
    </span>
    <br />
    <br />
    <span>
      Along the way helping some migrate from traditional software development
      methodologies to a leaner Agile based approach.
    </span>
    <br />
    <br />
    <span>
      I now work for a consultancy company, questioning everything, building
      just enough, just in time and helping bring others along in the journey.
    </span>
    <br />
    <br />
    <span>
      Check out my ramblings on my{" "}
      <a target="_blank" href={blogUrl} rel="noopener noreferrer">
        blog
      </a>
      .
    </span>
  </span>
);
