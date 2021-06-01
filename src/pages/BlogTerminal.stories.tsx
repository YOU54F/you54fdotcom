// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import BlogTerminal from "./BlogTerminal";
import { TerminalContextProvider } from "react-terminal";

export default {
  title: "BlogTerminal",
  component: BlogTerminal,
};

const Template: Story<ComponentProps<typeof BlogTerminal>> = () => (
  <TerminalContextProvider>
    <BlogTerminal />
  </TerminalContextProvider>
);

export const BlogTerminalStory = Template.bind({});
