---
title: "Tinkering with the touchbar."
date: "2019-03-09"
---

When I started a new job a few months ago. I was given a MacBook Pro 15", with the infamous touchbar.

I've eventually stopped lamenting about the loss of a physical escape key, and have employed some tips & tricks to make it a bit more useful.

#### No touchbar? [touché](https://red-sweater.com/touche/) my friend

If you don't have a touchbar, but do have a Mac, you can use [touché](https://red-sweater.com/touche/) to emulate one on your screen and still use these tricks (bar touchid)

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-09-at-00.01.44.png?w=1024)

#### sudo at your fingertips

```bash
$ sudo sublime /etc/pam.d/sudo
```

Add the following line

```bash
auth sufficient pam_tid.so
```

And you should be left with something like this

# sudo: auth account password session

```bash
 auth sufficient pam_tid.so
 auth sufficient pam_smartcard.so
 auth required pam_opendirectory.so
 account required pam_permit.so
 password required pam_deny.so
 session required pam_permit.so
```

Exit and then open your terminal again, and attempt to sudo and voila. sudo at your fingertip.

$ sudo touch

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-08-at-23.34.09.png)

#### iStats

I've always liked knowing the temps of my CPU/GPU/RAM, and fan speeds stemming from overclocking/water-cooling my PC's but mainly I wanted to quieten my fans without melting the work laptop.

It is ridiculously loud when it spins up a set of Docker containers or a VM and it just doesn't need to be, so I use [MacsFanControl](https://www.crystalidea.com/macs-fan-control) to control the fan speeds, and iStats to keep an eye on some stats.

```bash
$ sudo gem install iStats
```

```bash
$ istats all
```

```bash
Total fans in system: 2
 CPU temp: 43.13°C ▁▂▃▅▆▇
 Battery health: Good
 Fan 0 speed: 3461 RPM ▁▂▃▅▆▇
 Fan 1 speed: 3502 RPM ▁▂▃▅▆▇
 Cycle count: 66 ▁▂▃▅▆▇ 6.6%
 Max cycles: 1000
 Current charge: 1927 mAh ▁▂▃▅▆▇ 28%
 Maximum charge: 7025 mAh ▁▂▃▅▆▇ 95.8%
 Design capacity: 7336 mAh
 Battery temp: 30.8°C
```

Sweet, now let's see if we can get them on the touchbar.

Apple let us modify the touchbar to a degree, but not enough to be able to add custom icons and scripts.

We can use [BetterTouchTool](https://folivora.ai/) but it's not free, and I am loving open-source software, so I managed to find [My Touchbar, My Rules.](https://github.com/Toxblh/MTMR) You can download it with [HomeBrew](https://brew.sh/).

```bash
$ brew cask install mtmr
```

Once installed you can find it in your Applications folder, run it and your touchbar will run the default config.

You can also do a 3 finger swipe to adjust brightness or a 2 finger swipe to adjust volume.

Let's have a look at the config

```bash
$ sublime ~/Library/Application\ Support/MTMR/items.json
```

It is a json config file, defining each button. You can customise with a list of predefined button types listed on their homepage, but you can also write AppleScript or your own scripts and associated them with buttons.

My config is available [here](https://gist.github.com/YOU54F/ded1b66bef6a47c45e37cec371518a59) as a GitHub Gist and can be seen below

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-09-at-17.07.29.png)

It was inspired by the following [plugin](https://github.com/marekkaczkowski/Touch-Bar-iStats) for BetterTouchTool

#### iTerm2 Touchbar integration

If you don't have iTerm, download it with [HomeBrew](https://brew.sh/).

```bash
$ brew cask install iterm2
```

You can view the iTerm2 docs for the touchbar [here.](https://www.iterm2.com/documentation-touch-bar.html)

#### zsh-iterm-touchbar

With ZSH and a nifty plugin called zsh-iterm-touchbar, we can get our git info and run our npm run scripts in project folders.

If you aren't already using zsh, then install it with HomeBrew

```bash
brew install zsh
```

Install [OhMyZSH](https://ohmyz.sh/)

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Clone the repo in your ZSH directory

```bash
$ cd ${ZSH\_CUSTOM1:-$ZSH/custom}/plugins
$ git clone https://github.com/iam4x/zsh-iterm-touchbar.git
```

Then add the plugin into your .zshrc

```bash
$ sudo sublime ~/.zshrc
```

```bash
TOUCHBAR_GIT_ENABLED=true
plugins=(... zsh-iterm-touchbar)
```

Restart your terminal and you should see

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-09-at-00.03.13.png?w=1024)

In a git enabled folder

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-09-at-00.04.00.png?w=1024)

Showing run scripts from a package.json

![](https://you54f.files.wordpress.com/2019/03/screenshot-2019-03-09-at-00.04.35.png?w=1024)

List of options

- F1 - Current directory 👉
- F2 - Current git branch, press to display all branches and switch between them 🎋
- F3 - Current git repo status 🔥 / 🙌
- - `+` — uncommitted changes in the index;
- - `!` — unstaged changes;
- - `?` — untracked changes;
- - `$` — stashed changes;
- - `⇣` — unpulled commits;
- - `⇡` — unpushed commits.
- F4 - Push to origin branch (git push origin \[branch\]) ✉️
- F5 - Display `npm-run` or `yarn-run` scripts from `package.json`

#### More touch-bar resources

An open-source list tracking touchbar projects

[https://github.com/zakrid/awesome-touchbar](https://github.com/zakrid/awesome-touchbar)

#### Whilst we're at it

I am using a few zsh plugins which make my life so much easier.

```bash
plugins=(
 git
 dotenv
 osx
 yarn
 npm
 node
 nvm
 docker
 iterm2
 brew
 battery
 alias-tips
 zsh-iterm-touchbar
 zsh-autosuggestions
 zsh-syntax-highlighting
 )
```

A full list of the out-of-the-box supported plugins

[https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins)

You can find more to install

[https://github.com/unixorn/awesome-zsh-plugins#plugins](https://github.com/unixorn/awesome-zsh-plugins#plugins)
