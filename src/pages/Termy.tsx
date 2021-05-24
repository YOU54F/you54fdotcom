import React from "react";
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

const exampleFileSystem: FileSystem = {
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
};

const lengthCommand: {
  [key: string]: Command;
} = {
  hello: {
    // Function that handles command execution
    handler: function hello() {
      return new Promise((resolve): void => {
        resolve({
          commandResult: "world",
        });
      });
    },
  },
  length: {
    handler: function length(fileSystem, currentPath, targetPath) {
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
    autoCompleteHandler: autoComplete, // Function that returns results for autocomplete for given command
    description: "Calculates the length of a given text file", // Description that will be show from "help" command
  },
  tail: {
    handler: function tail(fileSystem, currentPath, targetPath, options) {
      return new Promise((resolve, reject): void => {
        if (options === "-r") {
          resolve({
            commandResult: "echo " + targetPath + "...",
          });
        } else {
          reject(`Can't remove ${targetPath}. It is a directory.`);
        }
      });
    },
    autoCompleteHandler: autoComplete, // Function that returns results for autocomplete for given command
    description: "This command is used for tailing a specific file.", // Description that will be show from "help" command
  },
};

const stuff: TerminalProps = {
  fileSystem: exampleFileSystem,
  customCommands: lengthCommand,
};
export const Termy = () => (
  <StyledTermy id="terminal-container">
    <Terminal
      fileSystem={stuff.fileSystem}
      customCommands={stuff.customCommands}
    />
    ,
  </StyledTermy>
);

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
