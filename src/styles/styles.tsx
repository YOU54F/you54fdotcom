import styled from "styled-components";

export const ResponsiveIframe = styled.iframe`
  height: 600px;
  width: 1500px;
  max-width: 100%;
  max-height: 100%;
  frame-border: 0;
  sandbox='allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts'
`;
