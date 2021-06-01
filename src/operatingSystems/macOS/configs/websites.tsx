import config from "../../../config";
const websites = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-website",
        title: "Website",
        img: "./macos/images/logos/saf_pixel_head.png",
        link: config.websiteUrl,
        inner: true,
      },
      {
        id: "my-blog",
        title: "Blog",
        img: "./macos/images/logos/saf_pixel_head.png",
        link: config.blogUrl,
        inner: true,
      },
      {
        id: "my-github",
        title: "Github",
        img: "./macos/img/sites/github.svg",
        link: config.githubAuthorUrl,
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "./macos/img/sites/linkedin.svg",
        link: config.linkedInAuthorUrl,
      },
      {
        id: "my-facebook",
        title: "Facebook",
        img: "./macos/img/sites/facebook.svg",
        link: config.facebookLink,
      },
      {
        id: "my-email",
        title: "Email",
        img: "./macos/img/sites/gmail.svg",
        link: config.authorEmailLink,
      },
    ],
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "./macos/img/sites/github.svg",
        link: "https://github.com/",
      },
      {
        id: "gmail",
        title: "Gmail",
        img: "./macos/img/sites/gmail.svg",
        link: "https://mail.google.com/",
      },
      {
        id: "reddit",
        title: "Reddit",
        img: "./macos/img/sites/reddit.svg",
        link: "https://www.reddit.com/",
      },
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "./macos/img/sites/hacker.svg",
        link: "https://news.ycombinator.com/",
      },
    ],
  },
};

export default websites;
