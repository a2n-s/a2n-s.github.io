---
title: "vim"
date: 2021-04-12
tags: ["doc", "programs", "editor"]
keywords: ["doc", "programs", "editor"]
description: "My config of vim and how to install it."
---
Go back to the [programs](/public/doc/config/programs), the [doc](/public/doc/config) or the [front page](/public).  

{{< image src="https://a2n-s.github.io/public/res/doc/config/programs/vim-logo.png" 
          alt="https://a2n-s.github.io/public/res/doc/config/programs/vim-logo.png"
          title="vim's logo" height="150" position="center">}}

"Vim (/vɪm/; a contraction of Vi IMproved) is a free and open-source, screen-based text editor program for Unix."

## Some resources.
- the wikipedia page [here](https://en.wikipedia.org/wiki/Vim_(text_editor)).
- the arch wiki page [here](https://wiki.archlinux.org/title/vim).
- for the hardcore vimmers among you, check [here](https://tuppervim.org/).
- an introduction to configuring vim [here](https://www.freecodecamp.org/news/vimrc-configuration-guide-customize-your-vim-editor/).
- adding python IDE features to vim [here](https://realpython.com/vim-and-python-a-match-made-in-heaven/).

## Dependencies for vim.
- make sure to either run `vim` once with the `.vimrc` file installed or issue `mkdir -p ~/.vim ~/.vim/autoload ~/.vim/backup ~/.vim/color ~/.vim/plugged`.
- a plugin manager: I use `vim-plug` which can be installed with `curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim`
- the `molokai` colorscheme -> can be installed with `cd ~/.vim/colors; curl -o molokai.vim https://raw.githubusercontent.com/tomasr/molokai/master/colors/molokai.vim`.

## Install vim.
- install the dependencies.
- install the `vim` command.
- copy [`.vimrc`] inside your `~/` directory.

## Gallery.
Available soon.  
Snippets on the [dotfiles](https://github.com/a2n-s/dotfiles#4-gallery-toc) repo.

Go back to the [programs](/public/doc/config/programs), the [doc](/public/doc/config) or the [front page](/public).  

[`.vimrc`]: https://github.com/a2n-s/dotfiles/blob/main/.vimrc
