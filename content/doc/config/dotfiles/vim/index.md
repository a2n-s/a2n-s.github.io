---
title: "vim"
date: 2021-12-04
lastMod: 2021-12-10
tags: ["doc", "dotfiles", "editor"]
keywords: ["doc", "dotfiles", "editor"]
description: "My config of vim and how to install it."
---
Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vim.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vim.png"
           title="vim" caption="My vim rice." position="center">}}
{{< figure src="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vim2.png" 
           alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/rice-vim2.png"
           title="vim" caption="A terminal inside vim?." position="center">}}
More pictures of the config [**here**](https://github.com/a2n-s/dotfiles#4-gallery-toc).

{{< code align="center" text="--------------------------------------------------------------------" >}}

{{< image src="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-vim.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/dotfiles/logo-vim.png"
          title="vim's logo" height="150" position="center">}}

"Vim (/vɪm/; a contraction of Vi IMproved) is a free and open-source, screen-based text editor program for Unix."

# Table of Content.
- [The files](#the-files)
- [The config](#the-config)
- [Some resources](#some-resources)
- [Dependencies](#dependencies)
- [Manual installation process](#manual-installation-process)

{{< code align="center" text="--------------------------------------------------------------------" >}}

## The Files.
All files are available at [~/](https://github.com/a2n-s/dotfiles):
- [`.vimrc`]

## The config.
All details can be found in [`vimrc`] but below are some characteristic stuff about the config:
- I can use a terminal directly in the `vim` window.
- the list of my key-bindings ('\\' is the leader key with `let mapleader = "\\"`:
| Key-bindings                                 | What the key-binding does.                                                     |
|----------------------------------------------|--------------------------------------------------------------------------------|
| nnoremap \<leader\>sv :source $MYVIMRC\<cr\> | applies the changes made to .vimrc                                             |
| nnoremap \<leader\>\ :nohlsearch\<CR\>       | turn off search highlighting by pressing \\.                                   |
| nnoremap \<leader\>' ``                      | press `` to jump back to the last cursor position.                             |
| noremap \<leader\>] \<c-w\>=                 | make all splits the same size, as best as vim can do.                          |
| noremap \<leader\>t :%s/\s\+$//\<cr\>        | clears trailling spaces.                                                       |
| nnoremap \<S-j\> :m .+1\<CR\>                | moves lines dowm.                                                              |
| vnoremap \<S-j\> :m '\>+1\<CR\>gv=gv         | moves lines dowm.                                                              |
| nnoremap \<S-k\> :m .-2\<CR\>                | moves lines up.                                                                |
| vnoremap \<S-k\> :m '\<-2\<CR\>gv=gv         | moves lines up.                                                                |
| inoremap jj \<Esc\>                          | type jj to exit insert mode quickly.                                           |
| nnoremap \<space\> :                         | press the space bar to type the : character in command mode.                   |
| nnoremap o o\<esc\>                          | exit insert mode after creating a new line below the current line.             |
| nnoremap O O\<esc\>                          | exit insert mode after creating a new line above the current line.             |
| nnoremap n nzz                               | center the cursor vertically when moving to the next word during a search.     |
| nnoremap N Nzz                               | center the cursor vertically when moving to the previous word during a search. |
| nnoremap Y y$                                | yank from cursor to the end of line.                                           |
| nnoremap \<c-j\> \<c-w\>j                    | navigate to down split by pressing CTRL+j.                                     |
| nnoremap \<c-k\> \<c-w\>k                    | navigate to up split by pressing CTRL+k.                                       |
| nnoremap \<c-h\> \<c-w\>h                    | navigate to left split by pressing CTRL+h.                                     |
| nnoremap \<c-l\> \<c-w\>l                    | navigate to right split by pressing CTRL+l.                                    |
| noremap \<c-up\> \<c-w\>+                    | resize split windows bigger vertically by pressing: CTRL+UP.                   |
| noremap \<c-down\> \<c-w\>-                  | resize split windows smaller vertically by pressing: CTRL+DOWN.                |
| noremap \<c-left\> \<c-w\>\>                 | resize split windows bigger horizontally by pressing: CTRL+LEFT.               |
| noremap \<c-right\> \<c-w\>\<                | resize split windows smaller horizontally by pressing: CTRL+RIGHT.             |
| nnoremap \<F3\> :NERDTreeToggle\<cr\>        | map the F3 key to toggle NERDTree open and close.                              |

- the list of my installed plugins:
| Plugin name             | Plugin link to repository                           |
|-------------------------|-----------------------------------------------------|
| SimpylFold              | https://github.com/tmhedberg/SimpylFold             |
| fzf                     | https://github.com/junegunn/fzf                     |
| vim-floaterm            | https://github.com/voldikss/vim-floaterm            |
| ale                     | https://github.com/dense-analysis/ale               |
| YouCompleteMe           | https://github.com/ycm-core/YouCompleteMe           |
| vim-signify             | https://github.com/mhinz/vim-signify                |
| fzf.vim                 | https://github.com/junegunn/fzf.vim                 |
| vim-cmake               | https://github.com/cdelledonne/vim-cmake            |
| rainbow_parentheses.vim | https://github.com/junegunn/rainbow_parentheses.vim |
| vim-commentary          | https://github.com/tpope/vim-commentary             |
| nerdtree                | https://github.com/preservim/nerdtree               |
| vim-startify            | https://github.com/mhinz/vim-startify               |
| powerline               | https://github.com/powerline/powerline              |
| vim-fugitive            | https://github.com/tpope/vim-fugitive               |
| indentpython.vim        | https://github.com/vim-scripts/indentpython.vim     |
| syntastic               | https://github.com/vim-syntastic/syntastic          |
| gv.vim                  | https://github.com/junegunn/gv.vim                  |
| ctrlp.vim               | https://github.com/kien/ctrlp.vim                   |
| onedark.vim             | https://github.com/joshdick/onedark.vim             |
| vim-rhubarb             | https://github.com/tpope/vim-rhubarb                |
| vim-which-key           | https://github.com/liuchengxu/vim-which-key         |
| FastFold                | https://github.com/Konfekt/FastFold                 |
| vim-flake8              | https://github.com/nvie/vim-flake8                  |

## Some resources.
- the [wikipedia](https://en.wikipedia.org/wiki/Vim_(text_editor)) page.
- the Arch [wiki](https://wiki.archlinux.org/title/vim) page.
- for the hardcore vimmers among you, check [here](https://tuppervim.org/).
- an [introduction](https://www.freecodecamp.org/news/vimrc-configuration-guide-customize-your-vim-editor/) to configuring vim.
- adding python IDE features to vim [here](https://realpython.com/vim-and-python-a-match-made-in-heaven/).

## Dependencies.
- make sure to either run `vim` once with the `.vimrc` file installed or issue `mkdir -p ~/.vim ~/.vim/autoload ~/.vim/backup ~/.vim/color ~/.vim/plugged`.
- a plugin manager: I use `vim-plug` which can be installed with `curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim`
- the `molokai` colorscheme -> can be installed with `cd ~/.vim/colors; curl -o molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim`.

## Manual installation process.
- install the dependencies.
- install the `vim` command.
- copy [`.vimrc`] inside your `~/` directory.

in a nutshell and to be adapted:
```bash
sudo pacman -Syu vim
mkdir -p ~/.vim ~/.vim/autoload ~/.vim/backup ~/.vim/color ~/.vim/plugged
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
cd ~/.vim/colors; curl -o molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim`
git clone git@github.com:a2n-s/dotfiles.git a2n-s_dotfiles
mv a2n-s_dotfiles/.vimrc ~/.vimrc
```
and then run `:PlugInstall` in `vim` to install the plugins.`

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [dotfiles](/public/doc/config/dotfiles), the [doc](/public/doc/config) or the [front page](/public).  

[`.vimrc`]: https://github.com/a2n-s/dotfiles/blob/main/.vimrc
