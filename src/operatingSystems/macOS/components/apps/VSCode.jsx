import React from "react";
import appContent from "../../../../config.ts";
export default function VSCode() {
  return (
    <iframe
      className="h-full w-full bg-vscode"
      src={appContent.vsCodeStartUrl}
      frameBorder="0"
      title="VSCode"
    />
  );
}
