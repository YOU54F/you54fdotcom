import { FitAddon } from "xterm-addon-fit";
const { Terminal } = require("xterm");

const { molokaiTheme } = require("./config");
const vm = require("./vm");

function createTerm() {
  const term = (window.term = new Terminal({ theme: molokaiTheme }));
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(document.getElementById("terminal"));
  fitAddon.fit();
  return term;
}

export function start() {
  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    const term = createTerm();
    vm.boot(term);

    // Whether or not the button is active or disabled (has .inactive class)
    function isInactive(elem) {
      return elem.classList.contains("inactive");
    }

    // Play
    // document.querySelector("#term-play").onclick = function (e) {
    //   e.preventDefault();
    //   if (isInactive(e.target)) return;

    //   vm.resume();
    //   term.focus();
    // };

    // // Pause
    // document.querySelector("#term-pause").onclick = function (e) {
    //   e.preventDefault();
    //   if (isInactive(e.target)) return;

    //   vm.suspend();
    // };
  });
}
