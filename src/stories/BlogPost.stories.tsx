// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import GetBlogPost from "../components/GetBlogPost";

export default {
  title: "GetBlogPost",
  component: GetBlogPost,
};

const Template: Story<ComponentProps<typeof GetBlogPost>> = (args) => (
  <GetBlogPost {...args} />
);

export const BlogStory = Template.bind({});
BlogStory.args = {
  filePath:
    "terminalFiles/blogs/configuring-cypress-to-work-with-iframes-cross-origin-sites.md",
  darkMode: true,
};
