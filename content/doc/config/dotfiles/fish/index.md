---
title: "fish."
date: 2021-12-15
lastMod: 2021-12-15
tags: ["doc", "dotfiles", "shell"]
keywords: ["doc", "dotfiles", "shell"]
description: "Another famous Unix Shell, some details, how to install my config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles/#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-fish.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-fish.png"
          title="fish's logo" height="150" position="center">}}

"fish is a smart and user-friendly command line shell for Linux, macOS, and the rest of the family."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual Installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/fish](https://github.com/a2n-s/dotfiles/tree/main/.config/fish):
- [`completions`]
- [`conf.d`]
- [`config.fish`]
- [`fish_variables`]
- [`functions`]

## The Config.
**Available soon.**
<!-- #### 1. Profile. -->
<!-- Launches `mpd` for music, starts `x` when on `tty1` or sources `.fishrc` otherwise. -->
<!-- #### 2. fishrc. -->
<!-- Does the following in sequence: -->
<!-- - loads the aliases below. -->
<!-- - tries to load some completion. -->
<!-- - adds `~/scripts` and `~/.local/bin` to `PATH`. -->
<!-- - changes the prompt to use `_shortwd` and `_parse_git_info` (see [the scripts](/public/doc/config/scripts/)). -->
<!-- - disables my broken caps lock key. -->
<!-- - switches to `vi` mode. -->
<!-- - loads `virtualenvwrapper` to manage `python` virtual environments. -->
<!-- - prints a `colorscript` using Distrotube's repo [here](https://gitlab.com/dwt1/shell-color-scripts). -->
<!--   * can be changed to `neofetch`. -->
<!-- - prints a 3-month calendar. -->
<!-- #### 3. Aliases. -->
<!-- I define some aliases to make my life easier, e.g. -->
<!-- - `xcc` to pipe `stdout` to clipboard. -->
<!-- - `cfg` to control the bare repository of my config. -->
<!-- - `lgr` to list all the `git` repositories in my `$HOME`. -->
<!-- - `tns`, `tls`, `tat` and `tkt` to respectively create, list, attach and kill a session in `tmux`. -->
<!-- - `xrandr-run` to connect to HDMI monitors. -->
<!-- - `ncu*` to connect to my favorite networks. -->
<!-- - `jpy` and `jnb` to launch respectively `jupyter` and `jupyter-nontebook` when available. -->
<!-- - `sdn` and `sdnr` to respectively shutdown and reboot my machine from the terminal. -->
<!-- - `rmv`, `rmi`, `rmr` and `rmrf` where `rm*` runs `rm -*` -->
<!-- - classic `ls` variants such as `ll` ~ `ls -l` or `la` ~ ~ls -A`. -->
<!-- #### 4. Logout. -->
<!-- Default behaviour. -->

## Some resources.
**Available soon.**
<!-- - the [wikipedia](https://en.wikipedia.org/wiki/fish_(Unix_shell)) page. -->
<!-- - an [extensive tutorial](https://tldp.org/LDP/fish-Beginners-Guide/html/index.html) to use fish. -->

## Dependencies.
**Available soon.**
<!-- - the scripts in the [`scripts`] directory. -->
<!-- - `neofetch`, `git` and `cal`. -->
<!-- - Distrotube's `colorscript` -> can be found [here](https://gitlab.com/dwt1/shell-color-scripts). -->

## Manual installation process.
**Available soon.**
<!-- - install the dependencies above. -->
<!-- - copy [`.fish_aliases`], [`.fish_logout`], [`.fish_profile`], [`.fishrc`] and [`.profile`] inside your `~/` directory. -->

<!-- in a nutshell and to be adapted: -->
<!-- ```fish -->
<!-- sudo pacman -Syu neofetch git cal -->
<!-- yay -S shell-color-scripts   # or follow instructions at https://gitlab.com/dwt1/shell-color-scripts#installing-shell-color-scripts-on-other-linux-distrtibutions --> 
<!-- git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles -->
<!-- mv a2n-s_dotfiles/.fish_profile ~/.fish_profile -->
<!-- mv a2n-s_dotfiles/.fishrc ~/.fishrc -->
<!-- mv a2n-s_dotfiles/.fish_aliases ~/.fish_aliases -->
<!-- mv a2n-s_dotfiles/.fish_logout ~/.fish_logout -->
<!-- ``` -->

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`completions`]:    https://github.com/a2n-s/dotfiles/blob/main/.config/fish/completions
[`conf.d`]:         https://github.com/a2n-s/dotfiles/blob/main/.config/fish/conf.d
[`config.fish`]:    https://github.com/a2n-s/dotfiles/blob/main/.config/fish/config.fish
[`fish_variables`]: https://github.com/a2n-s/dotfiles/blob/main/.config/fish/fish_variables
[`functions`]:      https://github.com/a2n-s/dotfiles/blob/main/.config/fish/functions
