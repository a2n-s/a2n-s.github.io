---
title: "git"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "tools"]
keywords: ["doc", "dotfiles", "tools"]
description: "The version control system of choice for me, suited for GitHub, GitLab and many more. Some pieces of advice to install the config."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-git.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-git.png"
           title="title" caption="Caption." position="center">}}
{{< align align="center" 
           italic=" "
           text="Gaps, borders and opacity have been exagerated for aesthetic purposes." >}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles/#4-gallery-toc).

{{< code align="center"
         text="--------------------------------------------------------------------">}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-git.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-git.png"
          title="git's logo" height="150" position="center">}}

"Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency."

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
- [`.gitconfig`]

## The Config.
I use `vim` as my `git` editor, `main` as a default branch name and the `rebase` method for pulling.  
Then I simply wrote many aliases to make my life easier:
{{< align align="center" bold=" " text="Basic aliases." >}}
| shortcut | command  |
|----------|----------|
| i        | init     |
| cl       | clone    |
| st       | status   |
| cm       | commit   |
| sw       | switch   |
| co       | checkout |

{{< align align="center" bold=" " text="Move branches around." >}}
| shortcut | command     |
|----------|-------------|
| cp       | cherry-pick |
| rb       | rebase      |
| rbi      | rebase -i   |
| mg       | merge       |

{{< align align="center" bold=" " text="Inspect the commit tree." >}}
| shortcut | command                                       |
|----------|-----------------------------------------------|
| ga       | log --graph --all                             |
| tr       | log --graph --oneline --all --decorate        |
| trs      | log --oneline --decorate --all --graph --stat |

{{< align align="center" bold=" " text="Inspect the tracked files." >}}
| shortcut | command                                               |
|----------|-------------------------------------------------------|
| lf       | ls-files                                              |
| lfs      | !git ls-files \| xargs ls -1 \| sort -nrk5            |
| lfsh     | !git ls-files \| xargs ls -1 \| sort -nrk5 \| head -n |

{{< align align="center" bold=" " text="Interact with remote repos..." >}}
{{< align align="center" italic=" " text="down stream." >}}
| shortcut | command                                      |
|----------|----------------------------------------------|
| fc       | fetch                                        |
| fcp      | fetch -p                                     |
| pl       | pull                                         |
| praff    | pull --rebase --autostash --ff               |
| praffom  | pull --rebase --autostash --ff origin main   |
| praffum  | pull --rebase --autostash --ff upstream main |

{{< align align="center" italic=" " text="up stream." >}}
| shortcut | command          |
|----------|------------------|
| ps       | push             |
| pom      | push origin main |

{{< align align="center" bold=" " text="Undo and clean the tree." >}}
| shortcut | command      |
|----------|--------------|
| rv       | revert       |
| rs       | reset        |
| rh       | reset --hard |
| cfd      | clean -fd    |
| cdf      | clean -fd    |

{{< align align="center" bold=" " text="Remote links actions." >}}
| shortcut | command        |
|----------|----------------|
| rmt      | remote         |
| rmtv     | remote -v      |
| rmta     | remote add     |
| rmtsu    | remote set-url |


## Some resources.
- the [official](https://git-scm.com/) page.
- the Arch [wiki](https://wiki.archlinux.org/title/git) page.
- an interactive and visual [tutorial](https://learngitbranching.js.org/) to learn `git`.

## Dependencies.
No dependencies.

## Manual installation process.
- install the `git` command.
- copy [`.gitconfig`] inside your `~/` directory.
- **DO NOT FORGET** to replace my name and email address with yours!

in a nutshell and to be adapted:
```bash
sudo pacman -Syu git
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.gitconfig ~/.gitconfig
```

{{< code align="center"
         text="--------------------------------------------------------------------">}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`.gitconfig`]: https://github.com/a2n-s/dotfiles/blob/main/.gitconfig
