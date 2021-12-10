---
title: "Alacritty."
date: 2021-12-04
lastMod: 2021-12-09
tags: ["doc", "dotfiles", "terminal"]
keywords: ["doc", "dotfiles", "terminal"]
description: "A minimal terminal emulator for a minimal linux config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-alacritty.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-alacritty.png"
           title="alacritty" caption="A few Alacritty instances on my machine." position="center">}}
{{< align align="center" 
           italic=" "
           text="Gaps, borders and opacity have been exagerated for aesthetic purposes." >}}
{{< align align="center" 
           italic=" "
           text="One can see, from top to bottom and left to right, polybar, some git command, an ls of my /home and htop." >}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-alacritty.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-alacritty.png"
          title="Alacritty's logo" height="150" position="center">}}

Alacritty is a minimal terminal emulator.

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/alacritty](https://github.com/a2n-s/dotfiles/blob/main/.config/alacritty):
- [`alacritty.yml`]: 

## The config.
The **theme** is *simple* and *easy on the eyes*.  
I changed the *cursor* and added a *visual bell*.  
I use the following additional **key-bindings**:
| Key-binding              | Action           | Character sent |
|--------------------------|------------------|----------------|
|                   F11    | ToggleFullscreen |                |
|                   Paste  | Paste            |                |
|                   Copy   | Copy             |                |
| Control         + Key0   | ResetFontSize    |                |
| Control         + Equals | IncreaseFontSize |                |
| Control         + Plus   | IncreaseFontSize |                |
| Control         + Minus  | DecreaseFontSize |                |
| Control         + L      | ClearLogNotice   |                |
| Control         + L      |                  | "\x0c"         |
| Control         + N      | SpawnNewInstance |                |
| Control + Shift + V      | Paste            |                |
| Control + Shift + C      | Copy             |                |

## Some resources.
- the [GitHub](https://github.com/alacritty/alacritty) page.
- the [arch wiki](https://wiki.archlinux.org/title/Alacritty) page.

## Dependencies.
- `xterm-256color` mode to display many colors.
- the `mononoki nerd font`: can be installed with `yay -S nerd-fonts-mononoki` on Arch.

## Manual installation process.
- install the dependencies above.
- install the `alacritty` command.
- copy [`alacritty.yml`] inside your `~/.config/alacritty` directory.

in a nutshell and to be adapted:
```bash
yay -S nerd-fonts-mononoki
sudo pacman -Syu alacritty
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/alacritty/alacritty.yml ~/.config/alacritty/alacritty.yml
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`alacritty.yml`]: https://github.com/a2n-s/dotfiles/blob/main/.config/alacritty/alacritty.yml
