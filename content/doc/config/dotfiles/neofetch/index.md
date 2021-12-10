---
title: "neofetch"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "terminal"]
keywords: ["doc", "dotfiles", "terminal"]
description: "Prints information on the terminal at log time, information to install the config locally."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-neofetch.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-neofetch.png"
           title="neofetch art examples" caption="Some example of ascii pieces of art." position="center">}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-neofetch.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-neofetch.png"
          title="neofetch's logo" height="150" position="center">}}

`neofetch` is "a command-line system information tool written in bash 3.2+"

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/neofetch](https://github.com/a2n-s/dotfiles/blob/main/.config/neofetch):
- [`config.conf`]
- [`neofetchrc`]
- [`ascii`]

## The config.
I removed some of the features of neofetch to make it faster and lighter.  
I wrote the `neofetchrc` script that launches different ascii art based on the date.  
**DEPRECATED** -> I mainly use Distrotube's [`colorscript`](https://gitlab.com/dwt1/shell-color-scripts) now.

## Some resources.
- the [GitHub](https://github.com/dylanaraps/neofetch) page.
- the Arch [manual](https://man.archlinux.org/man/neofetch.1) page.

## Dependencies.
- some art works in `~/.config/neofetch/ascii`.

## Manual installation process.
- install the dependencies.
- install the `neofetch` command.
- copy [`config.conf`], [`neofetchrc`] and the files in [`ascii`] inside your `~/.config/neofetch` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu neofetch
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/neofetch/config.conf ~/.config/neofetch/config.conf
mv a2n-s_dotfiles/.config/neofetch/neofetchrc ~/.config/neofetch/neofetchrc
mv a2n-s_dotfiles/.config/neofetch/ascii/* ~/.config/neofetch/ascii
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`config.conf`]: https://github.com/a2n-s/dotfiles/blob/main/.config/neofetch/config.conf
[`neofetchrc`]:  https://github.com/a2n-s/dotfiles/blob/main/.config/neofetch/.neofetchrc
[`ascii`]:       https://github.com/a2n-s/dotfiles/blob/main/.config/neofetch/ascii
