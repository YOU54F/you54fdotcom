import config from "../../../config";
const websites = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-website",
        title: "Website",
        img: "images/logos/saf_pixel_head.png",
        link: config.websiteUrl,
        inner: true,
      },
      {
        id: "my-blog",
        title: "Blog",
        img: "images/logos/saf_pixel_head.png",
        link: config.blogUrl,
        inner: true,
      },
      {
        id: "my-github",
        title: "Github",
        img: "img/macos/sites/github.svg",
        link: config.githubAuthorUrl,
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/macos/sites/linkedin.svg",
        link: config.linkedInAuthorUrl,
      },
      {
        id: "my-facebook",
        title: "Facebook",
        img: "img/macos/sites/facebook.svg",
        link: config.facebookLink,
      },
      {
        id: "my-email",
        title: "Email",
        img: "img/macos/sites/gmail.svg",
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
        img: "img/macos/sites/github.svg",
        link: "https://github.com/",
      },
      {
        id: "gmail",
        title: "Gmail",
        img: "img/macos/sites/gmail.svg",
        link: "https://mail.google.com/",
      },
      {
        id: "reddit",
        title: "Reddit",
        img: "img/macos/sites/reddit.svg",
        link: "https://www.reddit.com/",
      },
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "img/macos/sites/hacker.svg",
        link: "https://news.ycombinator.com/",
      },
    ],
  },
};

export default websites;
