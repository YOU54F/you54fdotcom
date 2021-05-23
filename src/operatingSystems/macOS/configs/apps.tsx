import FaceTime from "../components/apps/FaceTime";
import Terminal from "../components/apps/Terminal";
import Safari from "../components/apps/Safari";
import Bear from "../components/apps/Bear";
import VSCode from "../components/apps/VSCode";
import config from "../../../config";
const apps = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    img: "img/macos/icons/launchpad.png",
  },
  {
    id: "bear",
    title: "Bear",
    desktop: true,
    show: true,
    width: 860,
    height: 500,
    img: "img/macos/icons/bear.png",
    content: <Bear />,
  },
  {
    id: "safari",
    title: "Safari",
    desktop: true,
    show: false,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    img: "img/macos/icons/safari.png",
    content: <Safari />,
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    show: false,
    img: "img/macos/icons/vscode.png",
    content: <VSCode />,
  },
  {
    id: "facetime",
    title: "FaceTime",
    desktop: true,
    show: false,
    img: "img/macos/icons/facetime.png",
    height: 530,
    content: <FaceTime />,
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    show: false,
    img: "img/macos/icons/terminal.png",
    content: <Terminal />,
  },
  {
    id: "email",
    title: "Mail",
    desktop: false,
    img: "img/macos/icons/mail.png",
    link: config.authorEmailLink,
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    img: "img/macos/icons/github.png",
    link: config.githubRepoUrl,
  },
];

export default apps;
