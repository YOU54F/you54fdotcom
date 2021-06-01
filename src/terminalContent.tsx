import GetBlogPost from "components/GetBlogPost";
import React, { Suspense } from "react";
import appContent from "./config";

const { experienceDuration, blogUrl } = appContent;

const bootItem = (name: string, link: string, external?: "external") => (
  <span>
    -&gt;{" "}
    <a
      target="_self"
      aria-label={name}
      rel="noopener noreferrer"
      href={external ? `${link}` : `/${link}`}
    >
      {name}
    </a>
    <br />
  </span>
);

const bootloader = () => (
  <span>
    {bootItem("macOS", "macos")}
    {bootItem("Ubuntu", "ubuntu")}
    {bootItem("Blog - terminal", "blog")}
    {bootItem("Blog - non terminal", "https://blog.you54f.com", "external")}
    {bootItem("Termy", "termy")}
    {bootItem("Storybook", appContent.storybookBranchUrl, "external")}
    {bootItem("Repl Workspace 🚧 - Under construction", "replworkspace")}
    {bootItem("Embedded Repl 🚧 - Under construction", "replembedded")}
  </span>
);

const welcomeMessage = (
  <span>
    LILO 2.27 Boot Menu <br />
    ___________________
    <br />
    <br />
    Select an option to continue <br />
    <br />
    {bootloader()} <br />
    <br />
    or type "help" for more information. <br />
    <br />
  </span>
);

const aboutMe = () => (
  <span>
    <br />
    <span>
      I'm <span className="bold">Yousaf Nabi</span>, a software consultant with
      a passion for testing, tech and all things automotive.
    </span>
    <br />
    <span>
      I've had {experienceDuration} years experience, testing software at scale
      across a multitude of organisations.
    </span>
    <br />
    <br />
    <span>
      Along the way helping some migrate from traditional software development
      methodologies to a leaner Agile based approach.
    </span>
    <br />
    <br />
    <span>
      I now work for a consultancy company, questioning everything, building
      just enough, just in time and helping bring others along in the journey.
    </span>
    <br />
    <br />
    <span>
      Check out my ramblings on my{" "}
      <a target="_blank" href={blogUrl} rel="noopener noreferrer">
        blog
      </a>
      .
    </span>
  </span>
);

const safHelp = () => (
  <span>
    <br />
    <span>Help on module saf:</span>
    <br />
    <br />
    <span>VARIABLES</span>
    <br />
    <span style={{ marginLeft: "20px" }}>
      <strong>saf.about</strong> -- know more about me
    </span>
    <br />
    <br />
    <span>FUNCTIONS</span>
    <br />
    <span style={{ marginLeft: "20px" }}>
      <strong>saf.experience()</strong> -&gt; float
    </span>
    <br />
    <span style={{ marginLeft: "40px" }}>
      returns the total years of working experience
    </span>
    <br />
    <span style={{ marginLeft: "20px" }}>
      <strong>saf.toggle_theme()</strong> -&gt; None
    </span>
    <br />
    <span style={{ marginLeft: "40px" }}>toggle the website's theme</span>
    <br />
  </span>
);

const blogPostRouter = (postUrl: string) => (
  <Suspense fallback={<div>Loading...</div>}>
    <GetBlogPost filePath={postUrl} />
  </Suspense>
);

const blogPost = (blogName: string) => {
  switch (Number(blogName)) {
    case 1:
      return blogPostRouter(
        "../blogs/configuring-cypress-to-work-with-iframes-cross-origin-sites.md"
      );
    case 2:
      return blogPostRouter(
        "../blogs/cross-browser-testing-without-the-browser.md"
      );
    case 3:
      return blogPostRouter(
        "../blogs/cypress-edge-now-available-for-windows.md"
      );
    case 4:
      return blogPostRouter(
        "../blogs/dynamically-generate-data-in-cypress-from-csv-xlsx.md"
      );
    case 5:
      return blogPostRouter(
        "../blogs/jest-pact-a-jest-adaptor-to-help-write-pact-files-with-ease.md"
      );
    case 6:
      return blogPostRouter(
        "../blogs/just-because-youre-paranoid-doesnt-mean-they-arent-after-you.md"
      );
    case 7:
      return blogPostRouter(
        "../blogs/protecting-your-api-development-workflows-with-swagger-openapi-pact-io.md"
      );
    case 8:
      return blogPostRouter(
        "../blogs/securing-the-pact-broker-with-nginx-letsencrypt.md"
      );
    case 9:
      return blogPostRouter("../blogs/slack-reporting-for-cypress-io.md");
    case 10:
      return blogPostRouter("../blogs/the-journey-begins.md");
    case 11:
      return blogPostRouter(
        "../blogs/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked - and-it-works-with-cypress-and-now-you-can-test-it-too/md"
      );
    case 12:
      return blogPostRouter(
        "../blogs/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked - and-it-works-with-cypress.md"
      );
    case 13:
      return blogPostRouter("../blogs/tinkering-with-the-touchbar.md");
    case 14:
      return blogPostRouter(
        "../blogs/2021-05-23-grey-box-testing-talks-parti.md"
      );
    case 15:
      return blogPostRouter(
        "../blogs/2020-01-28-spicy-meatballs-frying-a-swedish-ecu.md"
      );
    default:
      return blogPostRouter("../lib/ls.md");
  }
};

export {
  bootItem,
  bootloader,
  welcomeMessage,
  aboutMe,
  safHelp,
  blogPostRouter,
  blogPost,
};
