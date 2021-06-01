import React from "react";
import Clock from "../util components/clock";

export default function LockScreen(props) {
  const wallpapers = {
    "wall-1": "/ubuntu/images/wallpapers/wall-1.jpg",
    "wall-2": "/ubuntu/images/wallpapers/minified/wall-2.jpeg",
    "wall-3": "/ubuntu/images/wallpapers/minified/wall-3.jpg",
    "wall-4": "/ubuntu/images/wallpapers/minified/wall-4.jpg",
    "wall-5": "/ubuntu/images/wallpapers/minified/wall-5.jpg",
    "wall-6": "/ubuntu/images/wallpapers/minified/wall-6.jpeg",
    "wall-7": "/ubuntu/images/wallpapers/minified/wall-7.jpeg",
    "wall-8": "/ubuntu/images/wallpapers/minified/wall-8.jpg",
  };

  if (props.isLocked) {
    window.addEventListener("click", props.unLockScreen);
    window.addEventListener("keypress", props.unLockScreen);
  }

  return (
    <div
      id="ubuntu-lock-screen"
      style={{
        backgroundImage: `url(${wallpapers[props.bgImgName]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        zIndex: "100",
      }}
      className={
        (props.isLocked
          ? " visible translate-y-0 "
          : " invisible -translate-y-full ") +
        " absolute outline-none transform duration-500 select-none top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-opacity-50"
      }
    >
      <div className="lock-screen flex flex-col justify-center items-center text-white">
        <div className=" text-7xl">
          <Clock onlyTime={true} />
        </div>
        <div className="mt-4 text-xl font-medium">
          <Clock onlyDay={true} />
        </div>
        <div className=" mt-16 text-base">Click or Press a key to unlock</div>
      </div>
    </div>
  );
}
