// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import TrelloCardComponent from "./TrelloCard";

export default {
  title: "TrelloCard",
  component: TrelloCardComponent,
};

const Template: Story<ComponentProps<typeof TrelloCardComponent>> = () => (
  <TrelloCardComponent />
);

export const TrelloCardComponentStory = Template.bind({});
