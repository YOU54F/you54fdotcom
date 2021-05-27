import React, { useEffect, useRef, useState } from "react";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import v86 from "v86";

export const XTerminal = () => {
  const xtermRef = useRef<XTerm>(null);
  const fitAddon = new FitAddon();
  useEffect(() => {
    xtermRef.current?.terminal.writeln("Downloading OS images ...\r\n");
  }, []);

  return <XTerm ref={xtermRef} addons={[fitAddon]} />;
};

// var emulator;
// var booted = false;
// var debugcnt = 0;
// var debugword = "+++debug+++";
// const username = "root";
// const welcomecmd =
//   'screen -d -m sh -c "sh </dev/console >/dev/console 2>&1;read";TERM="xterm-256color";stty sane;/etc/init.d/S99welcome';

// function onConsoleInput(key: { key: string; domEvent: KeyboardEvent }) {
//   // Paste (Strg+Alt+V)
//   if (
//     key.domEvent.key == "v" &&
//     key.domEvent.altKey &&
//     key.domEvent.ctrlKey
//   ) {
//     debug("paste");
//     navigator.clipboard.readText().then((text) => {
//       emulator.serial0_send(text);
//     });
//     return;
//   }

//   // Copy (Strg+Alt+C)
//   if (
//     key.domEvent.key == "c" &&
//     key.domEvent.altKey &&
//     key.domEvent.ctrlKey
//   ) {
//     debug("copy");
//     document.execCommand("copy");
//     return;
//   }

//   // Send keys from xterm to v86
//   emulator.serial0_send(key.key);

//   // Listen for the debug key combination
//   if (key.key == debugword[debugcnt]) {
//     debugcnt++;
//   } else {
//     debugcnt = 0;
//   }
//   if (debugcnt == debugword.length) {
//     document.getElementById("screen").classList.toggle("visible");
//   }
//   debug("debugcnt " + debugcnt);
// }

// function debug(text: string) {
//   console.debug("DEBUG: " + text);
// }
