// import React, { createContext, useContext, useState, useEffect } from "react";

// // Context.
// export const V86ScriptContext = createContext();

// // Create a custom hook to use the context.
// export const useV86ScriptContext = () => useContext(V86ScriptContext);

// // Provider of context.
// const V86ScriptProvider = ({ children }) => {
//   const [hasLoadedXtermScript, setHasLoadedXtermScript] = useState(false);
//   const [hasLoadedV86Script, setHasLoadedV86Script] = useState(false);
//   // const [hasLoadedUserScript, setHasLoadedUserScript] = useState(false);
//   const [isReadyXtermScript, setIsReadyXtermScript] = useState(false);
//   const [isReadyV86Script, setIsReadyV86Script] = useState(false);
//   const [isReadyUserScript, setIsReadyUserScript] = useState(false);

//   /**
//    * Extra security measure to check if the script has
//    * already been included in the DOM
//    */
//   const scriptAlreadyExists = (id) =>
//     document.querySelector(`script#${id}`) !== null;

//   /**
//    * Append the script to the document.
//    * Whenever the script has been loaded it will
//    * set the isLoaded state to true.
//    * Give it a string array
//    */
//   const appendScript = (fileLocations, id) => {
//     const script = document.createElement("script");
//     fileLocations.map((fileLocation) =>
//       script.setAttribute("src", fileLocation)
//     );
//     script.id = id;
//     script.async = true;
//     script.defer = true;
//     script.crossOrigin = "anonymous";
//     switch (id) {
//       case "xterm-script":
//         script.onload = () => setHasLoadedXtermScript(true);
//         document.body.append(script);
//         break;
//       case "v86-script":
//         script.onload = () => setHasLoadedV86Script(true);
//         document.body.append(script);
//         break;
//       // case "user-script":
//       //   script.onload = () => setHasLoadedUserScript(true);
//       //   document.body.append(script);
//       //   break;

//       default:
//         console.log("not attaching script as no id match");
//         break;
//     }
//   };

//   /**
//    * Runs first time when component is mounted
//    * and adds the script to the document.
//    */
//   useEffect(() => {
//     if (!scriptAlreadyExists("xterm-script")) {
//       appendScript(
//         [
//           // "../v86/xterm/xterm.css",
//           "../v86/xterm/xterm.js",
//           // "../v86/xterm/xterm-addon-fit.js",
//         ],
//         "xterm-script"
//       );
//     }
//     if (!scriptAlreadyExists("v86-script")) {
//       appendScript(["../v86/libv86.js"], "v86-script");
//     }
//     // if (!scriptAlreadyExists("user-script")) {
//     //   appendScript(["../v86/index.js"], "user-script");
//     // }
//   }, []);

//   /**
//    * Whenever the script has loaded initialize the
//    * FB SDK with the init method. This will then set
//    * the isReady state to true and passes that
//    * through the context to the consumers.
//    */
//   useEffect(() => {
//     if (hasLoadedV86Script === true) {
//       setIsReadyV86Script(true);
//     }
//   }, [hasLoadedV86Script]);

//   useEffect(() => {
//     if (hasLoadedXtermScript === true) {
//       setIsReadyXtermScript(true);
//     }
//   }, [hasLoadedXtermScript]);
//   // useEffect(() => {
//   //   if (hasLoadedUserScript === true) {
//   //     setIsReadyUserScript(true);
//   //   }
//   // }, [hasLoadedUserScript]);

//   return (
//     <V86ScriptContext.Provider
//       value={{
//         isReadyUserScript,
//         isReadyV86Script,
//         isReadyXtermScript,
//         // hasLoadedUserScript,
//         hasLoadedV86Script,
//         hasLoadedXtermScript,
//       }}
//     >
//       {children}
//     </V86ScriptContext.Provider>
//   );
// };

// export default V86ScriptProvider;
