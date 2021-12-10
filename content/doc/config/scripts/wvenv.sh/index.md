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

Script can be found [here](https://github.com/a2n-s/dotfiles/blob/main/scripts/wvenv.sh) with following header:
```
Description:  prints some information about the current virtual
              python environment running.
              an example when not inside a virtual environment.
                    command |                    path (version)
                   ---------+-------------------------------------------------------
                    python  | /usr/bin/python (Python 3.9.9)
                       pip  | /usr/bin/pip (pip 20.3.4)
                   python3  | /usr/bin/python3 (Python 3.9.9)
                      pip3  | /usr/bin/pip3 (pip 20.3.4)
                   jupyter  | --
                   notebook | -- (--)

              an example when inside a virtual environement, with jupyter installed.
                    command |                    path (version)
                   ---------+-------------------------------------------------------
                    python  | /home/ants/.venvs/ml/bin/python (Python 3.9.9)
                       pip  | /home/ants/.venvs/ml/bin/pip (pip 21.3.1)
                   python3  | /home/ants/.venvs/ml/bin/python3 (Python 3.9.9)
                      pip3  | /home/ants/.venvs/ml/bin/pip3 (pip 21.3.1)
                   jupyter  | /home/ants/.venvs/ml/bin/jupyter
                   notebook | /home/ants/.venvs/ml/bin/jupyter-notebook (6.4.6)
Dependencies: python, pip, and jupyter, jupyter-notebook to have full information but required.
License:      https://github.com/a2n-s/dotfiles/LICENSE 
Contributors: Stevan Antoine
```

Notes:
- I really highly recommend you, once you have installed python on the system, to install `virtualenv`, `pyenv`, `conda`, or similar
and NEVER intall `python` package on you system directly!
- instead, create a sane virtual environment with your prefered environment manager above and install everything in it.
- one can use multiple environments for different purposes. For instance a dedicated environment for `jupyter`
(it is a pain to uninstall from the main system), another one for machine learning stuff, and so on...

{{< code align="center" text="--------------------------------------------------------------------" >}}

Go back to the [scripts](/public/doc/config/scripts), the [doc](/public/doc/config) or the [front page](/public).  
