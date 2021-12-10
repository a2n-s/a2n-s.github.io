---
title: "tmux"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "terminal"]
keywords: ["doc", "dotfiles", "terminal"]
description: "Install this config to multiplex terminals like a pro!"
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center"
         text="--------------------------------------------------------------------">}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-tmux.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-tmux.png"
          title="tmux' logo" height="150" position="center">}}

"tmux is an open-source terminal multiplexer for Unix-like operating systems."

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
- [`.tmux.conf`]

## The config.
Not much to say about tmux for now as I do not really use it anymore since moving to ArchLinux.

## Some resources.
- the github page [here](https://en.wikipedia.org/wiki/Tmux).
- the arch wiki page [here](https://wiki.archlinux.org/title/tmux).

## Dependencies.
No dependencies.

## Manual installation process.
- install the `tmux` command.
- copy [`.tmux.conf`] inside your `~/` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu tmux
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.tmux.conf ~/.tmux.conf
```

{{< code align="center"
         text="--------------------------------------------------------------------">}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`.tmux.conf`]: https://github.com/a2n-s/dotfiles/blob/main/.tmux.conf
