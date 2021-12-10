---
title: "vifm"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "files", "vi"]
keywords: ["doc", "dotfiles", "files", "vi"]
description: "Explore files of the system with the config of vifm."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vifm.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vifm.png"
           title="title" caption="Coming soon." position="center">}}
{{< align align="center" 
           italic=" "
           text="" >}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-vifm.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-vifm.png"
          title="vifm's logo" height="150" position="center">}}

"Vifm is a file manager with curses interface, which provides Vim-like environment for managing objects within file systems, extended with some useful ideas from mutt. "

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center"
         text="--------------------------------------------------------------------">}}

## The Files.
All files are available at [~/.config/vifm](https://github.com/a2n-s/dotfiles/blob/main/.config/vifm):
- [`vifmrc`]
- [`colors`]

## The config.
**WORK IN PROGRESS**

## Some resources.
- the home page of vifm [here](https://vifm.info/).
- the github page [here](https://github.com/vifm/vifm).
- the arch wiki page [here](https://wiki.archlinux.org/title/Vifm).

## Dependencies.
No dependencies.

## Manual installation process.
- install the `vifm` command.
- copy [`vifmrc`] and the [`colors`] inside your `~/.config/vifm` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu vifm
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/vifm/vifmrc ~/.config/vifm/vifmrc
mv a2n-s_dotfiles/.config/vifm/colors ~/.config/vifm/colors
```

{{< code align="center"
         text="--------------------------------------------------------------------">}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`vifmrc`]: https://github.com/a2n-s/dotfiles/blob/main/.config/vifm/vifmrc
[`colors`]: https://github.com/a2n-s/dotfiles/blob/main/.config/vifm/colors
