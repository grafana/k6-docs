---
title: javascript-api/k6-timers
---

The [`k6/timers` module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-timers) implements timers to work with k6's event loop. They mimic the functionality found in browsers and other JavaScript runtimes.

| Function                                                                      | Description                                          |
| :---------------------------------------------------------------------------- | :--------------------------------------------------- |
| [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)     | Sets a function to be run after a given timeout.     |
| [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) | Clears a previously set timeout with `setTimeout`.   |
| [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)   | Sets a function to be run on a given interval.       |
| [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) | Clears a previously set interval with `setInterval`. |

{{< admonition type="note" >}}

The timer methods are available globally, so you can use them in your script without including an import statement.

{{< /admonition >}}
