---
title: "Grey Box Testing Talks - PartI"
date: "2021-05-23"
---

## How you can play with an AWS local simulation environment, to build out, test and experiment.

I've been thinking about creating a series of posts for a while about grey-box testing, which I think is the sweet spot for testing, for providing the best return of functional test coverage, with minimal effort.

Anyway I will deep-dive into particular aspects in due course, but I thought it would be great to start off by building something, utilising test-driven design.

We want something we can visit with our website that will simply return us the classic words "hello world"

You will need some `git` / `node` / `npm` a code editor and ideally `yarn` on your machine before we start.

If you don't have yarn, substitute `yarn` for `npm` and in the commands that include `--dev` replace with `--save-dev`!

I will pop some links in for their respective setup guides, but other than that, you can be a complete novice to coding, or technical testing, but don't worry, hopefully this set of examples should help you build up some knowledge and confidence to experiment yourself.

- Steps we are going to perform

  - Create a git repository
  - Create a node project

  - Setup a basic typescript project

  - Install a testing framework tool
  - Created our first failing unit test using Test Driven Design
  - Implement some code to pass our unit test
  - Setup serverless-offline to emulate our AWS cloud environment
  - Test our code
  - Create our first integration test.

We are going to make a new directory and open vscode

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.29.52.png?w=475)

Tada!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.31.44.png?w=1024)

You can press CTRL-J (cmd if on a mac) to open your terminal in your editor!

Let's initialise the repo, with `git init`

```bash
➜  git init


Output:

Initialized empty Git repository in /Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/.git/
```

We can now see that we have a `master` branch.

Lets initialise this as an npm project, with `npm init`

You can accept the defaults for now.

```bash
➜  local-aws-testing git:(master) npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (local-aws-testing)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
license: (ISC)
About to write to /Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/package.json:

{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "YOU54F",
  "license": "ISC"
}


Is this OK? (yes) y
```

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.32.48.png?w=1024)

Let's add typescript to our project with `yarn add typescript --dev`

```bash
➜  local-aws-testing git:(master) ✗ yarn add typescript --dev
yarn add v1.22.4
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ typescript@4.2.3
info All dependencies
└─ typescript@4.2.3
✨  Done in 2.72s.
```

Now we need to initialise our typescript project. Lets add a script into our package.json

```json
{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^4.2.3"
  }
}
```

And run it

```bash
➜  local-aws-testing git:(master) ✗ yarn run init
yarn run v1.22.4
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
✨  Done in 0.44s.
```

And lets create our first typescript file

```bash
➜  local-aws-testing git:(master) ✗ mkdir src
➜  local-aws-testing git:(master) ✗ touch src/handler.ts
```

Before we go any further, lets create a `.gitignore` file, to keep some things out of source control, and add our `node_modules` folder in for starters!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.54.18.png?w=944)

So our folder structure is looking this so far and we haven't written any code yet!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.54.54.png?w=1024)

Let's create an initial commit, and then we can think about writing our Hello World Lambda!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-20.56.57.png?w=1001)

Hooray! Our first commit. Right, so we are building a Hello world Lambda.

What's a lambda? Basically it's a function, that takes some input, and gets some output.

Whats our input? Us, or anyone, calling our Lambda function.

What's our output? Hello world, of course.

So let's start with a test!

And for that, we need a testing framework, of which there are many, but today, I will be looking at Jest.

- jest
- ts-jest
- @types/jest

```bash
➜  local-aws-testing git:(master) yarn add jest ts-jest @types/jest --dev
```

We need to configure ts-jest to setup a config file, that will allow jest to read our typescript files.

```bash
➜  local-aws-testing git:(master) ✗ npx ts-jest config:init

Jest configuration written to "/Users/you54f/dev/saf/dev/githubrepos/tutorials/local-aws-testing/jest.config.js".
```

Lets create our file test filee

```bash
➜  local-aws-testing git:(master) ✗ touch src/handler.test.ts
```

So lets write our first test.

They start with this shape.

```typescript
describe("Hello world handler", () => {
  it("should return hello world", () => {});
});
```

Our test has three elements.

- Arrange - Where we setup our test conditions
- Act - Where we perform the action against the thing we are testing
- Assert - Where we perform some checks to ensure our output is as we expect

```js
describe("Hello world handler", () => {
  it("should return hello world", () => {
    // arrange
    const expectedResult = "hello world";

    // act
    const result = "This is where we would call our thing we are testing";

    // assert
    expect(result).toEqual(expectedResult);
  });
});
```

Now we want to run our first test. We can update our `package.json` to include the `"test": "jest"` script

```json
{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "jest"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^26.0.22",
    "jest": "^26.6.3",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}
```

Our test failed! Oh no.

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.18.19.png?w=1024)

Oh yeaaaaaah!

Now, we expected this test to fail. It can't possibly work, right? We haven't written any code yet, other than an assertion that can't possibly pass.

So lets write some code in our `src/handler.ts` file.

```typescript
export const handler = () => {
  return "hello world";
};
```

we can run our tests in watch mode, and see the tests update, as we write our code, and try and make the test pass!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.23.39.png?w=1024)

```bashh
 FAIL  src/handler.test.ts
  ● Test suite failed to run

    src/handler.test.ts:7:20 - error TS2304: Cannot find name 'handler'.

    7     const result = handler();
                         ~~~~~~~

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.342 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

Let's import our handler and press save and woo! Our test has passed!

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.24.45.png?w=1024)

Now, let's make our simple handler, an actual piece of code that can run in AWS.

For that we are going to need

- aws-sdk
- serverless

```bash
➜  local-aws-testing git:(master) ya aws-sdk serverless @types/aws-lambda --dev
```

A lambda function, has an event and a context, let's update our handler to have two parameters, and use the `aws-lambda` types to help us along a bit

```typescript
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

export const handler = (
  event: APIGatewayProxyEventV2,
  context: Context
): APIGatewayProxyResultV2 => {
  return "hello world";
};
```

Lets update our test to pass in two parameters

```typescript
import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { handler } from "./handler";

describe("Hello world handler", () => {
  it("should return hello world", () => {
    // arrange
    const mockEvent = {} as APIGatewayProxyEventV2;
    const mockContext = {} as Context;
    const expectedResult = "hello world";

    // act
    const result = handler(mockEvent, mockContext);

    // assert
    expect(result).toEqual(expectedResult);
  });
});
```

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.44.30.png?w=1024)

It's passing! Woohoo. Let's get that commited.

```bash
➜  local-aws-testing git:(master) ✗ git add .
Alias tip: ga .
➜  local-aws-testing git:(master) ✗ git commit -m  'if it looks like a lambda, it must be a lambda?'
Alias tip: gcmsg  'if it looks like a lambda, it must be a lambda?'
[master a029d89] if it looks like a lambda, it must be a lambda?
 4 files changed, 3496 insertions(+), 57 deletions(-)
```

Let's initiate a serverless project, to allow us to package up our lambda function so that it could be deployed to AWS.

```bash
➜  local-aws-testing git:(master) ✗ serverless create --template aws-nodejs
Serverless: Generating boilerplate...
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.79.0
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
Serverless: NOTE: Please update the "service" property in serverless.yml with your service name


   ╭───────────────────────────────────────╮
   │                                       │
   │   Update available 1.79.0 → 2.32.1    │
   │   Run npm i -g serverless to update   │
   │                                       │
   ╰───────────────────────────────────────╯

➜  local-aws-testing git:(master) ✗
```

Serverless will create us 3 files

- `handler.js` - We can delete this as we have created our own
- `serverless.yml` - Where our lambda function is defined, for creation in AWS.

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-21.53.38.png?w=543)

Once we have removed the boilerplate information, our pared down `serverless.yml` now looks like

```yml
service: local-aws-testing

provider:
  name: aws
  runtime: nodejs12.x

functions:
  hello:
    handler: src/handler.handler
    events:
      - http:
          path: /{path+}
          method: ANY
```

We are creating a function with path to our source code, and attaching an API Gateway event, which will use a greedy path matcher, to pass any request on any path to our lambda.

So if my code got deployed to http://mycodeishere.com/

And you visited /hello /world /helloworld they should all return `hello world`

We could deploy this to AWS now, but three things will happen.

- We don't know really know if it will work, bar our test above.
- It definitely won't work, as we need to compile our typescript to javascript!

Lets sort our the compiling point.

In our `tsconfig.json` lets specify a

- a `rootDir` where our source code lives
- an `outDir` where our compiled code will live.

```json
  "compilerOptions": {
    "rootDir": "src",
    "outDir": ".build",
    "target": "es5",
    "module": "commonjs",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

and lets update our package.json file to have a build command. `"build": "tsc"`

```json
{
  "name": "local-aws-testing",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "init": "tsc --init",
    "test": "jest",
    "build": "tsc"
  },
  "author": "YOU54F",
  "license": "ISC",
  "devDependencies": {
    "@types/aws-lambda": "^8.10.73",
    "@types/jest": "^26.0.22",
    "aws-sdk": "^2.877.0",
    "jest": "^26.6.3",
    "serverless": "^2.32.1",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}
```

and lets run it

```bash
➜  local-aws-testing git:(master) ✗ yarn run build
$ tsc
✨  Done in 1.37s.
```

We can update our function code in `serverless.yml` to point to the compiled folder `bin`

```yml
functions:
  hello:
    handler: src/handler.handler
```

to

```yml
functions:
  hello:
    handler: bin/handler.handler
```

But instead we are going to use some serverless-plugins to help us along the way

- [serverless-plugin-typescript](https://www.serverless.com/plugins/serverless-plugin-typescript) - Serverless plugin for zero-config Typescript support
- [serverless-offline](https://github.com/dherault/serverless-offline) - This [Serverless](https://github.com/serverless/serverless) plugin emulates [AWS λ](https://aws.amazon.com/lambda) and [API Gateway](https://aws.amazon.com/api-gateway) on your local machine to speed up your development cycles. To do so, it starts an HTTP server that handles the request's lifecycle like APIG does and invokes your handlers.

```yml
service: local-aws-testing

provider:
  name: aws
  runtime: nodejs12.x

functions:
  hello:
    handler: src/handler.handler

plugins:
  - serverless-plugin-typescript
  - serverless-offline
```

And lets make sure they are installed.

```bash
➜  local-aws-testing git:(master) ✗ yarn add serverless-offline serverless-plugin-typescript --save-dev
```

and add this entry to your package.json in the `scripts` section.

```bash
"start:offline": "sls offline start"
```

which we can now run

```bash
➜  local-aws-testing git:(master) ✗ yrun start:offline
yarn run v1.22.4
$ sls offline start
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Warning: "rootDir" from local tsconfig.json is overriden
Serverless: Typescript compiled.
Serverless: Watching typescript files...
offline: Starting Offline: dev/us-east-1.
offline: Offline [http for lambda] listening on http://localhost:3002
offline: Function names exposed for local invocation by aws-sdk:
           * hello: local-aws-testing-dev-hello

   ┌─────────────────────────────────────────────────────────────────────────┐
   │                                                                         │
   │   ANY | http://localhost:3000/dev/{path*}                               │
   │   POST | http://localhost:3000/2015-03-31/functions/hello/invocations   │
   │                                                                         │
   └─────────────────────────────────────────────────────────────────────────┘

offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request
```

Woo! So serverless-offline, is mocking the AWS environment, and providing us an endpoint that we can hit for our hello world lambda.

On the right hand side, we can see us hitting the endpoint with  
`curl -v http://127.0.0.1:3000/dev/hello`

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-22.38.26.png?w=1024)

Spoiler alert:- It never actually returns! We need to return a promise! So lets update out code, and see serverless-offline & serverless-plugin-typescript work in harmony for local development and testing, with hot-reloading.

Let's add the `async` modifier to the function and change the return type to return a promise. `Promise<APIGatewayProxyEventV2>`

```typescript
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  return "hello world";
};
```

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-22.42.10.png?w=1024)

We can now see `hello world` returned to our client!

If we run our tests again, they fail, as our function is now async, but we just need to await it and add `async` to the containing function

```typescript
import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { handler } from "./handler";

describe("Hello world handler", () => {
  it("should return hello world", async () => {
    // arrange
    const mockEvent = {} as APIGatewayProxyEventV2;
    const mockContext = {} as Context;
    const expectedResult = "hello world";

    // act
    const result = await handler(mockEvent, mockContext);

    // assert
    expect(result).toEqual(expectedResult);
  });
});
```

```bash
 PASS  src/handler.test.ts
  Hello world handler
    ✓ should return hello world (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.9 s, estimated 2 s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Let's commit our changes so far! run `git status` to check what we have

```bash
➜  local-aws-testing git:(master) ✗ git status
Alias tip: g st
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   package.json
        modified:   src/handler.test.ts
        modified:   src/handler.ts
        modified:   tsconfig.json
        modified:   yarn.lock

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .build/
        serverless.yml

no changes added to commit (use "git add" and/or "git commit -a")
```

`.build` is our compiled javascript, which we don't want to commit to source control, so lets update our `.gitignore` file.

```bash
# package directories
node_modules
jspm_packages

# Serverless directories
.serverless

# Build files
.build
```

```bash
➜  local-aws-testing git:(master) ✗ gcmsg 'serverless config - serverless-offline/serverless-plugin-typescript'
[master 745b338] serverless config - serverless-offline/serverless-plugin-typescript
 7 files changed, 1073 insertions(+), 96 deletions(-)
 create mode 100644 serverless.yml
 rewrite tsconfig.json (99%)
```

So our lambda failed if it wasn't async, and we can run our lambda code offline, with serverless offline, so lets add an integration test, that we can run against a serverless-offline.

In order to create an integration test, our test is going to look very similar, although we are going to need a couple of things

- a HTTP client library to make a HTTP request to our deployed endpoint. We are going to use `axios`
- An integration test file
- Some configuration to setup the integration test

Lets add axios

```bash
➜  local-aws-testing git:(master) yarn add axios --dev
```

We are going to add three entries

We are going to create a `jest.it.config.js` file to target test files that end in `it.ts`

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  test,
  testMatch: ["**/*.it.(ts)"],
};
```

A couple of new script entries in our package.json

- test - to run the unit tests and integration tests
- test:unit - to run just the unit tests
- test:it - to run the integration tests.

```json
  "scripts": {
    "init": "tsc --init",
    "test": "npm run test:unit && npm run test:it",
    "test:unit": "jest",
    "test:it": "jest --config jest.it.config.js",
    "build": "tsc",
    "start:offline": "sls offline start"
  }
```

We can now right our integration test.

It looks almost the same as out previous test, which was calling the handler function directly. This test will use axios to make the request, like a users browser would.

```typescript
import axios from "axios";

describe("Hello world handler integration test", () => {
  it("should return hello world", async () => {
    // arrange
    const sutUrl = "http://127.0.0.1:3000/dev/hello";
    const expectedResult = "hello world";

    // act
    const response = await axios.get(sutUrl);

    // assert
    expect(response.data).toEqual(expectedResult);
    expect(response.status).toEqual(200);
  });
});
```

Now if we run our integration test with `yarn run test:it` it will fail (assuming you don't still have serverless-offline running)

```bash
➜  local-aws-testing git:(master) ✗ yrun test:it
yarn run v1.22.4
$ jest --config jest.it.config.js
 FAIL  src/handler.it.ts
  Hello world handler integration test
    ✕ should return hello world (15 ms)

  ● Hello world handler integration test › should return hello world

    connect ECONNREFUSED 127.0.0.1:3000



Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.883 s, estimated 2 s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-23.10.34.png?w=1024)

So lets start up our app with `yarn run start:offline` and run our test again

![](https://you54f.files.wordpress.com/2021/03/screenshot-2021-03-31-at-23.13.52.png?w=1024)

So great! Lets recap on what we have covered so far.

- Scaffolding a basic lambda handler

  - Initialising a git repository
  - Initialising an npm project

  - Initialising an serverless project
  - Initialising a typescript repository

  - Initialising a testing framework tool
  - Created our first failing unit test
  - Created our initial handler
  - Made our failing test pass
  - Setup serverless-offline to emulate aws offline
  - Found our first integration bug
  - Wrote out first integration test to cover it

Phew! That was more than I thought.

Next time we will be

- Using docker to run our unit and integration tests

If you do have AWS credentials setup, you can add the command `"deploy": "sls deploy"` into your scripts section of your package.json and deploy it to AWS!

```bash
➜  local-aws-testing git:(deploy) ✗ yarn deploy
$ sls deploy
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Warning: "rootDir" from local tsconfig.json is overriden
Serverless: Typescript compiled.
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service local-aws-testing.zip file to S3 (65.65 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: local-aws-testing
stage: dev
region: us-east-1
stack: local-aws-testing-dev
resources: 11
api keys:
  None
endpoints:
  ANY - https://ag2cvjr9r4.execute-api.us-east-1.amazonaws.com/dev/{path+}
functions:
  hello: local-aws-testing-dev-hello
layers:
  None

**************************************************************************************************************************************
Serverless: Announcing Metrics, CI/CD, Secrets and more built into Serverless Framework. Run "serverless login" to activate for free..
**************************************************************************************************************************************

✨  Done in 262.99s.
```

we can invoke our function now from the command line

```bash
➜  local-aws-testing git:(deploy) ✗ sls invoke -f hello
"hello world"
```

And we can use our URL that was output in the console to visiit our website, but oh no!

![](https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-01-at-22.38.51.png?w=1024)

We can get some more information from the API log screen

![](https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-02-at-01.11.29.png?w=1024)

```bash
Thu Apr 01 21:58:32 UTC 2021 : Sending request to https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:525422853402:function:local-aws-testing-dev-hello/invocations
Thu Apr 01 21:58:32 UTC 2021 : Received response. Status: 200, Integration latency: 20 ms
Thu Apr 01 21:58:32 UTC 2021 : Endpoint response headers: {Date=Thu, 01 Apr 2021 21:58:32 GMT, Content-Type=application/json, Content-Length=13, Connection=keep-alive, x-amzn-RequestId=035eb943-58c9-451e-aa94-7fc3a11fb91f, x-amzn-Remapped-Content-Length=0, X-Amz-Executed-Version=$LATEST, X-Amzn-Trace-Id=root=1-60664208-52c510e19934133a3c7f7dcc;sampled=0}
Thu Apr 01 21:58:32 UTC 2021 : Endpoint response body before transformations: "hello world"
Thu Apr 01 21:58:32 UTC 2021 : Execution failed due to configuration error: Malformed Lambda proxy response
Thu Apr 01 21:58:32 UTC 2021 : Method completed with status: 502
```

So in order to get API Gateway, we need to update our response. see [here](https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/)

```typescript
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  return {
    body: "hello world",
    statusCode: 200,
    headers: { "Content-Type:": "text/html" },
  };
};
```

![](https://you54f.files.wordpress.com/2021/04/screenshot-2021-04-02-at-01.09.11.png?w=1024)
