---
title: "xscreensaver"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "security"]
keywords: ["doc", "dotfiles", "security"]
description: "Some config installation to secure once machine."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center"
         text="--------------------------------------------------------------------">}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center"
         text="--------------------------------------------------------------------">}}

"XScreenSaver is a screen saver and locker for the X Window System. "

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center"
         text="--------------------------------------------------------------------">}}

## The Files.
All files are available at [~/](https://github.com/a2n-s/dotfiles):
- [`.xscreensaver`]

## The config.
Run `xscreensaver-settings` to see available lock screens.

## Some resources.
- the [GitHub](https://en.wikipedia.org/wiki/XScreenSaver) page
- the Arch [wiki](https://wiki.archlinux.org/title/XScreenSaver) page.

## Dependencies.
No dependencies.

## Manual installation process.
- install the `xscreensaver` command.
- copy [`.xscreensaver`] inside your `~/` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu xscreensaver
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.xscreensaver ~/.xscreensaver
```

{{< code align="center"
         text="--------------------------------------------------------------------">}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`.xscreensaver`]: https://github.com/a2n-s/dotfiles/blob/main/.xscreensaver
