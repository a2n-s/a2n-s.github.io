---
title: "x"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "screen"]
keywords: ["doc", "dotfiles", "screen"]
description: "Some installation details to be able to display things on the screen."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-x.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-x.png"
          title="x' logo" height="150" position="center">}}

"The X.Org Server runs on many free-software Unix-like operating systems, including being adopted for use by most Linux distributions and BSD variants."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/](https://github.com/a2n-s/dotfiles):
- [`.xinitrc`]

## The config.
Straightforward `.xinitrc` file.

## Some resources.
- the [wikipedia](https://en.wikipedia.org/wiki/X.Org_Server) page.
- the Arch [wiki](https://wiki.archlinux.org/title/xorg) page.

## Dependencies.
- `picom`: a compositor for `X11`
- `nitrogen` or `feh` to load and restore wallpapers.
- `xscreensaver` to save and lock the screen.
- `spectrWM`: the window manager.

## Manual installation process.
- install the dependencies.
- install the `x` package.
- copy [`.xinitrc`] inside your `~/` directory.

in a nutshell and to be adapted:
```bash
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.xinitrc ~/.xinitrc
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`.xinitrc`]: https://github.com/a2n-s/dotfiles/blob/main/.xinitrc
