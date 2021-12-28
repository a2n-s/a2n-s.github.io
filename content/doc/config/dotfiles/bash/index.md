---
title: "bash."
date: 2021-12-04
lastMod: 2021-12-28
tags: ["doc", "dotfiles", "shell"]
keywords: ["doc", "dotfiles", "shell"]
description: "The famous Unix Shell, some detail, how to install my config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles/#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-bash.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-bash.png"
          title="Bash's logo" height="150" position="center">}}

"Bash is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual Installation process](#manual-installation-process-deprecated) **DEPRECATED**

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/](https://github.com/a2n-s/dotfiles):
- [`.bash_logout`]
- [`.bash_profile`]
- [`.bashrc`]
- [`.profile`]

## The Config.
My `bash` config makes an extensive use of the [`oh-my-bash`] framework.
#### 1. Profile.
Launches `mpd` for music, starts `x` when on `tty1` or sources `.bashrc` otherwise.
#### 2. bashrc.
Does the following in sequence:
- defines general parameters for [`oh-my-bash`].
  -  a scheme for the prompt, set to `random`.
- defines the **completion** that `oh-my-bash` should source.
  -  `git`
  -  `composer`
  -  `ssh`
- defines the **aliases** that `oh-my-bash` should source.
  -  `general`
  -  `chmod`
  -  `ls`
  -  `example` from `custom/aliases`
- defines the **plugins** that `oh-my-bash` should source.
  -  `git`
  -  `bashmarks`
- adds `~/scripts` and `~/.local/bin` to `PATH`.
- switches to `vi` mode.
- loads `virtualenvwrapper` to manage `python` virtual environments.
<!-- - prints a `colorscript` using Distrotube's repo [here](https://gitlab.com/dwt1/shell-color-scripts). -->
<!--   - can be changed to `neofetch`. -->
<!-- - prints a 3-month calendar. -->
- prints a fortunate pony...
- starts `starship` for a better prompt
- sources `bash-insulter`
#### 3. Aliases.
I define some aliases to make my life easier, e.g.
- `xcc` to pipe `stdout` to clipboard.
- `cfg` to control the bare repository of my config.
- `lgr` to list all the `git` repositories in my `$HOME`.
- ...

See [`oh-my-bash`] for more.
#### 4. Logout.
Default behaviour.

## Some resources.
- the [wikipedia](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) page.
- an [extensive tutorial](https://tldp.org/LDP/Bash-Beginners-Guide/html/index.html) to use bash.

## Dependencies.
- the scripts in the [`scripts`] directory.
<!-- - `neofetch`, `git` and `cal`. -->
- `oh-my-bash`, the `bash-insulter`, `nvim`, `virtualenvwrapper`, `git`, `ponysay`, `fortune` and `starship`.
<!-- - Distrotube's `colorscript` -> can be found [here](https://gitlab.com/dwt1/shell-color-scripts). -->

## Manual installation process. **DEPRECATED**
- install the dependencies above.
- copy [`.bash_logout`], [`.bash_profile`], [`.bashrc`] and [`.profile`] inside your `~/` directory.

in a nutshell and to be adapted: **DEPRECATED**
<!-- sudo pacman -Syu neofetch git cal -->
```bash
sudo pacman -Syu nvim git ponysay fortune starship
git clone git://github.com/a2n-s/oh-my-bash.git ~/repos/oh-my-bash
sudo wget -O /etc/bash.command-not-found https://raw.githubusercontent.com/hkbakke/bash-insulter/master/src/bash.command-not-found
pip install virtualenvwrapper
yay -S shell-color-scripts   # or follow instructions at https://gitlab.com/dwt1/shell-color-scripts#installing-shell-color-scripts-on-other-linux-distrtibutions 
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.bash_profile ~/.bash_profile
mv a2n-s_dotfiles/.profile ~/.profile
mv a2n-s_dotfiles/.bashrc ~/.bashrc
mv a2n-s_dotfiles/.bash_logout ~/.bash_logout
rm -rf a2n-s_dotfiles  # optional
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`scripts`]:       https://github.com/a2n-s/dotfiles/blob/main/scripts
[`.bash_logout`]:  https://github.com/a2n-s/dotfiles/blob/main/.bash_logout
[`.bash_profile`]: https://github.com/a2n-s/dotfiles/blob/main/.bash_profile
[`.bashrc`]:       https://github.com/a2n-s/dotfiles/blob/main/.bashrc
[`.profile`]:      https://github.com/a2n-s/dotfiles/blob/main/.profile
[`oh-my-bash`]:    http://localhost:1313/public/doc/config/bash
