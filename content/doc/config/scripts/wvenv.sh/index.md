---
title: "wvenv."
date: 2021-12-04
lastMod: 2021-12-09 
tags: ["doc", "scripts"]
keywords: ["doc", "scripts"]
description: "Shows information about the current python virtual environment."
---
Go back to the [scripts](/public/doc/config/scripts), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

script can be found [here](https://github.com/a2n-s/dotfiles/blob/main/scripts/wvenv.sh).


## Dependencies for wvenv.
`wvenv` will not crash without these, but the output might be unpredictable.  
- `which` to know where the command is located.
- `python`, `python3` the python interpreters.
- `pip`, `pip3` the python package managers.
- `jupyter`, `jupyter-notebook` to edit and see jupyter notebooks.

Notes:
- I really highly recommend you, once you have installed python on the system, to install `virtualenv`, `pyenv`, `conda`, or similar
and NEVER intall `python` package on you system directly!
- instead, create a sane virtual environment with your prefered environment manager above and install everything in it.
- one can use multiple environments for different purposes. For instance a dedicated environment for `jupyter`
(it is a pain to uninstall from the main system), another one for machine learning stuff, and so on...

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [scripts](/public/doc/config/scripts), the [doc](/public/doc/config) or the [front page](/public).  
