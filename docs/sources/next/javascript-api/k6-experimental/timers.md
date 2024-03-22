---
title: 'timers'
description: 'k6 timers experimental API'
weight: 03
---

# timers

{{< docs/shared source="k6" lookup="experimental-timers-module.md" version="<K6_VERSION>" >}}

This modules implements the commonly found in browsers:

| Function                                                                      | Description                                         |
| :---------------------------------------------------------------------------- | :-------------------------------------------------- |
| [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)     | sets a function to be run after a given timeout     |
| [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) | clears a previously set timeout with `setTimeout`   |
| [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)   | sets a function to be run on a given interval       |
| [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) | clears a previously set interval with `setInterval` |
