---
title: "bash."
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "shell"]
keywords: ["doc", "dotfiles", "shell"]
description: "The famous Unix Shell, some detail, how to install my config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center"
         text="--------------------------------------------------------------------">}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles/#4-gallery-toc).

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-bash.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-bash.png"
          title="Bash's logo" height="150" position="center">}}

"Bash is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual Installation process](#manual-installation-process)

{{< code align="center"
         text="--------------------------------------------------------------------">}}

## The Files.
All files are available at [~/](https://github.com/a2n-s/dotfiles):
- [`.bash_aliases`]
- [`.bash_logout`]
- [`.bash_profile`]
- [`.bashrc`]
- [`.profile`]

## The Config.
#### 1. Profile.
Launches `mpd` for music, starts `x` when on `tty1` or sources `.bashrc` otherwise.
#### 2. bashrc.
Does the following in sequence:
- loads the aliases below.
- tries to load some completion.
- adds `~/scripts` and `~/.local/bin` to `PATH`.
- changes the prompt to use `_shortwd` and `_parse_git_info` (see [the scripts](/public/doc/config/scripts/)).
- disables my broken caps lock key.
- switches to `vi` mode.
- loads `virtualenvwrapper` to manage `python` virtual environments.
- prints a `colorscript` using Distrotube's repo [here](https://gitlab.com/dwt1/shell-color-scripts).
  * can be changed to `neofetch`.
- prints a 3-month calendar.
#### 3. Aliases.
I define some aliases to make my life easier, e.g.
- `xcc` to pipe `stdout` to clipboard.
- `cfg` to control the bare repository of my config.
- `lgr` to list all the `git` repositories in my `$HOME`.
- `tns`, `tls`, `tat` and `tkt` to respectively create, list, attach and kill a session in `tmux`.
- `xrandr-run` to connect to HDMI monitors.
- `ncu*` to connect to my favorite networks.
- `jpy` and `jnb` to launch respectively `jupyter` and `jupyter-nontebook` when available.
- `sdn` and `sdnr` to respectively shutdown and reboot my machine from the terminal.
- classic `ls` variants such as `ll` ~ `ls -l` or `la` ~ ~ls -A`.
#### 4. Logout.
Default behaviour.

## Some resources.
- the [wikipedia](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) page.
- an [extensive tutorial](https://tldp.org/LDP/Bash-Beginners-Guide/html/index.html) to use bash.

## Dependencies.
- the scripts in the [`scripts`] directory.
- `neofetch`, `git` and `cal`.
- Distrotube's `colorscript` -> can be found [here](https://gitlab.com/dwt1/shell-color-scripts).

## Manual installation process.
- install the dependencies above.
- copy [`.bash_aliases`], [`.bash_logout`], [`.bash_profile`], [`.bashrc`] and [`.profile`] inside your `~/` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu neofetch git cal
yay -S shell-color-scripts   # or follow instructions at https://gitlab.com/dwt1/shell-color-scripts#installing-shell-color-scripts-on-other-linux-distrtibutions 
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.bash_profile ~/.bash_profile
mv a2n-s_dotfiles/.bashrc ~/.bashrc
mv a2n-s_dotfiles/.bash_aliases ~/.bash_aliases
mv a2n-s_dotfiles/.bash_logout ~/.bash_logout
```

{{< code align="center"
         text="--------------------------------------------------------------------">}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`scripts`]:       https://github.com/a2n-s/dotfiles/blob/main/scripts
[`.bash_aliases`]: https://github.com/a2n-s/dotfiles/blob/main/.bash_aliases
[`.bash_logout`]:  https://github.com/a2n-s/dotfiles/blob/main/.bash_logout
[`.bash_profile`]: https://github.com/a2n-s/dotfiles/blob/main/.bash_profile
[`.bashrc`]:       https://github.com/a2n-s/dotfiles/blob/main/.bashrc
[`.profile`]:      https://github.com/a2n-s/dotfiles/blob/main/.profile
