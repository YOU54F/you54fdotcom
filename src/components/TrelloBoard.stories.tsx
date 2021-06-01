// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { TrelloBoard } from "./TrelloBoard";

export default {
  title: "TrelloBoard",
  component: TrelloBoard,
};

const Template: Story<ComponentProps<typeof TrelloBoard>> = () => (
  <TrelloBoard />
);

export const TrelloBoardStory = Template.bind({});
