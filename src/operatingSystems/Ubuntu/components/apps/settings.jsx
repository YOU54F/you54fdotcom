import React from "react";
import $ from "jquery";

export function Settings(props) {
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

  let changeBackgroundImage = (e) => {
    props.changeBackgroundImage($(e.target).data("path"));
  };

  return (
    <div
      className={
        "w-full flex-col flex-grow z-20 max-h-full overflow-y-auto windowMainScreen select-none bg-ub-cool-grey"
      }
    >
      <div
        className=" md:w-2/5 w-2/3 h-1/3 m-auto my-4"
        style={{
          backgroundImage: `url(${wallpapers[props.currBgImgName]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="flex flex-wrap justify-center items-center border-t border-gray-900">
        {Object.keys(wallpapers).map((name, index) => {
          return (
            <div
              key={index}
              tabIndex="1"
              onFocus={changeBackgroundImage}
              data-path={name}
              className={
                (name === props.currBgImgName
                  ? " border-yellow-700 "
                  : " border-transparent ") +
                " md:px-28 md:py-20 md:m-4 m-2 px-14 py-10 outline-none border-4 border-opacity-80"
              }
              style={{
                backgroundImage: `url(${wallpapers[name]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;

export const displaySettings = () => {
  return <Settings> </Settings>;
};
