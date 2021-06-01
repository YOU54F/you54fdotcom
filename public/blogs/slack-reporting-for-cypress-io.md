---
title: "Slack Reporting for Cypress.io"
date: "2019-09-23"
---

I've been using [Cypress](https://www.cypress.io/) for front-end testing for the last year, which we have been executing in our CI pipeline with CircleCI. CircleCI offers slack notifications for builds, but it doesn't offer the ability to customise the Slack notifications with build metadata. So I decided to write a slack reporter, that would do the following

- Notify a channel when tests are complete
- Display the test run status (Passed / Failed / Build Failure), plus number of tests
- Display VCS metadata (Branch Name / Triggering Commit & Author)
- Display VCS Pull Requesdt metadata (number and link to PR )
- Provide a link to CI build log
- Provide a link to a test report generated with Mochawesome
- Provide links to screenshots / videos of failing test runs

The source code is available here :- [https://github.com/YOU54F/cypress-slack-reporter](https://github.com/YOU54F/cypress-slack-reporter)

It has been released as a downloadable package from NPM, read below for details on how to get it, and how to use it.

As this is an add-on for Cypress, we still need a few pre-requisites

- A test tool capable of utilising mochawesome to report results such as Cypress.
- [mochawesome](https://github.com/adamgruber/mochawesome/) for json test result generation
- [mochawesome-merge](https://github.com/Antontelesh/mochawesome-merge) to combine multiple mochawesome reports
- [mochawesome-report-generator](https://github.com/Antonteleshmochawesome-report-generator) to generate a HTML report, from your mochawesome json test results
- [cypress-multi-reporters](https://github.com/YOU54F/cypress-multi-reporters) to allow you to use multiple reporters, in case you require other outputs (junit/spec etc)

1. Download the npm package direct from the registry

```bash
npm install cypress-slack-reporter --save-dev
```

or

```bash
yarn add cypress-slack-reporter --dev
```

2. Create a Slack incoming webhook URL at [Slack Apps](https://api.slack.com/slack-apps)

3. Setup an environment variable to hold your webhook, created in the last step and save as SLACK_WEBHOOK_URL

```bash
$ export SLACK_WEBHOOK_URL=yourWebhookUrlHere
```

4. Add the following in your cypress.json file

```json
{
...
"reporter": "cypress-multi-reporters",
"reporterOptions": {
"configFile": "reporterOpts.json"
}
}
```

5. Add the following in a newly created reporterOpts.json file

```json
{
  "reporterEnabled": "mochawesome",
  "mochawesomeReporterOptions": {
    "reportDir": "cypress/reports/mocha",
    "quiet": true,
    "overwrite": false,
    "html": false,
    "json": true
  }
}
```

6. Run cypress in run mode, which will generate a mochawesome test report, per spec file.

7. We now need to combine the seperate mochawesome files into a single file using mochawesome-merge

```bash
$ mkdir mochareports && npx mochawesome-merge --reportDir cypress/reports/mocha > mochareports/report-$$(date +'%Y%m%d-%H%M%S').json
```

8. We will now generate our test report with mochawesome, using our consolidated test report

```bash
$ npx marge mochareports/*.json -f report-$$(date +'%Y%m%d-%H%M%S') -o mochareports
```

9. We can now run our Slack Reporter, and set any non-default options

```bash
$ npx cypress-slack-reporter --help
```

```bash
Usage: index.ts [options]

Options:
-v, --version output the version number
--vcs-provider [type] VCS Provider [github|bitbucket|none] (default: "github")
--ci-provider [type] CI Provider [circleci|none] (default: "circleci")
--report-dir [type] mochawesome json & html test report directory, relative to your package.json (default: "mochareports")
--screenshot-dir [type] cypress screenshot directory, relative to your package.json (default: "cypress/screenshots")
--video-dir [type] cypress video directory, relative to your package.json (default: "cypress/videos")
--verbose show log output
-h, --help output usage information
```

Our generated slack reports will look like below.

![alerts.png](https://github.com/YOU54F/cypress-slack-reporter/blob/master/samples/alerts.png?raw=true)

Currently we support CircleCI for CI & GitHub/BitBucket VCS's.

For other providers, please raise a GitHub [issue](https://github.com/YOU54F/cypress-slack-reporter/issues) or pass `--ci-provider none` provider flag to provide a simple slack message based on the mochawesome report status.

It is possible to run to run the slack-reporter programatically via a [script](https://github.com/YOU54F/cypress-slack-reporter/blob/master/src/cli/spec.ts)

```javascript
import * as CypressNpmApi from "cypress";
import { slackRunner } from "cypress-slack-reporter/bin/slack/slack-alert";
const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");

CypressNpmApi.run({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mocha-junit-reporters, mochawesome",
    mochaJunitReportersReporterOptions: {
      mochaFile: "cypress/reports/junit/test*results[hash].xml",
      toConsole: false,
    },
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quiet: true,
      overwrite: true,
      html: false,
      json: true,
    },
  },
})
  .then(async (results) => {
    const generatedReport = await Promise.resolve(
      generateReport({
        reportDir: "cypress/reports/mocha",
        inline: true,
        saveJson: true,
      })
    );
    console.log("Merged report available here:-", generatedReport);
    return generatedReport;
  })
  .then((generatedReport) => {
    const base = process.env.PWD || ".";
    const program: any = {
      ciProvider: "circleci",
      videoDir: `${base}/cypress/videos`,
      vcsProvider: "github",
      screenshotDir: `${base}/cypress/screenshots`,
      verbose: true,
      reportDir: `${base}/cypress/reports/mocha`,
    };
    const ciProvider: string = program.ciProvider;
    const vcsProvider: string = program.vcsProvider;
    const reportDirectory: string = program.reportDir;
    const videoDirectory: string = program.videoDir;
    const screenshotDirectory: string = program.screenshotDir;
    const verbose: boolean = program.verbose;
    console.log("Constructing Slack message with the following options", {
      ciProvider,
      vcsProvider,
      reportDirectory,
      videoDirectory,
      screenshotDirectory,
      verbose,
    });
    const slack = slackRunner(
      ciProvider,
      vcsProvider,
      reportDirectory,
      videoDirectory,
      screenshotDirectory,
      verbose
    );
    console.log("Finished slack upload");
  })
  .catch((err: any) => {
    console.log(err);
  });

function generateReport(options: any) {
  return merge(options).then((report: any) => marge.create(report, options));
}
```

I have been extending the reporter, to allow the ability to upload the mochawesome report, and cypress artefacts (screenshots & videos) to an S3 bucket, and use the returned bucket links, for the Slack reporter. It is currently working on a [PR](https://github.com/YOU54F/cypress-slack-reporter/pull/108), but needs adding to the CLI before it can be added to the master branch.[](https://github.com/YOU54F/cypress-slack-reporter#todo)
