import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
// const terminal = require("./terminal");
// import * as terminal from "./terminal";
import * as vm from "./vm";
// import React, { useEffect, useRef, useState } from "react";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
// import v86 from "v86";
const fitAddon = new FitAddon();

const StyledContainer = styled.div`
  white-space: pre;
  font: 14px monospace;
  line-height: 14px;
`;

export const BrowserShell = () => {
  const xtermRef = useRef<XTerm>(null);
  const [isVmLoaded, setHasLoadedVm] = useState(false);

  // useEffect(() => {
  //   // terminal.start();
  //   if (xtermRef.current && xtermRef.current.terminal) {
  //     setHasLoadedTerminal(xtermRef.current.terminal);
  //   }
  // }, []);

  useEffect(() => {
    xtermRef.current?.terminal.writeln("Downloading OS images ...\r\n");
    fitAddon.fit();
  }, []);

  useEffect(() => {
    if (xtermRef.current && xtermRef.current.terminal) {
      vm.boot(xtermRef.current.terminal);
      setHasLoadedVm(true);
    }
  }, [isVmLoaded]);

  return (
    <>
      <BrowserShellGlobalStyle />
      <header>
        <h1>Browser Shell</h1>
        <p className="readable">
          <strong>tl;dr</strong> a Linux VM mounting a JS filesystem with a
          Service Worker web server.
        </p>
      </header>

      <main className="readable">
        <h2>Overview</h2>
        {/* <!-- xterm --> */}
        <XTerm ref={xtermRef} addons={[fitAddon]}>
          <div className="app-window">
            <div className="title-bar">
              <i
                id="term-play"
                title="Start"
                className="material-icons md-48 inactive"
              >
                play_circle_outline
              </i>
              <i
                id="term-pause"
                title="Stop"
                className="material-icons md-48 inactive"
              >
                pause_circle_outline
              </i>
            </div>
            <div id="terminal"></div>
          </div>
        </XTerm>
        {/* <!-- XXX: if you want the v86 console for some reason --> */}
        <div id="screen_container" hidden>
          <StyledContainer />
          <canvas></canvas>
        </div>
        {/* <!-- XXX: button assumed in libv86.js crashes without this --> */}
        <button id="start_emulation" hidden>
          Start Emulation
        </button>
      </main>
      {/* <script src="./index.js"></script> */}
    </>
  );
};

const BrowserShellGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Cardo:400,700|Oswald|Material+Icons');

* {
  box-sizing: border-box;
}


  margin: 0;
  padding: 0;
  color: #252525;
  font-family: 'Cardo', serif;

header {
  background-color: #252525;
  width: auto;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}

header h1 {
  color: #f59a08;
  font-size: 4em;
  margin: 0;
  padding-top: 1em;
}

header p {
  color: lightgray;
}

.readable {
  max-width: 960px;
  padding: 2rem;
  font-size: 1.3em;
  line-height: 1.75;
  margin: auto;
}

.full-width-img {
  width: 100%;
}

main a {
  color: #0863f5;
  text-decoration: none;
}

main a:hover {
  color: #0863f5;
  text-decoration: underline;
}

main a:visited {
  color: #9a08f5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
}

#terminal {
  padding: 5px;
  background-color: rgb(27, 29, 30);
}

#nohost-server {
  width: 100%;
  height: 408px;
}

.app-window {
  line-height: 1;
  display: grid;
  grid-template-columns: 100%;
}

.title-bar {
  font-size: 1.3em;
  background-color: lightgray;
  border: 1px solid darkgray;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.title-bar i {
  margin-right: 5px;
  cursor: pointer;
}

.inactive {
  color: rgba(0, 0, 0, 0.26);
}

.glenda {
  float: right;
  border: 0;
}

#drag-drop {
  height: 250px;
  border: dashed 2px #AEAEAE;
  border-top: 0;
  color: #969696;
  position: relative;
}

#drag-drop.drag {
  border: dashed 2px #5EBF7C;
  border-top: 0;
  background-color:rgba(94,191,124,0.1)
 }

#drag-drop h3 {
  position: absolute;
  padding-top: 60px;
  top: 35px;
  text-align: center;
  width: 100%;
  background-image: url(upload-cloud.svg);
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: 70px;
}
`;
