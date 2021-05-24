import * as React from "react";
import { ReactChildren } from "react";

interface TerminalContextProviderProps {
  children?: any;
  bufferedContent?: any;
  setBufferedContent?: any;
  appendCommandToHistory?: any;
  getPreviousCommand?: any;
  getNextCommand?: any;
}
export const TerminalContext =
  React.createContext<TerminalContextProviderProps>({});
export const TerminalContextProvider = (
  props: TerminalContextProviderProps
) => {
  const { children } = props;
  const [bufferedContent, setBufferedContent] = React.useState("");
  const [commandsHistory, setCommandsHistory] = React.useState<string[]>([]);
  const [historyPointer, setHistoryPointer] =
    React.useState<number | null>(null);

  React.useEffect(() => {
    setHistoryPointer(commandsHistory.length);
  }, [commandsHistory]);

  const appendCommandToHistory = (command: string) => {
    if (!command) {
      return;
    }

    setCommandsHistory(commandsHistory.concat(command));
  };

  const getPreviousCommand = () => {
    if (!historyPointer || historyPointer === 0) {
      if (commandsHistory.length === 0) {
        return "";
      }

      return commandsHistory[0];
    }

    const command = commandsHistory[historyPointer - 1];
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
    }

    return command;
  };

  const getNextCommand = () => {
    if (historyPointer && historyPointer + 1 <= commandsHistory.length) {
      if (historyPointer === commandsHistory.length) {
        return "";
      }
      const command = commandsHistory[historyPointer + 1];
      setHistoryPointer(historyPointer + 1);
      return command;
    }

    return "";
  };

  return (
    <TerminalContext.Provider
      value={{
        bufferedContent,
        setBufferedContent,
        appendCommandToHistory,
        getPreviousCommand,
        getNextCommand,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default {
  TerminalContext,
  TerminalContextProvider,
};
