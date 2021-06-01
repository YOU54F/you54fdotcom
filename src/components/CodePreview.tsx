import React from "react";

import {
  DemoScript,
  DemoStepKind,
  stepsForText,
  StepTarget,
  AnimatedCodeExample,
} from "@authzed/animated-code-example-component";

// Include the CSS for the component.
import "@authzed/animated-code-example-component/dist/index.css";

const script: DemoScript = {
  initialEditorContent: `import { APIGatewayProxyEventV2, APIGatewayProxyResultV2,
    Context } from "aws-lambda";
  
  export const handler = async (
    event: APIGatewayProxyEventV2,
    context: Context
  ): Promise<APIGatewayProxyResultV2> => {
    return "";
  };
`,
  initialReplContent: "",
  initialBrowserContent: "",
  editorLanguage: "typescript",
  steps: [
    ...stepsForText("hello world", StepTarget.EDITOR, 8, 13),
    ...stepsForText("yarn run start", StepTarget.REPL, 1, 1),
    { kind: DemoStepKind.SLEEP, duration: 200 },
    {
      kind: DemoStepKind.INSERT_TEXT,
      target: StepTarget.REPL,
      value:
        "\n Serverless Offline [http for lambda] listening on http://localhost:3002",
      // '\n Serverless: Compiling with Typescript...\n Serverless: Using local tsconfig.json\n Serverless: Warning: "rootDir" from local tsconfig.json is overriden\n Serverless: Typescript compiled.\n Serverless: Watching typescript files...\n offline: Starting Offline: dev/us-east-1.\n offline: Offline [http for lambda] listening on http://localhost:3002\n offline: Function names exposed for local invocation by aws-sdk:\n    * hello: local-aws-testing-dev-hello',
    },
    { kind: DemoStepKind.SLEEP, duration: 500 },
    {
      kind: DemoStepKind.SET_BROWSER_CONTENT,
      target: StepTarget.BROWSER,
      value: "hello world",
    },
  ],
};

function CodePreview() {
  return (
    <div className="chromatic-ignore">
      <AnimatedCodeExample
        script={script}
        theme="dark"
        highlightActiveElement={true}
        browserDisplayedUrl={"https://localhost:3002"}
      />
    </div>
  );
}

export default CodePreview;
