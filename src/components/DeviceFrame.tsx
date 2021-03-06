import React, { PropsWithChildren, useEffect, useState } from "react";

import styled from "styled-components";
import { DeviceStyles } from "styles/deviceStyles";

const StyledDevice = styled.div`
  display: flex;
`;

export const DeviceFrame = ({ children }: PropsWithChildren<{}>) => {
  const [isIpad, setisIpad] = useState(
    window.innerWidth >= 415 && window.innerWidth < 850
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 414);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isIpad = window.innerWidth >= 415 && window.innerWidth < 850;
        isIpad ? setisIpad(true) : setisIpad(false);
      },
      false
    );
  }, [isIpad]);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isMobile = window.innerWidth <= 414;
        isMobile ? setIsMobile(true) : setIsMobile(false);
      },
      false
    );
  }, [isMobile]);
  return (
    <div style={{ overflow: "scroll", textAlign: "center" }}>
      <DeviceStyles />
      <StyledDevice
        className={`${
          isIpad || isMobile
            ? isMobile
              ? "marvel-device iphone8"
              : "marvel-device ipad"
            : "marvel-device macbook"
        }`}
        style={
          isIpad
            ? {
                width: "90%",
                maxWidth: "auto",
              }
            : {
                width: "80%",
                maxWidth: "auto",
              }
        }
      >
        <div className="top-bar"></div>
        <div className="camera"></div>
        <div className="screen">{children}</div>
        <div className="bottom-bar"></div>
      </StyledDevice>
    </div>
  );
};
