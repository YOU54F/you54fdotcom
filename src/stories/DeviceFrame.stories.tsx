// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { DeviceFrame } from "../components/DeviceFrame";

export default {
  title: "DeviceFrame",
  component: DeviceFrame,
};

const Template: Story<ComponentProps<typeof DeviceFrame>> = () => (
  <DeviceFrame />
);

export const DeviceFrameStory = Template.bind({});
