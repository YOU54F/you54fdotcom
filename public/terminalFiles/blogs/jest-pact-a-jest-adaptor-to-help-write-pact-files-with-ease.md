---
title: "Jest-Pact - A Jest-adaptor to help write Pact files with ease"
date: "2019-09-23"
---

In previous posts, I have spoken about [Pact.io](https://docs.pact.io/index). A wonderful set of tools, designed to help you and your team develop smarter, with consumer-driven contract tests.

We use [Jest](https://jestjs.io/) at work to test our TypeScript code, so it made sense to use Jest as our testing framework, to write our Pact unit tests with.

The Jest [example](https://github.com/pact-foundation/pact-js/tree/master/examples/jest) on [Pact-JS](https://github.com/pact-foundation/pact-js), involve a-lot of setup, which resulted in a fair bit of cognitive-load before a developer could start writing their Contract tests.

Inspired by a [post](https://github.com/pact-foundation/pact-js/issues/215#issuecomment-437237669) by Tim Jones, one of the maintainers of [Pact-JS](https://github.com/pact-foundation/pact-js) and a member of the [Dius](https://www.dius.com.au) team who built PACT, I decided to build and release an adapter for Jest, which would abstract the pact setup away from the developer, leaving them to concentrate on the tests.

### Features

-  instantiates the PactOptions for you
-  Setups Pact mock service before and after hooks so you don’t have to
-  Assign random ports and pass port back to user so we can run in parallel without port clashes

## Adapter Installation

npm i jest-pact --save-dev

OR

yarn add jest-pact --dev

## [](https://github.com/YOU54F/jest-pact#usage)Usage

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
    _// regular pact tests go here_
}

## [](https://github.com/YOU54F/jest-pact#example)Example

Say that your API layer looks something like this:

import axios from 'axios';

const defaultBaseUrl = "http://your-api.example.com"

export const api = (baseUrl = defaultBaseUrl) => ({
     getHealth: () => axios.get(\`${baseUrl}/health\`)
                    .then(response => response.data.status)
    _/\* other endpoints here \*/_
})

Then your test might look like:

import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import api from 'yourCode';

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
  let client;
  
  beforeEach(() => {
    client = api(provider.mockService.baseUrl)
  });

  describe('health endpoint', () => {
    _// Here we set up the interaction that the Pact_
    _// mock provider will expect._
    _//_
    _// jest-pact takes care of validating and tearing_ 
    _// down the provider for you._ 
    beforeEach(() =>
      provider.addInteraction({
        state: "Server is healthy",
        uponReceiving: 'A request for API health',
        willRespondWith: {
          status: 200,
          body: {
            status: Matchers.like('up'),
          },
        },
        withRequest: {
          method: 'GET',
          path: '/health',
        },
      })
    );
    
    _// You also test that the API returns the correct_ 
    _// response to the data layer._ 
    _//_
    _// Although Pact will ensure that the provider_
    _// returned the expected object, you need to test that_
    _// your code recieves the right object._
    _//_
    _// This is often the same as the object that was_ 
    _// in the network response, but (as illustrated_ 
    _// here) not always._
    it('returns server health', () =>
      client.health().then(health => {
        expect(health).toEqual('up');
      }));
  });

You can make your tests easier to read by extracting your request and responses:

_/\* pact.fixtures.js \*/_
import { Matchers } from '@pact-foundation/pact';

export const healthRequest = {
  uponReceiving: 'A request for API health',
  withRequest: {
    method: 'GET',
    path: '/health',
  },
};

export const healthyResponse = {
  status: 200,
  body: {
    status: Matchers.like('up'),
  },
} 

import { pactWith } from 'jest-pact';
import { healthRequest, healthyResponse } from "./pact.fixtures";

import api from 'yourCode';

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
  let client;
  
  beforeEach(() => {
    client = api(provider.mockService.baseUrl)
  });

  describe('health endpoint', () => {

    beforeEach(() =>
      provider.addInteraction({
        state: "Server is healthy",
        ...healthRequest,
        willRespondWith: healthyResponse
      })
    );
    
    it('returns server health', () =>
      client.health().then(health => {
        expect(health).toEqual('up');
      }));
  });

## [](https://github.com/YOU54F/jest-pact#configuration)Configuration

pactWith(PactOptions, provider => {
    _// regular pact tests go here_
}

interface PactOptions {
  provider: string;
  consumer: string;
  port?: number; _// defaults to a random port if not provided_
  pactfileWriteMode?: PactFileWriteMode;
  dir? string _// defaults to pact/pacts if not provided_
}

type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
type PactFileWriteMode = "overwrite" | "update" | "merge";

## [](https://github.com/YOU54F/jest-pact#defaults)Defaults

- Log files are written to /pact/logs
- Pact files are written to /pact/pacts

### [](https://github.com/YOU54F/jest-pact#jest-watch-mode)Jest Watch Mode

By default Jest will watch all your files for changes, which means it will run in an infinite loop as your pact tests will generate json pact files and log files.

You can get round this by using the following `watchPathIgnorePatterns: ["pact/logs/*","pact/pacts/*"]` in your `jest.config.js`

Example

module.exports = {
  testMatch: \["\*\*/\*.test.(ts|js)", "\*\*/\*.it.(ts|js)", "\*\*/\*.pacttest.(ts|js)"\],
  watchPathIgnorePatterns: \["pact/logs/\*", "pact/pacts/\*"\]
};

You can now run your tests with `jest --watch` and when you change a pact file, or your source code, your pact tests will run

### [](https://github.com/YOU54F/jest-pact#examples-of-usage-of-jest-pact)Examples of usage of `jest-pact`

See [Jest-Pact-Typescript](https://github.com/YOU54F/jest-pact-typescript) which showcases a full consumer workflow written in Typescript with Jest, using this adaptor

-  Example pact tests
    -  AWS v4 Signed API Gateway Provider
    -  Soap API provider
    -  File upload API provider
    -  JSON API provider

#### [](https://github.com/YOU54F/jest-pact#examples-installation)Examples Installation

- clone repository `git@github.com:YOU54F/jest-pact-typescript.git`
- Run `yarn install`
- Run `yarn run pact-test`

Generated pacts will be output in `pact/pacts` Log files will be output in `pact/logs`

## [](https://github.com/YOU54F/jest-pact#credits)Credits

- [Pact Foundation](https://github.com/pact-foundation)
- [Pact JS](https://github.com/pact-foundation/pact-js)
- [Initial Proposal](https://github.com/pact-foundation/pact-js/issues/215#issuecomment-437237669) by [TimothyJones](https://github.com/TimothyJones)
