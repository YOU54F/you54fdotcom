---
title: "Cross-browser testing, without the browser."
date: "2019-03-03"
---

Reading time:- 10 mins

Follow along @ [https://github.com/YOU54F/react-ts-testing-example](https://github.com/YOU54F/react-ts-testing-example)

Consider the following statements that you might come across as a tester on a web app project.

- Must be compatible with latest browser versions
- Must be compatible with mobile

Pretty vague right? There are lots of browsers, and lots of versions. My definition of latest might be different to yours. Reminds me of this gem.  

![](https://you54f.files.wordpress.com/2019/02/treecomicbig.jpg?w=800)

A small list of of some of the top browsers, but there are plenty more.

- Safari
- Safari iOS
- Opera
- Internet Explorer
- Internet Explorer Mobile
- Edge
- Firefox
- Chrome

When they say mobile, that's a wide range to cover. They didn't even mention latest there. There are quite a few operating systems, and a multitude of versions, by dozens of manufacturers. The stakeholder could expect their dusty old iPad 1 & Windows 8 touchscreen tablet's to work.  

- Apple iOS
- Google Android.
- Windows Phone
- Palm OS
- Symbian OS

Let's see if we can help scope that requirement down a bit, to something a bit more manageable.

#### **Know Your Audience**

Some of the most popular sites for checking the worlds browser stat usage are  

[https://www.w3counter.com/globalstats.php](https://www.w3counter.com/globalstats.php)

[http://gs.statcounter.com/](http://gs.statcounter.com/)

Both are excellent for noticing trends in usage but if you base your testing strategy for cross-browser testing on this alone, you will find that you may be targeting the wrong market.  
  
Chrome's market-share dominance won't ring true in an office full of locked-down corporate boxes with Internet Explorer.  
  
If your company doesn't already have analytics which records site visitors, Insist that they do. It will be pivotal in ensuring your product will work, for the people who want to use it by providing tailored facts about what devices are in use for your particular product.  

#### **The challenges for web developers and testers alike**

With the advent of HTML5, SCSS, Javascript ES5 & 6 with their snazzy new tool-belts, many old browsers (and not so old) are left in the dust. A promise here, and object.assign there and before you know it, you've just stopped anyone accessing your website in IE11 and earlier versions.  
  
Oops.  
  
With so many browsers out there, and more importantly so many versions each supporting different feature-sets, it can be hard to keep track, and even harder to test.  

We could buy a load of real devices (logistical nightmare) or test in the cloud with a device provider such as BrowserStack / SauceLabs / TestingBot (pricey).

Both of those approaches, even if we use automation, give us slow feedback. What if we could test in 800+ browsers when our developers are writing their code. It is no substitute to UI testing, but augments our dev/testing process nicely.

We can give our developers a helping hand, and help mitigate risk as testers, so we don't have to have such a reliance of cross-browser testing via traditional methods.

#### **Can I use it? Yes, you can!**

Some great people have compiled maintained matrices of supported HTML/CSS & JavaScript features against browsers split by version. These sites should be bread-and-butter to your front end developers, but if not, please point them in the direction of them.

ECMAScript 5/6/7 compatibility tables

[http://kangax.github.io/compat-table](http://kangax.github.io/compat-table)

Browser support tables for modern web technologies - HTML5/CSS3

[https://caniuse.com](https://caniuse.com)

#### **Gotta catch 'em all, gotta catch them early.**

Software defects cost money. How much money usually depends on where it is found in the software life-cycle. An ambiguous requirement that could otherwise be firmed up into a set of agreed testable criteria before any code is written, may become something entirely different from what was envisioned, when unveiled.  
  
I said before, we aren't going to use any browsers for our testing, and although we want to test early, we can't test before any code is written, as the technique we are going to apply is static-analysis.

> **Static analysis**, also called **static code analysis**, is a method of computer program debugging that is done by examining the **code** without executing the program. The process provides an understanding of the **code** structure, and can help to ensure that the **code** adheres to industry standards.
> 
> Wikipedia

We can utilise some tools, to cross-reference our code against the compatibility databases, targeting only the browsers and versions we are interested in.  
  
Our developer can run these locally to keep them on track, and we can add these checks to our CI pipeline, to ensure that any new code is validated against these databases.  
  
So hopefully by now, we have compiled a list of browsers we want to support, either by analytics, or by discussion and agreement with your stakeholders.

We are going to use a tool called **browserslist** to define our list of browsers to our tools.

[https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)  

Add it into your project as a dev dependency

$ yarn add browserslist --dev   
or    
$ npm install browserslist --save-dev

Add browserslist config to your package.json

"browserslist": \[  
     ">0.2%",  
     "not dead",  
     "not ie <= 11",  
     "not op\_mini all"  
   \]

This command will list the currently targeted browsers in your project, based in your defined list above

$ npx browserslist

#### **CSS Checking with StyleLint**

**Stylelint-no-unsupported-browser-features** - This plugin checks if the CSS you're using is supported by the browsers you're targeting. It uses [doiuse](https://github.com/anandthakker/doiuse) to detect browser support.

[https://github.com/ismay/stylelint-no-unsupported-browser-features](https://github.com/ismay/stylelint-no-unsupported-browser-features)

Add it to your project (along with stylelint and the standard-config)

$ yarn add stylelint stylelint-config-standard stylelint-no-unsupported-browser-features --dev  
  
 or   
  
 $ npm install stylelint stylelint-config-standard stylelint-no-unsupported-browser-features --save-dev

Setup your stylelint config

$ touch .stylelintrc

{  
   "extends": "stylelint-config-standard",  
   "plugins": \[  
     "stylelint-no-unsupported-browser-features"  
   \],  
   "rules": {  
     "plugin/no-unsupported-browser-features": \[true, {  
       "severity": "warning"  
     }\]  
   }  
 }

Run it with

$ npx stylelint 

#### JavaScript Checking with esLint against caniuse db

**eslint-plugin-compat** - Lint the browser compatibility of your compiled JS code  

[https://github.com/amilajack/eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat)

Add it to your project

$ yarn add eslint-plugin-compat --dev  
 or   
$ npm install eslint-plugin-compat --save-dev

Add the eslint config to your package.json

"eslintConfig": {  
     "parser": "babel-eslint",  
     "plugins": \[  
       "compat"  
     \],  
     "rules": {  
       "compat/compat": "warn"  
     },  
     "settings": {  
       "polyfills": \[  
         ""  
       \]  
     }  
   }

Run it as follows

$ npx eslint 

#### **Javascript Checking against ECMAScript 5/6/7 compatibility tables** - 2 options

**Compat.js** - Static analysis tool for detecting browser compatibility issues in JavaScript and HTML.[](https://github.com/jgardella/compat#installation)

[https://github.com/jgardella/compat](https://github.com/jgardella/compat)

Add it to your project

$ yarn add compat-cli --dev  
or  
$ npm install compat-cli --save-dev

setup your config file but note this tool does not use the browserslist configuration, hence listed versions, replacing <path/to/js> to where your bundled javascript lives.

$ touch .compatrc.json

{  
   "target": "",  
   "ignoreFeatures": \["Object static methods"\],  
   "jsEnvs": \["ie11","chrome74",  
     "edge16","firefox67","safari12\_1",  
     "ios12","samsung8\_2"\]  
 }

Run compat test with options defined in above config

$ npx compat

Passing the supportedEnvs flag will show available browsers

$ npx compat --supportedEnvs

**Compat-CLI** - ECMAScript 5/6/7 [compatibility tables](https://github.com/kangax/compat-table) CLI  

[https://github.com/kamilogorek/compat-cli](https://github.com/kamilogorek/compat-cli)

Another CLI client that does the same as the above too, I haven't tried this yet.

#### So now we've found some issues? What can we do?

**Polyfill.io** \- A _polyfill_, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively. Flattening the API landscape if you will. The following website will list what polyfill's are required for a particular feature.

[https://polyfill.io/v3/](https://polyfill.io/v3/)

**Autofixer** \- [PostCSS](https://github.com/postcss/postcss) plugin to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/). It is [recommended](https://developers.google.com/web/tools/setup/setup-buildtools#dont_trip_up_with_vendor_prefixes) by Google and used in Twitter and Alibaba.

[https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)

**babel-preset-env** - a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

[https://babeljs.io/docs/en/next/babel-preset-env.html](https://babeljs.io/docs/en/next/babel-preset-env.html)

**Modernizr** - A JavaScript library that detects HTML5 and CSS3 features in the user’s browser

[https://modernizr.com/](https://modernizr.com/)

#### Ok, so I don't need to test on an actual browser, just mash polyfill into everything?

Not quite, trying to support every browser with lots of polyfills will leave you with a bloated web-app and no-one likes a slow site, you will have non-functional requirements to meet as well.  
  
We haven't performed any functional testing here on our UI, and there is no substitute to performing automated cross-browser testing of key journeys for confidence.

However you won't need to rely on them so heavily, to keep you informed of browser compatibility and version inconsistency, so they remain lean, quick and useful rather than the painful entanglement that they can become.

#### Cool story bro, but wheres the code?

I have created a simple react website in typescript with some features not supported in older browsers, it incorporates the tools discussed in the article with a working example you can experiment with and build upon.  
  
It also showcases some other UI testing tools which will be discussed in further articles.

- Unit-testing React Components with Jest & Enzyme
- Code-coverage with Istanbul
- Unit test reporting with Jest-Junit & Jest-Stare
- UI browser testing with Cypress.io
- UI test reporting with MochaAwesome
- Alerting via Slack
- CI integration with CircleCI

It is available on Github - [https://github.com/YOU54F/react-ts-testing-example](https://github.com/YOU54F/react-ts-testing-example)
