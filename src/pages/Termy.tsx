import React, { useEffect, useRef } from "react";
import get from "lodash/get";
import {
  autoComplete,
  FileSystem,
  Terminal,
  utilities,
  TerminalProps,
  Command,
} from "termy-the-terminal";

import githubImg from "./github.png";
import styled from "styled-components";
import { blogPost, welcomeMessage } from "./terminalContent";
// import { HowDare } from "../operatingSystems/macOS/components/apps/Terminal.jsx";
const { getInternalPath, stripFileExtension } = utilities;
interface BlogPostProps {
  date: string;
  content: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  date,
  content,
}): JSX.Element => (
  <>
    <h3>{date}</h3>
    <p>{content}</p>
  </>
);

export const Termy = () => {
  const terminalContentRef = useRef<Terminal | null>(null);
  // const [content, setContent] = useState({ rmrf: true });
  const initialFileSystem = {
    home: {
      type: "FOLDER",
      children: {
        user: {
          type: "FOLDER",
          children: {
            test: {
              type: "FOLDER",
              children: null,
            },
          },
        },
        videos: {
          type: "FOLDER",
          children: {
            file2: {
              type: "FILE",
              content: "Contents of file 2",
              extension: "txt",
            },
          },
        },
        github: {
          type: "FILE",
          content: githubImg,
          extension: "png",
        },
        file1: {
          type: "FILE",
          content: "Contents of file 1",
          extension: "txt",
        },
        file5: {
          type: "FILE",
          content: "Contents of file 5",
          extension: "txt",
        },
      },
    },
    docs: {
      type: "FOLDER",
      children: null,
    },
    file3: {
      type: "FILE",
      content: "Contents of file 3",
      extension: "txt",
    },
    file4: {
      type: "FILE",
      content: "Contents of file 4",
      extension: "txt",
    },
    blog: {
      type: "FILE",
      content: <BlogPost date="3/22" content="Today is a good day" />,
      extension: "txt",
    },
    welcome: {
      type: "FILE",
      content: welcomeMessage,
      extension: "txt",
    },
    // howDare: {
    //   type: "FILE",
    //   content: (
    //     <>
    //       {content.rmrf && (
    //         <HowDare
    //           setRMRF={(value: boolean) => setContent({ rmrf: value })}
    //         />
    //       )}
    //     </>
    //   ),
    //   extension: "txt",
    // },
    link: {
      type: "FILE",
      content: (
        <>
          <BlogPost date="3/22" content="Today is a gooddd day"></BlogPost>
          <button
            onClick={() => {
              submitCommand(terminalContentRef, "cat welcome.txt");
            }}
          >
            Click to see the welcome message
          </button>
        </>
      ),
      extension: "txt",
    },
  };

  // type TypedFileSystem = typeof initialFileSystem;
  const fileSystem = initialFileSystem as FileSystem;

  useEffect(() => {
    submitCommand(terminalContentRef, "cat welcome.txt");
  }, [terminalContentRef]);

  const terminalCommands: {
    [key: string]: Command;
  } = {
    hello: {
      handler: () => {
        return new Promise((resolve): void => {
          resolve({
            commandResult: "and welcome to this site!",
          });
        });
      },
    },
    length: {
      handler: (fileSystem, currentPath, targetPath) => {
        return new Promise((resolve, reject): void => {
          console.log(currentPath);
          console.log(targetPath);
          if (!targetPath) {
            reject("Invalid target path");
          }
          if (targetPath && currentPath) {
            const pathWithoutExtension = stripFileExtension(targetPath);
            const file = get(
              fileSystem,
              getInternalPath(currentPath, pathWithoutExtension)
            );

            if (!file) {
              reject("Invalid target path");
            }

            if (file?.extension !== "txt") {
              reject("Target is not a .txt file");
            }

            let fileLength = "Unknown length";
            if (typeof file?.content === "string") {
              fileLength = "" + file?.content.length;
            }

            resolve({
              commandResult: fileLength,
            });
          } else {
            reject("An error occurred");
          }
        });
      },
      autoCompleteHandler: autoComplete,
      description: "Calculates the length of a given text file",
    },
    tail: {
      handler: (fileSystem, currentPath, targetPath, options) => {
        return new Promise((resolve, reject): void => {
          if (options === "-r") {
            return resolve({
              commandResult: "echo " + targetPath + "...",
            });
          } else {
            return reject(`Can't remove ${targetPath}. It is a directory.`);
          }
        });
      },
      autoCompleteHandler: autoComplete,
      description: "This command is used for tailing a specific file.",
    },
    blog: {
      handler: (fileSystem, currentPath, targetPath, options) => {
        return new Promise((resolve, reject): void => {
          const blogPostIndex = Array.from(Array(15).keys());
          if (
            !targetPath ||
            !blogPostIndex.some((m) => Number(targetPath) === m)
          ) {
            return reject(`Cannot find blog ${targetPath}. It is a directory.`);
          }
          return resolve({
            commandResult: blogPost(targetPath),
          });
        });
      },
      autoCompleteHandler: autoComplete,
      description: "This command takes a number arg and will show a blog",
    },
  };

  const terminalProps: TerminalProps = {
    fileSystem,
    customCommands: terminalCommands,
  };

  return (
    <StyledTermy id="terminal-container">
      <Terminal
        fileSystem={terminalProps.fileSystem}
        customCommands={terminalProps.customCommands}
        ref={terminalContentRef}
      />
    </StyledTermy>
  );
};

const submitCommand = (
  terminalRef: React.MutableRefObject<Terminal | null>,
  command: string
) => {
  if (!terminalRef.current) return;
  terminalRef.current.state.inputValue = command;
  // @ts-ignore
  terminalRef.current.handleSubmit({
    key: "8", // enter
    preventDefault: () => {},
  });
};

// Hello! You should be able to accept custom argument like I did for the rm command here: https://github.com/ctaylo21/termy-the-terminal/blob/master/src/commands/rm.ts#L53

// an optional options string gets passed to each command defined by this interface:

// export interface CommandHandler {
//   (
//     fileSystem?: FileSystem,
//     currentPath?: string,
//     targetPath?: string,
//     options?: string,
//   ): Promise<CommandResponse>;
// }
// That could definitely be documented better, so I'll make a todo to knock that out. Thanks!

const StyledTermy = styled.div`
  #terminal-wrapper {
    background-color: #1b2b34;
    box-sizing: content-box;
    color: #d8dee9;
    font-family: Inconsolata, monospace;
    font-size: 18px;
    height: 100%;
    overflow: auto;
    padding: 0 1em;
    white-space: pre-wrap;
  }
  #terminal-wrapper #input-container {
    padding: 1em 0;
  }
  #terminal-wrapper #input-container form {
    display: flex;
  }
  #terminal-wrapper #input-container form input {
    background: none;
    border: none;
    color: #d8dee9;
    font-family: Inconsolata, monospace;
    font-size: 18px;
    outline: none;
    -webkit-appearance: none;
    flex-grow: 100;
    margin: 0 10px;
  }
  #terminal-wrapper #input-container form #inputPrompt {
    color: #9ac794;
  }
  #terminal-wrapper #history-container > ul > li > #input-container {
    padding-bottom: 0;
  }
  #terminal-wrapper #history-container img {
    margin-top: 10px;
  }
  #terminal-wrapper #history-container #help-container ul > li {
    margin: 5px 0;
  }
  #terminal-wrapper
    #history-container
    #help-container
    ul
    > li
    > span.help-command-name {
    color: #c594c5;
  }
  #terminal-wrapper #history-container ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list {
    margin: 10px 0 0 10px;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li {
    display: flex;
    align-items: center;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li svg {
    margin-right: 20px;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li.ls-folder {
    color: #f99157;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li.ls-folder svg {
    fill: #f99157;
    height: 24px;
    width: 24px;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li.ls-file {
    color: #5fb3b3;
  }
  #terminal-wrapper #history-container ul.terminal-ls-list li.ls-file svg {
    fill: #5fb3b3;
    margin-top: 2px;
    margin-bottom: 2px;
    height: 20px;
    width: 24px;
  }
  #terminal-wrapper .preview-list span {
    margin: 0px 10px;
  }
  #terminal-wrapper .preview-list span.auto-preview-folder {
    color: #f99157;
  }
  #terminal-wrapper .preview-list span.auto-preview-file {
    color: #5fb3b3;
  }
  #terminal-wrapper .preview-list span.active {
    background-color: #4f5b66;
  }
`;
