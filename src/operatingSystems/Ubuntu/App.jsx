import { createGlobalStyle } from "styled-components";
import Ubuntu from "./components/ubuntu";

import "./tailwind.css";

function UbuntuApp() {
  return (
    <>
      <UbuntuGlobalStyles />
      <Ubuntu />
    </>
  );
}

export default UbuntuApp;

const UbuntuGlobalStyles = createGlobalStyle`
/* Ubuntu Font */
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

.ubuntu-font {
    font-family: 'Ubuntu', sans-serif;
}

/* Top NavBar styling */

.top-arrow-up {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #333333;
}

.arrow-custom {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
}

.animateShow {
    animation: transformDownShow 200ms 1 forwards;
}

@keyframes transformDownShow {
    0% {
        transform: translateY(-10px);
        opacity: 0;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}

input[type=range].ubuntu-slider {
    outline: none;
    -webkit-appearance: none;
    background: linear-gradient(to right, rgba(175, 175, 175, 0.3) 0%, rgba(175, 175, 175, 0.3) 100%);
    background-position: center;
    background-size: 99% 3px;
    background-repeat: no-repeat;
    /* width: 65%; */
    height: 6px;
    border-radius: 50%;
}

input[type=range].ubuntu-slider::-webkit-slider-thumb {
    -webkit-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    background-color: #fff;
    pointer-events: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    position: relative;
}

/* Window's styling */
.arrow-custom-up {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
    width: 0;
}

.arrow-custom-down {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
    width: 0;
}

.arrow-custom-left {
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-right: 5px solid white;
    width: 0;
}

.arrow-custom-right {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid white;
    width: 0;
}

.window-y-border {
    height: calc(100% - 10px);
    width: calc(100% + 10px);
    cursor: e-resize;
}

.window-x-border {
    height: calc(100% + 10px);
    width: calc(100% - 10px);
    cursor: n-resize;
}

.notFocused {
    filter: brightness(90%);
}

.root,
#root,
#docs-root {
    --window-transform-x: 0px;
    --window-transform-y: 0px;
}

.window-shadow {
    box-shadow: 1px 4px 12px 4px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 1px 4px 12px 4px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 1px 4px 12px 4px rgba(0, 0, 0, 0.2);
}

.closed-window {
    animation: closeWindow 200ms 1 forwards;
}

@keyframes closeWindow {
    0% {
        opacity: 1;
        transform: translate(var(--window-transform-x), var(--window-transform-y)) scale(1);
        visibility: visible;
    }

    100% {
        opacity: 0;
        transform: translate(var(--window-transform-x), var(--window-transform-y)) scale(0.85);
        visibility: hidden;
    }
}

.windowMainScreen::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: transparent;
}

.windowMainScreen::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

.windowMainScreen::-webkit-scrollbar-thumb {
    background-color: #D3D7CF;
    border-radius: 5px;
}

/* SideBarApp Scale image onClick */
.scalable-app-icon {
    visibility: hidden;
}

.scalable-app-icon.scale {
    animation: scaleAppImage 400ms 1 forwards;
}

@keyframes scaleAppImage {
    from {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        visibility: visible;
    }

    to {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
        visibility: hidden;
    }
}

/* Context Menu */
.context-menu-bg {
    background-color: rgb(43, 43, 43);
}

/* Lock Screen */
.lock-screen {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;
}

.lock-screen:before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(15px);
}

.emoji-list>li {
    padding-left: 10px;
}

.list-pc {
    list-style: "🏫";
}

.list-building {
    list-style: "👨🏻‍💻";
}

.list-time {
    list-style: "🎲";
}

.list-star {
    list-style: "🌟";
}

.list-arrow {
    list-style: "⇀";
}
`;
