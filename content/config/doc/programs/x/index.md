---
title: "x"
date: 2021-04-12
tags: ["doc", "programs", "screen"]
keywords: ["doc", "programs", "screen"]
description: "Some installation details to be able to display things on the screen."
---
Go back to the [programs](/public/config/doc/programs), the [doc](/public/config/doc) or the [front page](/public).  

{{< image src="https://a2n-s.github.io/public/config/doc/images/x-logo.png" 
          alt="https://a2n-s.github.io/public/config/doc/images/x-logo.png"
          title="x' logo" height="150" position="center">}}

"The X.Org Server runs on many free-software Unix-like operating systems, including being adopted for use by most Linux distributions and BSD variants."


## Some resources.
- the wikipedia page [here](https://en.wikipedia.org/wiki/X.Org_Server).
- the arch wiki page [here](https://wiki.archlinux.org/title/xorg).

## Dependencies for x.
- `picom`: a compositor for `X11`
- `nitrogen` to load and restore wallpapers.
- `xscreensaver` to save and lock the screen.
- `spectrWM`: the window manager.

## Install x manually.
- install the dependencies.
- install the `x` package.
- copy [`.xinitrc`] inside your `~/` directory.

## Gallery.
Available soon.  
Snippets on the [dotfiles](https://github.com/a2n-s/dotfiles#4-gallery-toc) repo.

Go back to the [programs](/public/config/doc/programs), the [doc](/public/config/doc) or the [front page](/public).  

[`.xinitrc`]: https://github.com/a2n-s/dotfiles/blob/main/.xinitrc
