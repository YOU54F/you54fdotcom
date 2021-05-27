import React, { useEffect, useRef, useState } from "react";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
// import v86 from "../components/v86/libv86";
import v86 from "v86";

export const XTerminal = () => {
  const xtermRef = useRef<XTerm>(null);
  const fitAddon = new FitAddon();
  useEffect(() => {
    xtermRef.current?.terminal.writeln("Downloading OS images ...\r\n");
  }, []);

  const [emulator, setEmulator] = useState<any>();
  const [previousLine, setPreviousLine] = useState("");
  const [isBooted, setIsBooted] = useState(false);
  useEffect(() => {
    const v86Starter = new v86.V86Starter({
      screen_container: document.getElementById("screen_container"),
      bios: {
        url: "../../bios/seabios.bin",
      },
      vga_bios: {
        url: "../../bios/vgabios.bin",
      },
      cdrom: {
        url: "../../images/linux.iso",
      },
      autostart: true,
    });

    console.log("v86Starter");
    console.log(v86Starter);
    setEmulator(v86Starter);
  }, []);

  const username = "root";

  useEffect(() => {
    // @ts-ignore
    emulator.add_listener("serial0-output-char", (char: string) =>
      onConsoleOutput(char)
    );
    // @ts-ignore
    emulator.add_listener("serial0-output-line", (line: string) =>
      onConsoleLine(line)
    );
  }, [emulator]);

  const onConsoleLine = (line: string) => {
    // Enter username on the login prompt
    if (line.startsWith("Welcome to WebTerm")) {
      // @ts-ignore
      emulator?.serial0_send(username + "\n");
    }
    // Save the line
    setPreviousLine(line);
  };

  const onConsoleOutput = (char: string) => {
    console.log("got some console output");

    // Only write to the xterm if the system is fully booted
    if (isBooted) {
      console.log("v86 is booted");
      const xterm = xtermRef.current?.terminal;
      // @ts-ignore
      xterm?.keyboard_send_text(
        `stty cols ${xterm.cols} rows ${xterm.rows} -F /dev/ttyS0\n`
      );
    }
    // If the char is the shell prompt after the login message start
    // the welcome script and set booted to true
    if (char == "#" && previousLine.includes("buildroot login: " + username)) {
      // @ts-ignore
      emulator?.serial0_send(welcomecmd + "\n");
      setIsBooted(true);
    }
  };

  return (
    <XTerm
      ref={xtermRef}
      addons={[fitAddon]}
      onKey={(event) => {
        console.log("something was pressed");
      }}
    />
  );
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
