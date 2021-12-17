---
title: "Starship."
date: 2021-12-14
lastMod: 2021-12-17
tags: ["doc", "dotfiles", "terminal"]
keywords: ["doc", "dotfiles", "terminal"]
description: "A minimal terminal emulator for a minimal linux config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-starship.png"
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-starship.png"
           title="starship" caption="Available soon." position="center">}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-starship.png"
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-starship.png"
          title="starship's logo" height="150" position="center">}}

"The minimal, blazing-fast, and infinitely customizable prompt for any shell!"

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config](https://github.com/a2n-s/dotfiles/blob/main/.config):
- [`starship.toml`]

## The config.
**Previews available soon.**

## Some resources.
- the [GitHub](https://github.com/starship/starship) page.
- the [official](https://starship.rs/) page.

## Dependencies.
- the `nerd` fonts.

## Manual installation process.
- install the dependencies above.
- install the `starship` command.
- copy [`starship.toml`] inside your `~/.config` directory.

in a nutshell and to be adapted:
```bash
yay -S nerd-fonts-mononoki
sudo pacman -Syu starship
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/starship.toml ~/.config/starship.toml
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).

[`starship.toml`]: https://github.com/a2n-s/dotfiles/blob/main/.config/starship.toml
