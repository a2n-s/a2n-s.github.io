---
title: "nitrogen"
date: 2021-12-04
lastMod: 2021-12-28
tags: ["doc", "dotfiles", "wallpapers"]
keywords: ["doc", "dotfiles", "wallpapers"]
description: "How to install the same config to restore wallpapers."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

 a wallpaper manager.

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process-deprecated) **DEPRECATED**

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/nitrogen](https://github.com/a2n-s/dotfiles/blob/main/.config/nitrogen):
- [`nitrogen.cfg`]

## The config.
**DEPRECATED** -> see `feh` and my [wallpapers](https://github.com/a2n-s/wallpapers) ([doc](/public/doc/config/wallpapers)) instead.

## Some resources.
- the Arch [wiki](https://wiki.archlinux.org/title/nitrogen) page.
- a youtube [tutorial](https://www.youtube.com/watch?v=V4Kh2JBrpO0).

## Dependencies.
- some wallpapers to load and restore.
- mine currently is a [vibrant scene](https://voyage-onirique.com/wp-content/uploads/2020/03/backiee-138908-landscape-scaled.jpg).

## Manual installation process. **DEPRECATED**
- install the dependencies.
- install the `nitrogen` command.
- copy [`nitrogen.cfg`] inside your `~/.config/nitrogen` directory.

in a nutshell and to be adapted, **DEPRECATED**:
```bash
sudo pacman -Syu nitrogen
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/nitrogen/nitrogen.cfg ~/.config/nitrogen/nitrogen.cfg
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`nitrogen.cfg`]: https://github.com/a2n-s/dotfiles/blob/main/.config/nitrogen/nitrogen.cfg
