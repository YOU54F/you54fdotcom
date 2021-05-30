import React from "react";
import styled from "styled-components";

export const TrelloBoard = () => {
  return (
    <>
      <TrelloIframe src="https://trello.com/b/otKvOadi.html"></TrelloIframe>
    </>
  );
};

const TrelloIframe = styled.iframe`
  height: 600px;
  width: 100%;
  frame-border: 0;
`;
