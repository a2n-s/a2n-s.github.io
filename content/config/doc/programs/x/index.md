---
title: "x"
date: 2021-09-12T22:08:05+02:00
tags: ["tag1", "tag2"]
keywords: ["keyword1", "keyword2"]
description: "Description"
---

{{< 
figure src="https://a2n-s.github.io/graphic.github.io/config/doc/images/x-logo.png" 
       alt="https://a2n-s.github.io/graphic.github.io/config/doc/images/x-logo.png"
       title="x' logo"
       height="150"
       position="center"
>}}

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

[`.xinitrc`]: https://github.com/a2n-s/dotfiles/blob/main/.xinitrc
