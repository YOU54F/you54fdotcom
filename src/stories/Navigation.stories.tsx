import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";

import { Navigation } from "../components/Navigation";
const Template = storiesOf("Navigation", module)
  // @ts-ignore
  .addDecorator(StoryRouter())
  .add("params", () => <Navigation />);

export const NavigationStory = Template;
