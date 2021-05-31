// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { ReplWorkspace } from "../components/Repl";

export default {
  title: "ReplWorkspace",
  component: ReplWorkspace,
};

const Template: Story<ComponentProps<typeof ReplWorkspace>> = () => (
  <ReplWorkspace />
);

export const ReplWorkspaceStory = Template.bind({});
