import React from "react";
import appContent from "../../../../config";

const { vsCodeStartUrl } = appContent;
export default function VsCode() {
  return (
    <iframe
      src={vsCodeStartUrl}
      frameBorder="0"
      title="VsCode"
      className="h-full w-full bg-ub-cool-grey"
    ></iframe>
    // https://github.com/conwnet/github1s
  );
}

export const displayVsCode = () => {
  <VsCode> </VsCode>;
};
