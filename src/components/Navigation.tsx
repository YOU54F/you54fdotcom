import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeClassName = "active";

const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: tomato;
  font-weight: bold;
  border: 1px solid tomato;
  border-radius: 12px;
  text-decoration: none;
  padding: 2px 6px;

  :hover,
  &:active,
  &:visited {
    color: tomato;
  }

  &.${activeClassName} {
    color: red;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  padding: 5px 10px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  padding-top: 15px;
  background-color: dark;
`;

export const Navigation = () => {
  return (
    <Wrapper>
      <List>
        <ListItem>
          <StyledLink to="/" activeClassName={activeClassName} exact>
            Home
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/repl" activeClassName={activeClassName} exact>
            repl
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/replit" activeClassName={activeClassName} exact>
            replit
          </StyledLink>
        </ListItem>
      </List>
    </Wrapper>
  );
};
