import React from "react";
import styled from "styled-components";
import { ResponsiveIframe } from "../styles/styles";
import { DeviceFrame } from "./DeviceFrame";

const Title = styled.h2`
  text-align: center;
`;
const ReplEmbedded = () => {
  return (
    <div>
      <Title>repl bash shell</Title>
      <DeviceFrame>
        <ResponsiveIframe
          className="chromatic-ignore"
          id="repl_intro"
          title="repl_intro"
          src="https://replit.com/@you54f/intro?embed=1&output=1"
        />
      </DeviceFrame>
    </div>
  );
};

export default ReplEmbedded;
