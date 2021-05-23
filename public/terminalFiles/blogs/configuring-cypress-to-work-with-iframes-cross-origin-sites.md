---
title: "Configuring Cypress to work with iFrames & cross-origin sites."
date: "2019-09-23"
---

Currently working Browsers & Modes

- Chrome Headed
  - Cypress UI
  - Cypress CLI

There are a considerations for automating your web application with Cypress, that you may come across, which may lead you to the [Cypress Web Security Docs](https://docs.cypress.io/guides/guides/web-security.html) or trawling through Cypress raised issues for potential workarounds/solutions.

Problems you may encounter

- [One superdomain per test](https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test)
- [Form Submission Redirects](https://docs.cypress.io/guides/guides/web-security.html#Form-Submission-Redirects)
- [JavaScript-Redirects](https://docs.cypress.io/guides/guides/web-security.html#JavaScript-Redirects)

[Cypress Docs - disabling web security](https://docs.cypress.io/guides/guides/web-security.html#Disabling-Web-Security)

- Display insecure content
- Navigate to any superdomain without cross origin errors
- Access cross origin iframes that are embedded in your application.

Simply by setting `chromeWebSecurity` to false in your `cypress.json`

```
{
"chromeWebSecurity": false
}
```

If you set it in your base `cypress.json`, then you will apply this to all your sites, which may not be ideal, as you may only want to cater for insecure content on your dev machine, but secure content, in testing in prod.

See [how to configure Cypress per env configuration files](https://docs.cypress.io/api/plugins/configuration-api.html#Usage)

However we wanted to check a journey that integrates with a 3rd party, and came across some cross site issues

Uncaught DOMException: Blocked a frame with origin "https://your_site_here" from accessing a cross-origin frame.

So we switch off `chromeWebSecurity: false` and then get this error

Refused to display 'https://your_site_here' in a frame because it set 'X-Frame-Options' to 'sameorigin'.

Looks like these guys had the same issue

[Cypress Issue #1763](https://github.com/cypress-io/cypress/issues/1763)

[Cypress Issue #944](https://github.com/cypress-io/cypress/issues/944)

So hi-ho, it's off to docs we go

[Chromium Site Isolation Docs](https://www.chromium.org/Home/chromium-security/site-isolation)

[chromium-command-line-switches](https://peter.sh/experiments/chromium-command-line-switches/)

We want to disable the following features

- `--disable-features=CrossSiteDocumentBlockingAlways,CrossSiteDocumentBlockingIfIsolating`
  - Cross-Origin Read Blocking (CORB) blocked cross-origin response https://www.example.com/example.html with MIME type text/html.
- `-disable-features=IsolateOrigins,site-per-process`
  - IsolateOrigins- Require dedicated processes for a set of origins, specified as a comma-separated list.
  - site-per-process - Enforces a one-site-per-process security policy: *Each renderer process, for its whole lifetime, is dedicated to rendering pages for just one site.*  
     _\* Thus, pages from different sites are never in the same process._  
     _\* A renderer process's access rights are restricted based on its site._  
     *\* All cross-site navigations force process swaps.* `<iframe>s` are rendered out-of-process whenever the src= is cross-site.

So lets add the following to `cypress/plugins/index.js`

```
const path = require('path');

module.exports = (on, config) => {
on('before:browser:launch', (browser = {}, args) => {
console.log(config, browser, args);
if (browser.name === 'chrome') {
args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
}
return args;
});
};
```

We now want to drop the following headers to allow all pages to be i-framed.

- 'content-security-policy',
- 'x-frame-options

We can use [Ignore X-Frame headers chrome extension](https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe) and load it into our cypress instance, so we can download it from [https://chrome-extension-downloader.com/](https://chrome-extension-downloader.com/) and place is your `cypress/extensions` folder, or you can get the source code directly here [https://gist.github.com/dergachev/e216b25d9a144914eae2](https://gist.github.com/dergachev/e216b25d9a144914eae2), saving the files to `cypress/extensions/ignore-x-frame-headers`

add the following to `cypress/index.js`

```
const path = require('path');

module.exports = (on, config) => {
on('before:browser:launch', (browser = {}, args) => {
console.log(config, browser, args);
if (browser.name === 'chrome') {
const ignoreXFrameHeadersExtension = path.join(\_\_dirname, '../extensions/ignore-x-frame-headers');
args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
}
return args;
});
};
```

We can also automate the download of the extension for CI systems.

`npm i chrome-ext-downloader --save-dev` or `yarn add chrome-ext-downloader --dev`

put the following in `package.json`

```
{
"scripts": {
"download-extension": "ced gleekbfjekiniecknbkamfmkohkpodhe extensions/ignore-x-frame-headers"
},
"dependencies": {
"chrome-ext-downloader": "^1.0.4",
}
}
```

Our final `cypress/plugins/index.js` file incorporating both changes, will look like below

```
const path = require('path');

module.exports = (on, config) => {
on('before:browser:launch', (browser = {}, args) => {
console.log(config, browser, args);
if (browser.name === 'chrome') {
const ignoreXFrameHeadersExtension = path.join(\_\_dirname, '../extensions/ignore-x-frame-headers');
args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
}
return args;
});
};
```

Note:- Since writing this article, the extension has been deleted now from the google extension store, which although it still exists, it means it cannot be downloaded with [chrome-ext-downloader](https://www.npmjs.com/package/chrome-ext-downloader)

Source code can be found here :- [https://gist.github.com/dergachev/e216b25d9a144914eae2](https://gist.github.com/dergachev/e216b25d9a144914eae2)

Extension can still be downloaded from [https://www.crx4chrome.com/extensions/gleekbfjekiniecknbkamfmkohkpodhe/](https://www.crx4chrome.com/extensions/gleekbfjekiniecknbkamfmkohkpodhe/)

If there is enough demand, I will republish the source-code and publish to the chrome web store, with full credits to the original author.
