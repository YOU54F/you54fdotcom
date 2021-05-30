import React from "react";
import styled from "styled-components";
import HomeTerminal from "./HomeTerminal";

const Title = styled.h2`
  text-align: center;
`;

export const Home = () => (
  <div>
    <Title>YOU54F</Title>
    <div>
      <HomeTerminal />
    </div>
  </div>
);
