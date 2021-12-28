---
title: "spectrWM"
date: 2021-12-04
lastMod: 2021-12-28
tags: ["doc", "dotfiles", "windows manager"]
keywords: ["doc", "dotfiles", "windows manager"]
description: "My first ever windows manager and advices to install all the required config on your machine."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

"spectrwm is a small, dynamic tiling and reparenting window manager for X11."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process-deprecated) **DEPRECATED**

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/spectrwm](https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm)
and [~/.config/scripts](https://github.com/a2n-s/dotfiles/blob/main/scripts):
- [`spectrWM-baraction.sh`]
- [`togkb.sh`]
- [`spectrwm.conf`]
- [`spectrwm_us.conf`]
- [`spectrwm_fr.conf`]

## The config.
**DEPRECATED** -> I was about to dive into `spectrwm` before I discovered and fell in love with [`bspwm`](/public/doc/config/dotfiles/bspwm).

## Some resources.
- the github page [here](https://github.com/conformal/spectrwm).
- the arch wiki page [here](https://wiki.archlinux.org/title/spectrwm).
- the arch manual page [here](https://man.archlinux.org/man/spectrwm.1).

## Dependencies.
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

## Manual installation process. **DEPRECATED**
- install the dependencies.
- install the `spectrwm` command.
- copy [`spectrwm.conf`] and [`spectrwm_us.conf`] inside your `~/.config/spectrwm` directory.

in a nutshell and to be adapted, **DEPRECATED**:
```bash
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/spectrwm/spectrwm.conf ~/.config/spectrwm/spectrwm.conf
mv a2n-s_dotfiles/.config/spectrwm/spectrwm_us.conf ~/.config/spectrwm/spectrwm_us.conf
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`spectrWM-baraction.sh`]: https://github.com/a2n-s/dotfiles/blob/main/scripts/spectrWM-baraction.sh
[`togkb.sh`]:              https://github.com/a2n-s/dotfiles/blob/main/scripts/togkb.sh
[`spectrwm.conf`]:         https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm/spectrwm.conf
[`spectrwm_us.conf`]:      https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm/spectrwm_us.conf
[`spectrwm_fr.conf`]:      https://github.com/a2n-s/dotfiles/blob/main/.config/spectrwm/spectrwm_fr.conf
