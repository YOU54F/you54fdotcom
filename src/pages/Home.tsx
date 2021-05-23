import React from "react";
import styled from "styled-components";
import Terminal from "./Terminal";

const Title = styled.h2`
  text-align: center;
`;

export const Home = () => (
  <div>
    <Title>YOU54F</Title>
    <div>
      <Terminal />
    </div>
  </div>
);
