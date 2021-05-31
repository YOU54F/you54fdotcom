// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { Navigation } from "../components/Navigation";

export default {
  title: "Navigation",
  component: Navigation,
};

const Template: Story<ComponentProps<typeof Navigation>> = () => <Navigation />;

export const NavigationStory = Template.bind({});
