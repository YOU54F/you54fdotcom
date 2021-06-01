// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { Termy } from "./Termy";

export default {
  title: "Termy",
  component: Termy,
};

const Template: Story<ComponentProps<typeof Termy>> = () => <Termy />;

export const TermyStory = Template.bind({});
