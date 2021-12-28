---
title: "bspwm"
date: 2021-12-04
lastMod: 2021-12-28
tags: ["doc", "dotfiles", "windows manager"]
keywords: ["doc", "dotfiles", "windows manager"]
description: "The binary space partitioning windows manager."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-bspwm-normal.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-bspwm-normal.png"
           title="bspwm in normal mode" caption="Some windows in normal/automatic insertion mode." position="center">}}
{{< align align="center" 
           italic=" "
           text="One can see, from top to bottom and left to right, polybar, my GitHub front page, some git command, an example of dt's colorsript and htop." >}}
{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-bspwm-spiral.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-bspwm-spiral.png"
           title="bspwm in spiral mode" caption="Some terminals in spiral insertion mode." position="center">}}
{{< align align="center" 
           italic=" "
           text="One can see, from top to bottom and left to right, polybar, a lot of terminals with the git tr command and my public personal web site." >}}
{{< align align="center" 
           italic=" "
           text="Gaps, borders and opacity have been exagerated for aesthetic purposes." >}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

"bspwm is a tiling window manager that represents windows as the leaves of a full binary tree."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process-deprecated) **DEPRECATED**

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/bspwm](https://github.com/a2n-s/dotfiles/blob/main/.config/bspwm):
- [`bspwmrc`](https://github.com/a2n-s/dotfiles/blob/main/.config/bspwm/bspwmrc)
- [`scheme.sh`](https://github.com/a2n-s/dotfiles/blob/main/.config/bspwm/scheme.sh)

## The config.
Some scripts can be found in bspwm's [config](https://github.com/a2n-s/dotfiles/tree/main/scripts).  
`bspwm` supports `polybar` very well as in the above images. For an updated version of my `polybar` see the [repo](https://github.com/a2n-s/polybar-themes) or the [doc](/public/doc/config/polybar).  
For all the key-bindings of `bspwm` see [sxhkd](/public/doc/config/dotfiles/sxhkd).

## Some resources.
- the [GitHub](https://github.com/baskerville/bspwm) page.
- the Arch [wiki](https://wiki.archlinux.org/title/bspwm) page.
- the Arch [manual](https://man.archlinux.org/man/bspwm.1) page.
- inspired by notusknot's [video](https://www.youtube.com/watch?v=_55HGnz422M) on the topic
and his [repo](https://github.com/notusknot/dotfiles) and also
[aguslr's](https://github.com/aguslr/bspwm-config) and [dt's](https://gitlab.com/dwt1/dotfiles) configs.


## Dependencies.
- `feh`
- `bspc`
- `sxhkd`
- `alacritty` or `kitty`

## Manual installation process. **DEPRECATED**
- install all the dependencies above.
- move the content of [`bspwm's config`] to your `~/.config/bspwm` directory.

in a nutshell and to be adapted, **DEPRECATED**:
```bash
sudo pacman -Syu feh bspwm sxhkd alacritty
# or
sudo pacman -Syu feh bspwm sxhkd kitty
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/bspwm/* ~/.config/bspwm
```


{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`bspwm's config`]: https://github.com/a2n-s/dotfiles/blob/main/.config/bspwm
