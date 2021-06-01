---
title: "The new Chromium-based Microsoft Edge for Mac has been leaked — And it works with Cypress."
date: "2019-05-14"
---

So I’ve been using [Cypress](https://www.cypress.io/) for a while now to test our apps, it’s an incredible testing tool, with many features developers will feel at home with and providing incredibly fast and detailed feedback which remote-browser tools cannot compete with.

However there has been a bone of contention for some. The lack of cross-browser compatibility. For now, it will only work with Chrome and Electron.

Yep, no IE10/11, Firefox, Safari, Opera etc.

Best not delete your favourite Selenium based tool just yet.

However there is some light on the horizon, and from the likes of Microsoft no less.

Rumours floated around late last year that Microsoft were ditching efforts on their budding IE11 replacement Edge, with well, Edge. Just based on Chromium this time. You can get it for Windows 10 [here](https://www.microsoftedgeinsider.com/en-us/) from Windows Insiders.

If you visit the above page on a MacOS, you’ll see a button asking you to be notified, however Twitter user [WalkingCat](https://twitter.com/h0x0d) posted up links from Microsoft’s CDN.

[Microsoft Edge for Mac (Canary Build)](https://officecdn.microsoft.com/pr/C1297A47-86C4-4C1F-97FA-950631F94777/MacAutoupdate/MicrosoftEdgeCanary-76.0.151.0.pkg)

[Microsoft Edge for Mac (Dev Build)](https://officecdn.microsoft.com/pr/C1297A47-86C4-4C1F-97FA-950631F94777/MacAutoupdate/MicrosoftEdgeDev-76.0.151.0.pkg)

So I thought I would spin up Cypress and see if I could get it to work with Edge but it choked on the folder name.

![](https://you54f.files.wordpress.com/2019/05/61fcc-1pohc96gmjv6ugcv-g74dtg.png)

Hmmm, lets rename the app so it doesn’t have spaces in it.

![](https://you54f.files.wordpress.com/2019/05/08938-1c-0n891f__g3na-q4-nika.png)

So we need to tell Cypress about Edge

![](https://you54f.files.wordpress.com/2019/05/88722-1t3gf1auk1urbdqh0xwwwoq.png)

Its listed now, good start

![](https://you54f.files.wordpress.com/2019/05/5a5d9-1nmw7rof5t0qbcm5syrylyq.png)

Lets fire up Cypress runner in GUI mode

![](https://you54f.files.wordpress.com/2019/05/8cff8-1sj-nwc8cat5in7tgwkzugg.png)

Result!!!

![](https://you54f.files.wordpress.com/2019/05/ccb6e-1pfy4ejjvdwnporxe7_wgza.png)

Let’s run all the integration tests.

![](https://you54f.files.wordpress.com/2019/05/d3d5d-1ab6sjcin1lxc1h_vnnimxq.png)

As if they all passed first time. How about the CLI?

![](https://you54f.files.wordpress.com/2019/05/6c83b-1deju2e9_r5tyz6pm0utkzg.png)

![](https://you54f.files.wordpress.com/2019/05/a0d3e-1uq85n2ff8z4d5muqjykneg.png)

Sweet! Not bad for a first run! Now we just need to wait for Microsoft to release Chromium Edge to the masses. Hopefully a linux flavour will be on the horizon, I will keep you posted if so!

Follow the PR to track Cypress & Microsoft Edge - [https://github.com/cypress-io/cypress/pull/4203](https://github.com/cypress-io/cypress/pull/4203)

Thats all folks, thanks for reading, and feel free to follow me @ [https://github.com/YOU54F](https://github.com/YOU54F) for more of my fumblings in code.

Update :- I’ve now followed up this with another blog post where I have published a beta version of Cypress with Edge support for testing purposes. See [here](https://blog.you54f.com/2019/05/16/the-new-chromium-based-microsoft-edge-for-mac-has-been-leaked%e2%80%8a-%e2%80%8aand-it-works-with-cypress-and-now-you-can-test-it-too/) for the blog post with a link to an example GitHub repo and installation instructions!
