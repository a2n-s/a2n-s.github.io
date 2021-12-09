---
title: "spectrWM"
date: 2021-12-04
lastMod: 2021-12-09
tags: ["doc", "dotfiles", "windows manager"]
keywords: ["doc", "dotfiles", "windows manager"]
description: "My first ever windows manager and advices to install all the required config on your machine."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

"spectrwm is a small, dynamic tiling and reparenting window manager for X11."


## Some resources.
- the github page [here](https://github.com/conformal/spectrwm).
- the arch wiki page [here](https://wiki.archlinux.org/title/spectrwm).
- the arch manual page [here](https://man.archlinux.org/man/spectrwm.1).

## Dependencies for spectrWM.
- the `mononoki nerd` font.
- a [`spectrWM-baraction.sh`] file.
- a browser: `firefox`
- a menu: `dmenu`
- a terminal: `alacritty`
- an email application: `thunderbird`
- a rendering service: `arandr`
- an image editor: `gimp`. I also use `kolourpaint`
- `brightnessctl` to control the brightness of the main screen.
- `amixer` to control the volume of the main screen.
- [`togkb.sh`] to switch the keyboard layout.
- `xscreensaver` to lock and save the screen usage.

## Install spectrwm manually.
- install the dependencies.
- install the `spectrwm` command.
- copy [`spectrwm.conf`] and [`spectrwm_us.conf`] inside your `~/.config/spectrwm` directory.

## Gallery.
Available soon.  
Snippets on the [dotfiles](https://github.com/a2n-s/dotfiles#4-gallery-toc) repo.

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`spectrWM-baraction.sh`]: https://github.com/a2n-s/dotfiles/blob/main/scripts/spectrWM-baraction.sh
[`togkb.sh`]:              https://github.com/a2n-s/dotfiles/blob/main/scripts/togkb.sh
[`spectrwm.conf`]:         https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm/spectrwm.conf
[`spectrwm_us.conf`]:      https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm/spectrwm_us.conf
