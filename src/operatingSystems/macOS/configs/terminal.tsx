import config from "../../../config";
import { aboutMe } from "../../../pages/terminalContent";
const terminal = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: aboutMe(),
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "computers / making things / breaking things / cars",
      },
      {
        id: "env",
        title: ".env",
        type: "file",
        content: "export SUPER_SECRET='All your base are belong to us'",
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href={config.authorEmailLink}
                target="_blank"
                rel="noreferrer"
              >
                {config.authorEmail}
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href={config.githubAuthorUrl}
                target="_blank"
                rel="noreferrer"
              >
                {config.githubAuthorUrl}
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href={config.linkedInAuthorUrl}
                target="_blank"
                rel="noreferrer"
              >
                {config.linkedInAuthorUrl}
              </a>
            </li>
            <li>
              Blog:{" "}
              <a
                className="text-blue-300"
                href={config.blogUrl}
                target="_blank"
                rel="noreferrer"
              >
                {config.blogUrl}
              </a>
            </li>
          </ul>
        ),
      },
    ],
  },
];

export default terminal;
