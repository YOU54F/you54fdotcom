---
title: "Cypress Edge - Now available for Windows"
date: "2019-10-25"
---

![](https://you54f.files.wordpress.com/2019/10/3edjyv.jpg?w=622)

## Supported versions

- Microsoft Edge for Windows 10 (Canary Build)
- Microsoft Edge for Windows 10 (Dev Build)
- Microsoft Edge for Windows 10 (Beta Build)

## Instructions for Windows

1. Download Microsoft Edge version of choice from https://www.microsoftedgeinsider.com/en-us/
2. Make a new directory
3. Run `set CYPRESS_INSTALL_BINARY=https://github.com/YOU54F/cypress/releases/download/v3.5.0/cypress_win.zip`
4. Run `npm init`
5. Run `npm install @you54f/cypress --save`
6. Run `node_modules/.bin/cypress open --browser edgeDev` to open in interactive mode, and setup [Cypress.io](https://cypress.io)'s example project
7. Run `node_modules/.bin/cypress run --browser edgeDev` or `node_modules/.bin/cypress run --browser edgeCanary` to run in command line mode.
8. Rejoice & please pass back some appreciation with a star on the [repository](https://github.com/YOU54F/cypress-edge)! Thanks :)
