import React from "react";
import styled from "styled-components";
import { ResponsiveIframe } from "../styles/styles";
import { DeviceFrame } from "./DeviceFrame";

const Title = styled.h2`
  text-align: center;
`;
export const ReplWorkspace = () => {
  return (
    <div>
      <Title>repl workspace</Title>
      <DeviceFrame>
        <ResponsiveIframe
          className="chromatic-ignore"
          id="repl_intro2"
          title="repl_intro2"
          src="https://replit.com/@YOU54F/you54f?lite=true#index.ts"
        />
      </DeviceFrame>
    </div>
  );
};
