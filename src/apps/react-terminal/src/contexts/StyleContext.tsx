import * as React from "react";
import styled from "styled-components";
// import * as style from "../index.scss";

// export const styles = style.default;

const styles = `
.controls {
  text-align: left;
  height: 26px;
  position: relative;
  top: 4px;
  margin-left: 4px;

  .consoleCtrl {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin: 0 3px;
    border-radius: 50%;
    background: var(--control-default-bg-color);
  }

  .close {
    background: var(--control-close-bg-color);
  }

  .minimize {
    background: var(--control-minimize-bg-color);
  }

  .maximize {
    background: var(--control-maximize-bg-color);
  }
}

.editor {
  text-align: left;
  height: calc(100% - 46px);
  padding: 10px 15px;
  overflow-wrap: break-word;
  overflow-y: scroll;
  outline: none;
  font-family: "Source Code Pro", monospace;
  font-size: 18px;
  line-height: 22px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  .mobileInput {
    position: absolute;
    top: -2000px;
    left: -2000px;
  }

  .lineText {
    display: inline;
    position: relative;
    top: -1px;
    margin-left: 8px;
  }

  .preWhiteSpace {
    white-space: pre;
  }

  .caret {
    position: relative;
    -webkit-animation: blink 0.75s ease-in-out infinite;
    -moz-animation: blink 0.75s ease-in-out infinite;
    -o-animation: blink 0.75s ease-in-out infinite;
    -ms-animation: blink 0.75s ease-in-out infinite;
    animation: blink 0.75s ease-in-out infinite;

    .caretAfter {
      content: "";
      position: absolute;
      top: 2px;
      width: 10px;
      height: 22px;
      z-index: 10;
    }

    @-moz-keyframes blink {
      0% {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
      }
      100% {
        opacity: 1;
        -ms-filter: none;
        filter: none;
      }
    }
    @-webkit-keyframes blink {
      0% {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
      }
      100% {
        opacity: 1;
        -ms-filter: none;
        filter: none;
      }
    }
    @-o-keyframes blink {
      0% {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
      }
      100% {
        opacity: 1;
        -ms-filter: none;
        filter: none;
      }
    }
    @keyframes blink {
      0% {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
      }
      100% {
        opacity: 1;
        -ms-filter: none;
        filter: none;
      }
    }
  }

  a {
    color: #1a87b5;
  }
}

#terminalContainer {
  --control-default-bg-color: #ccc;
  --control-close-bg-color: #fc5b57;
  --control-minimize-bg-color: #e5bf3c;
  --control-maximize-bg-color: #57c038;
}

#terminalContainer {
  height: 100%;
}

.terminal {
  height: 100%;
  width: 100%;
  margin: auto;
  border-radius: 5px;
}

@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap");
#terminalContainer {
  --control-default-bg-color: #ccc;
  --control-close-bg-color: #fc5b57;
  --control-minimize-bg-color: #e5bf3c;
  --control-maximize-bg-color: #57c038;
}

#terminalContainer {
  height: 100%;
}

.terminal {
  height: 100%;
  width: 100%;
  margin: auto;
  border-radius: 5px;
}

@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap");

`;
export const StyleContext = React.createContext<any>(styles);

export const StyleContextProvider = (props: any) => {
  const { children } = props;

  return (
    <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>
  );
};

export default {
  StyleContext,
  StyleContextProvider,
};
