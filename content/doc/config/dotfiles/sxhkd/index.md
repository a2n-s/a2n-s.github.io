---
title: "sxhkd"
date: 2021-12-04
lastMod: 2021-12-28
tags: ["doc", "dotfiles", "keyboard"]
keywords: ["doc", "dotfiles", "keyboard"]
description: "Needed to interact with and control bspwm."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

"sxhkd is an X daemon that reacts to input events by executing commands."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process-deprecated) **DEPRECATED**

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/.config/sxhkd](https://github.com/a2n-s/dotfiles/blob/main/.config/sxhkd):
- [`sxhkdrc`]

## The config.
The most interesting with `sxhkd` are the key-bindings:
- **wm agnostic shortcuts**:
| **SUPER** + keys        | command                                                     | what it does                                       |
|-------------------------|-------------------------------------------------------------|----------------------------------------------------|
| Escape                  | pkill -USR1 -x sxhkd                                        | make sxhkd reload its configuration files          |
| Return                  | alacritty                                                   | open the terminal emulator                         |
| @space                  | dmenu_run                                                   | run a program launcher                             |
| F1                      | ~/repos/dmscripts/scripts/dm-hub                            | open the hub of dmenu with dmscripts.              |
| F2                      | ~/repos/dmscripts/scripts/dm-confedit                       | pop a list of all config files to edit them.       |
| F3                      | bash ~/.config/polybar/launch.sh --forest                   | restart all instances of polybar.                  |
| F4                      | killall -q polybar                                          | kill all instances of polybar.                     |
| F5                      | brightnessctl s 8-                                          | brightness of the main screen down.                |
| F6                      | brightnessctl s 8+                                          | brightness of the main screen up.                  |
| {\_, shift +}F7         | ~/scripts/screenshot.sh full                                | take a screenshot of everything or chose a window. |
| ctrl + F12              | xscreensaver-command --lock                                 | lock the computer.                                 |

- **bspwm dependant shortcuts**:
| **SUPER** + keys            | bspc + command                                              | what it does                                               |
|-----------------------------|-------------------------------------------------------------|------------------------------------------------------------|
| alt + {q,r}                 | {quit,wm -r}                                                | quit/restart bspwm                                         |
| {\_,shift + }w              | node -{c,k}                                                 | close and kill                                             |
| m                           | desktop -l next                                             | alternate between the tiled and monocle layout             |
| y                           | node newest.marked.local -n newest.!automatic.local         | send the newest marked node to the newest preselected node |
| g                           | node -s biggest.window                                      | swap the current node and the biggest window               |
| {t,shift + t,s,f}           | node -t {tiled,pseudo_tiled,floating,fullscreen}            | set the window state                                       |
| ctrl + {m,x,y,z}            | node -g {marked,locked,sticky,private}                      | set the node flags                                         |
| {\_,shift + }{h,j,k,l}      | node -{f,s} {west,south,north,east}                         | focus the node in the given direction                      |
| {p,b,comma,period}          | node -f @{parent,brother,first,second}                      | focus the node for the given path jump                     |
| {\_,shift + }c              | node -f {next,prev}.local.!hidden.window                    | focus the next/previous window in the current desktop      |
| bracket{left,right}         | desktop -f {prev,next}.local                                | focus the next/previous desktop in the current monitor     |
| shift + bracket{left,right} | monitor -f {prev,next}                                      | focus the next/previous monitor                            |
| {grave,Tab}                 | {node,desktop} -f last                                      | focus the last node/desktop                                |
| {o,i}                       | wm -h off; bspc node {older,newer} -f; bspc wm -h on        | focus the older or newer node in the focus history         |
| {\_,shift + }{1-9,0}        | {desktop -f,node -d} '^{1-9,10}'                            | focus or send to the given desktop                         |
| ctrl + {h,j,k,l}            | node -p {west,south,north,east}                             | preselect the direction                                    |
| ctrl + {1-9}                | node -o 0.{1-9}                                             | preselect the ratio                                        |
| ctrl + space                | node -p cancel                                              | cancel the preselection for the focused node               |
| ctrl + shift + space        | query -N -d \| xargs -I id -n 1 bspc node id -p cancel      | cancel the preselection for the focused desktop            |
| alt + {h,j,k,l}             | node -z {left -20 0,bottom 0 20,top 0 -20,right 20 0}       | expand a window by moving one of its side outward          |
| alt + shift + {h,j,k,l}     | node -z {right -20 0,top 0 20,bottom 0 -20,left 20 0}       | contract a window by moving one of its side inward         |
| {Left,Down,Up,Right}        | node -v {-20 0,0 20,0 -20,20 0}                             | move a floating window                                     |
| {F10, F11, F12}             | ~/.config/bspwm/scheme.sh {first_child,longest_side,spiral} | to change layouts                                          |

## Some resources.
- the [github](https://github.com/baskerville/sxhkd) page.
- the Arch [manual](https://man.archlinux.org/man/sxhkd.1) page of sxhkb.

## Dependencies.
- `bspc`
- `alacritty`
- `xscreensaver-command`
- `brightnessctl`
- `dmenu`
- `~/.config/bspwm/scheme.sh`
- `~/scripts/screenshot.sh` or equivalent
- my `polybar-themes` or equivalent
- my `dmscripts` or equivalent

## Manual installation process. **DEPRECATED**
- install `sxhkd`
- copy the [`sxhkdrc`] file to your `~/.config/sxhkd`.

in a nutshell and to be adapted, **DEPRECATED**:
```bash
sudo pacman -Syu sxhkd
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.config/sxhkd/sxhkdrc ~/.config/sxhkd/sxhkdrc
```

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`sxhkdrc`]: https://github.com/a2n-s/dotfiles/blob/main/.config/sxhkd/sxhkdrc
