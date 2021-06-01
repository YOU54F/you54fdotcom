// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { Twitter } from "./Twitter";

export default {
  title: "Twitter",
  component: Twitter,
};

const Template: Story<ComponentProps<typeof Twitter>> = () => <Twitter />;

export const TwitterStory = Template.bind({});
