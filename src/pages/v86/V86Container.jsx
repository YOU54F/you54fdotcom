import { useV86ScriptContext } from "./V86Provider";
import styled from "styled-components";
import { useEffect } from "react";

export const V86Container = () => {
  const { isReadyXtermScript, isReadyV86Script } = useV86ScriptContext();

  // if (!isReadyUserScript) {
  //   return null;
  // }

  var term;
  var termfit;
  var emulator;
  var V86Starter;

  // Login as root
  const username = "root";
  const welcomecmd =
    'screen -d -m sh -c "sh </dev/console >/dev/console 2>&1;read";TERM="xterm-256color";stty sane;/etc/init.d/S99welcome';

  const getScript = (id) => {
    if (document.querySelector(`script#${id}`) !== null) {
      return document.querySelector(`script#${id}`);
    }
  };

  // useEffect(() => {
  //   console.log("scripts have loaded!");
  //   console.log("xterm script loaded!", isReadyXtermScript);
  //   console.log("v86 script loaded!", isReadyV86Script);
  //   // Show the internal screen if "#debug" is appended to the url
  //   var v86_display = undefined;
  //   const { src } = getScript("xterm-script");
  //   console.log(require(src));

  //   // if (window.location.hash == "#debug") {
  //   //   console.log("debug mode"); // SAF DEBUG
  //   //   document.getElementById("screen").classList.add("visible");
  //   // }

  //   console.log("starting emulator");

  //   // // Initialize the v86 emulator
  //   // emulator = new V86Starter({
  //   //   wasm_path: "v86/v86.wasm",
  //   //   memory_size: 512 * 1024 * 1024,
  //   //   vga_memory_size: 100 * 1024 * 1024,
  //   //   screen_container: document.getElementById("screen"),
  //   //   bios: {
  //   //     url: "v86/images/seabios.bin",
  //   //   },
  //   //   vga_bios: {
  //   //     url: "v86/images/vgabios.bin",
  //   //   },
  //   //   cdrom: {
  //   //     url: "v86/images/os.iso",
  //   //   },
  //   //   autostart: true,
  //   // });
  //   // console.log("emulator started"); // SAF DEBUG
  //   // console.log(emulator); // SAF DEBUG

  //   // // Initialize xterm.js
  //   // term = new Terminal({
  //   //   rendererType: "dom",
  //   // });
  //   // termcontainer = document.getElementById("terminal");
  //   // console.log("termcontainer"); // SAF DEBUG
  //   // console.log(termcontainer); // SAF DEBUG
  //   // term.open(termcontainer);

  //   // // Initialize the xterm-fit addon
  //   // termfit = new FitAddon.FitAddon();
  //   // term.loadAddon(termfit);
  //   // termfit.fit();

  //   // // Write a "Booting WebTerm ..." message
  //   // term.write("\\[1;34mDownloading\\[0m OS images ...\r\n");

  //   // // Forward keystrokes from xterm to v86
  //   // term.onKey((key) => onConsoleInput(key));
  //   // // Forward output from v86 to xterm and other functions
  //   // emulator.add_listener("serial0-output-char", (char) =>
  //   //   onConsoleOutput(char)
  //   // );
  //   // emulator.add_listener("serial0-output-line", (line) => onConsoleLine(line));

  //   // // Wait for the emulator to get ready
  //   // emulator.add_listener("emulator-ready", () => {
  //   //   term.write("Booting \x1B[1;3;31mWebTerm\x1B[0m ...\r\n");
  //   // });
  // }, [isReadyXtermScript, isReadyV86Script]);

  if (!isReadyXtermScript) {
    return null;
  }
  if (!isReadyV86Script) {
    return null;
  }
  return (
    <>
      {
        <StyledV86
          onLoad={() => {
            console.log("scripts have loaded!");
            console.log("xterm script loaded!", isReadyXtermScript);
            console.log("v86 script loaded!", isReadyV86Script);
          }}
        >
          <hr />
          <div id="screen">
            <StyledV86Text />
            <canvas style={{ display: "none" }}></canvas>
          </div>
          <div id="terminal"></div>
        </StyledV86>
      }
    </>
  );
};

const StyledV86Text = styled.div`
white-space: pre;
font: 14px monospace;
line-height: 14px"`;

const StyledV86 = styled.div`
  background-color: #252525;
  overflow: hidden;
  margin: 10px;

  #terminal {
    width: 100%;
    height: 97vh;
  }

  /* Remove the scrollbar from xterm */
  .xterm-viewport {
    overflow-y: hidden !important;
  }

  /* Hide the screen by default */
  #screen {
    display: none;
  }

  #screen.visible {
    display: block;
  }
`;
