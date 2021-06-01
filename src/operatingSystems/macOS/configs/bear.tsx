import { FaPaw } from "react-icons/fa";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { GoRepo, GoBrowser } from "react-icons/go";
import { HiFire } from "react-icons/hi";

const bear = [
  {
    id: "profile",
    title: "Profile",
    icon: <FaPaw />,
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "/macos/markdown/about-me.md",
        icon: <GiNinjaHeroicStance />,
        excerpt: "A bit of info about me",
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "/macos/markdown/github-stats.md",
        icon: <VscGithub />,
        excerpt: "Github stats",
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "/macos/markdown/about-site.md",
        icon: <GoBrowser />,
        excerpt: "Personal playground and portfolio",
      },
    ],
  },
  {
    id: "project",
    title: "Projects",
    icon: <GoRepo />,
    md: [
      {
        id: "msw-pact",
        title: "msw-pact",
        file: "https://raw.githubusercontent.com/you54f/msw-pact/main/README.md",
        icon: <HiFire />,
        excerpt:
          "Create MSW (mock-service-worker) mocks, and generate pact contracts from the recorded interactions.",
        link: "https://github.com/YOU54F/msw-pact",
      },
    ],
  },
];

export default bear;
