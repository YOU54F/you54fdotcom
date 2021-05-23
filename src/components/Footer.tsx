import React from "react";
import styled from "styled-components";
import appConfig from "../config";
const Link = styled.a`
  color: #9649cb;
`;

const Wrapper = styled.div`
  font-weight: bold;
  color: #ccc;
  text-align: center;
`;

export const Footer = () => (
  <Wrapper>
    <Link href={appConfig.websiteUrl}>Homepage</Link>
    {" | "}
    <Link href={appConfig.githubRepoUrl}>Github Repo</Link>
    {" | "}
    <Link href={appConfig.githubAuthorUrl}>Github Profile</Link>
  </Wrapper>
);
