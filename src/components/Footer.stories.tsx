// YourComponent.stories.tsx

import React, { ComponentProps } from "react";

import { Story } from "@storybook/react";

import { Footer } from "./Footer";

export default {
  title: "Footer",
  component: Footer,
};

const Template: Story<ComponentProps<typeof Footer>> = () => <Footer />;

export const FooterStory = Template.bind({});
