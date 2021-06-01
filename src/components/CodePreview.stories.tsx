import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import CodePreview from "./CodePreview";

export default {
  title: "CodePreview",
  component: CodePreview,
};

const Template: Story<ComponentProps<typeof CodePreview>> = () => (
  <CodePreview />
);

export const CodePreviewStory = Template.bind({});
