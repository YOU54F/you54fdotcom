const experience = () =>
  (
    (Number(new Date()) - Number(new Date("2007-01-01"))) /
    1000 /
    60 /
    60 /
    24 /
    365
  ).toFixed(1);

export const gitBranch = process.env.REACT_APP_GIT_BRANCH_CI
  ? process.env.REACT_APP_GIT_BRANCH_CI
  : process.env.REACT_APP_GIT_BRANCH_LOCAL
  ? process.env.REACT_APP_GIT_BRANCH_LOCAL
  : "main";

const storybookBaseUrl =
  "https://www.chromatic.com/library?appId=60b56751c428f6003b9f26dd";

export const appContent: GeneralAppContent = {
  githubAuthorUrl: "https://github.com/you54f",
  githubRepoUrl: "https://github.com/you54f/you54fdotcom",
  github1sRepoUrl: "https://github1s.com/you54f/you54fdotcom",
  vsCodeStartUrl: "https://github1s.com/you54f/you54fdotcom/blob/main/App.tsx",
  websiteUrl: "https://you54f.com",
  blogUrl: "https://blog.you54f.com",
  experienceDuration: experience(),
  blogMediumUrl: "https://medium.com/@you54f",
  twitterAuthorUrl: "https://twitter.com/you54f",
  linkedInAuthorUrl: "https://uk.linkedin.com/in/yousaf-nabi-54278b3",
  authorHandle: "@you54f",
  authorEmail: "yousaf@you54f.com",
  authorEmailLink: "mailto:yousaf@you54f.com",
  authorName: "Yousaf Nabi",
  facebookLink: "https://www.facebook.com/yourfaceisabook",
  githubStarButton:
    "https://ghbtns.com/github-btn.html?user=you54f&repo=you54fdotcom&type=star&count=true&size=large",
  storybookBranchUrl: storybookBaseUrl + "&branch=" + gitBranch,
};

interface GeneralAppContent {
  githubAuthorUrl: string;
  githubRepoUrl: string;
  github1sRepoUrl: string;
  vsCodeStartUrl: string;
  websiteUrl: string;
  blogMediumUrl: string;
  blogUrl: string;
  experienceDuration: string;
  githubStarButton: string;
  twitterAuthorUrl: string;
  authorHandle: string;
  authorName: string;
  linkedInAuthorUrl: string;
  authorEmail: string;
  authorEmailLink: string;
  facebookLink: string;
  storybookBranchUrl: string;
}

export default appContent;
