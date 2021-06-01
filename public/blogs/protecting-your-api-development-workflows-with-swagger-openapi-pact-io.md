---
title: "Protecting your API development workflows with Swagger/OpenAPI & Pact.io"
date: "2019-02-19"
---

Reading Time:- Get a cup of tea and pull up a beanbag, I'm going to say 15 minutes

**Background**

API's (Application Programming Interfaces) have been around since 2000. I remember utilising my first one back at Uni, based in Java to modify a Lego Mindstorms NXT robotics kit to run an Artificial-Neural Network.

I dropped into the world of micro-services 5 years ago, along with a team of great engineers helping to define a service blueprint that could be used as a framework for new service providers.

I took this new found knowledge onto my next employer, who were setting up a new micro-service architecture to serve a web front-end, whilst communicating to a legacy backend through an abstraction layer, which was just another API.

We employed consumer-driven contract testing but with little collaboration from dependencies, we ended with CDC tests solely maintained by consumers which only served to protect us from changes of which we had little visibility, but it works better in collaboration and offers more benefits, than hinderances.

The aim of this article is to provide you with some tools and techniques to aid and promote collaboration with your API development workflows in order to increase the quality of your product. (After all, I am a Software Tester!)

- Using Swagger to document your API

- I am a big advocate of using hand-crafted Swagger definitions of each service as one of the first outputs of our developement.

Why?

- You are possibly in an Agile world and you want to start rapid prototyping.
- Documentation is lean - Everyone has probably laughed at you when you suggest that we write the specifications for the API right off the bat rather than 100 discussions that always have little output (see next point), let's make it cheap and easy to change so it's not as onerous.
- Getting multiple teams together is difficult and often non-productive - your team and the teams you integrate with don't want to sit in long meetings about boring things like what data-type a field should be.
- Contracts are key - If we can agree what the request/response will look like, we don't care about the underlying implementation, as long as it honours them. It also doesn't mean they are set in stone, as a fixed artefact. They can change as the project develops. It also makes testers happy, as we can plan for integration testing early.
- Swagger is cheap to write, anyone can do it, for free. - https://editor.swagger.io/

So your team want's to start writing code and the provider hasn't come up with an API contract yet? ( They are probably in long boring data-field style meetings ).

Fine. Let's document the API we want to see with [https://editor.swagger.io/](https://editor.swagger.io/) and save the JSON or YAML version to your machine, stick it in version control and give your provider access. Swagger will provide validation and auto-completion as you type to ensure that the swagger you have written, can be developed. ( A big bonus, I can assure you! )

They are chuffed now as they have a view as to what one of their consumers' wants, documented in a validated specification. They can make changes as necessary, and via a pull requests, collaboratively develop the specification, and ensure that everyone is in the loop. This collaboration relationship is great to build up, as it will help us immensely in testing our services can integrate together.

So now we have our API, defined in swagger. Either written by us, our provider, or collaboratively. Whichever way you've got it, don't trust it. Even though the Swagger editor provides validation whilst writing it, you can save the file with errors. Now I know _you_ won't do that, but someone else might. Don't worry, we got it.

`npm install --global swagger-cli`

`swagger-cli validate /path/to/swagger.json`

Hopefully this will report no errors, but if it does, it will tell you what needs resolving. If you add this into your CI process, when someone checks in a change to the specifications, you can catch it on a pull-request, ensuring that anyone working from the specification in master, has a valid copy.

**Consumer Driven Contract testing with Pact**

Now we have an API specification, we can start developing our application however there are a couple of things we want to consider.

- What happens if our provider isn't ready for several months - how can we integration test it?

We can use the notion of CDC testing, also known as consumer driven contract testing, although I prefer the term collaborative driven contract testing. The former almost implies the consumer has free-reign to drive their own requirements, however it requires agreements from both parties, and participation, hence collaboration.

To perform our contract testing, we will use Pact.io (https://pact.io)

> **Pact** (noun):
>
> A formal agreement between individuals or parties.
>
> Synonyms: agreement, protocol, deal, contract

Pacts are synonymous with API design, but how often do these get broken.

We might find that after developing our consumer or provider in isolation, when we come to integrate the systems in a test environment, that expectations are not being met, resulting in systems failing to communicate.

We can use Pact and its toolset, to enable us to generate contracts (pairs of request/responses) saved as a JSON file to use for component integration testing, in complete isolation from a service dependency whilst publishing these contracts to a central broker which can be queried at a later date by when the service is available.

![](https://you54f.files.wordpress.com/2019/02/image.png)

Utilising Pact in a consumer development flow

1. Using the Pact DSL, the expected request and response are registered with the mock service.
2. The consumer test code fires a real request to a mock provider (created by the Pact framework).
3. The mock provider compares the actual request with the expected request, and emits the expected response if the comparison is correct.
4. The consumer test code confirms that the response was correctly understood
5. Tests pass!
6. Results published to a broker as a JSON file
7. Results are tagged with a branch tag for later querying

**Always read the manual**

In the above example, after the tests pass (step 5), we publish the results to the broker. This presents a problem, thankfully an avoidable one. We might find that the PACT contract tests have drifted from the Swagger specification. It may be that a required field is missing from the request, or the tests expected an array, but the swagger specification defined it as a string.

`npm install -g swagger-mock-validator`

`swagger-mock-validator path/to/swagger.yml path/to/pact.json`

This tool will tell us where that drift occurs, and you can fail your CI step, correct any errors and then re-run your CI build, ensuring that you publish post successful specification validation.

This gives us a high level of confidence, that as long as our provider sticks to the swagger specification, we should be in a good position come pact validation when our provider has their first build. We will talk about their part of the PACT testing pipeline shortly.

**Fake it till you make it with Pact & Swagger Tools**

So I know, trying to get your developers to write more unit tests, might seem like a hard sell, but what if we could re-use those interactions we had generated in a previous test to drive our higher level component integration & UI tests.

To help reduce the number of interactions that need verifying, you will want to use flexible matching on both requests and responses. ([https://github.com/pact-foundation/pact-js#matching](https://github.com/pact-foundation/pact-js#matching))

The mock service, is part of PACT's ruby standalone package - [https://github.com/pact-foundation/pact-mock_service](https://github.com/pact-foundation/pact-mock_service)

```bash
Usage:
  pact-stub-service PACT_URI ...
```

We create a docker image containing the standalone executable and copy in the consumer-provider JSON contract, for each service we need to mock. We can then run these locally, but CI will publish these to AWS in order to perform e2e tests, whilst we await our providers first build.

So we are now using our PACT contracts, that we generated, to perform our component integration and e2e testing, with mocks. Everything is green on your dashboard. It looks great right, time to relax.

**Provider validation process with PACT**

![](https://you54f.files.wordpress.com/2019/02/image-1.png)

Utilising Pact in a provider development flow

1. The provider retrieves its clients pacts from the broker
2. Each request is sent to the provider, and the actual response it generates is compared with the minimal expected response described in the consumer test
3. Provider verification passes if each request generates a response, that contains at least, the data described in the minimal expected result
4. Tests passed and results published to the broker

**Using the PACT broker to protect deployments**

Each application version should be tagged in the broker with the name of the stage (eg. test, staging, production) as it is deployed.

This enables you to use the following very simple command to check if the application version you are about to deploy is compatible with every other application version already deployed in that environment

```bash
$ pact-broker can-i-deploy --pacticipant PACTICIPANT --version VERSION --to TAG --broker-base-url BROKER_BASE_URL
```

**Take home points**

- Write your API specifications in Swagger
- Store them in version control and give access to any providers/consumers for collaboration
- Validate the swagger specifications are correct with swagger-cli
- Write pact tests in a unit-testing framework of your choice, using one of the many different language implementations of Pact. (We use pact-js & Jest, written in TypeScript)
- Run the tests during CI to generate the contract
- Validate the generated pact contract against the swagger specification during CI
- If it passes, publish the pact contract to the pact broker, tag it with the branch name.
- If it is part of a development/staging/production additionally tag it with an identifier
- Consumers can generate mock providers from the pact contract to use in integration / UI / e2e testing
- Providers can read from the pact broker and test that they meet consumer expectations, as pact will mock the clients requests specified in the contracts.
- All participants can use the can-i-deploy tool at CI time, to check if its compatible with other consumer/providers in a specific environment.

**For a later blog post**

- Follow up from this blog post, with real code based examples on a Github repository you can clone, fork and play with for real.
- How pact can help you avoid supporting multiple versions of API's and deprecate features/endpoints gracefully .
- Validating your developed service against your hand-crafted swagger specification that your tester won't stop banging on about.
