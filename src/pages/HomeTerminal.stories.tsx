// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import HomeTerminal from "./HomeTerminal";
import { TerminalContextProvider } from "react-terminal";

export default {
  title: "HomeTerminal",
  component: HomeTerminal,
};

const Template: Story<ComponentProps<typeof HomeTerminal>> = () => (
  <TerminalContextProvider>
    <HomeTerminal />
  </TerminalContextProvider>
);

export const HomeTerminalStory = Template.bind({});
