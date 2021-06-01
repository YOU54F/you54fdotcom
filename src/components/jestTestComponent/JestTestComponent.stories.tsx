import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import JestTestComponent from "./index";

export default {
  title: "JestTestComponent",
  component: JestTestComponent,
};

const Template: Story<ComponentProps<typeof JestTestComponent>> = () => (
  <JestTestComponent />
);

export const JestTestComponentStory = Template.bind({});
