import React from "react";
import { TerminalContextProvider } from "react-terminal";
import HomeTerminal from "pages/HomeTerminal";

function HomeTerminalWrapper() {
  return (
    <TerminalContextProvider>
      <HomeTerminal />
    </TerminalContextProvider>
  );
}

export default HomeTerminalWrapper;
