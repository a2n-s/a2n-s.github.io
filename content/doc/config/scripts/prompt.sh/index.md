---
title: "prompt.sh"
date: 2021-12-04
lastMod: 2021-12-09
tags: ["doc", "scripts"]
keywords: ["doc", "scripts"]
description: "A binary prompt."
---
Go back to the [scripts](/public/doc/config/scripts), the [doc](/public/doc/config) or the [front page](/public).  

{{< code align="center" text="--------------------------------------------------------------------" >}}

File is [here](https://github.com/a2n-s/dotfiles/blob/main/scripts/prompt.sh) with following header:
```
Description:  a dmenu binary prompt inspired by https://www.youtube.com/watch?v=R9m723tAurA 
              Gives a dmenu prompt labeled with $1 and ask to perform command $2.

              For example:
              ~/scripts/prompt "Do you really want to shutdown your machine?" "shutdown -h now"
              will ask you before shutting down.
Dependencies: dmenu
License:      https://github.com/a2n-s/dotfiles/LICENSE 
Contributors: Stevan Antoine
```
