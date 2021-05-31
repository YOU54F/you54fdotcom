// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { ReplEmbedded } from "../components/ReplIt";

export default {
  title: "ReplEmbedded",
  component: ReplEmbedded,
};

const Template: Story<ComponentProps<typeof ReplEmbedded>> = () => (
  <ReplEmbedded />
);

export const ReplEmbeddedStory = Template.bind({});
