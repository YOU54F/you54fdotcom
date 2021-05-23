---
title: "The new Chromium-based Microsoft Edge for Mac has been leaked — And it works with Cypress, and now you can test it too!"
date: "2019-05-16"
---

Following on from my previous blog post [here](https://blog.you54f.com/2019/05/15/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked%e2%80%8a-%e2%80%8aand-it-works-with-cypress/) about getting Cypress working with Microsoft Edge, I have released versions that you can test out yourself :)

An example repository here:- [https://github.com/YOU54F/cypress-edge](https://github.com/YOU54F/cypress-edge)

1. Download Microsoft Edge for Mac (Canary Build) for MacOS [here](https://officecdn.microsoft.com/pr/C1297A47-86C4-4C1F-97FA-950631F94777/MacAutoupdate/MicrosoftEdgeCanary-76.0.151.0.pkg)
2. Make a new directory
3. Run `export CYPRESS_INSTALL_BINARY=https://github.com/YOU54F/cypress/releases/download/v3.2.0-edge.1/cypress-3.2.0-edge.1.zip`
4. Run `npm init`
5. Run `npm install @you54f/cypress --save`
6. Run `node_modules/.bin/cypress open --browser edge` to open in interactive mode, and setup [Cypress.io](https://cypress.io/)'s example project
7. Run `node_modules/.bin/cypress run --browser edge` to run in command line mode.
8. Rejoice & please pass back some appreciation with a star on the repository! Thanks :)
