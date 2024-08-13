---
title: 'k6/timers'
description: 'k6 timers API'
weight: 11
---

# k6/timers

Implement timers to work with k6's event loop. They mimic the functionality found in browsers and other JavaScript runtimes.

| Function                                                                      | Description                                          |
| :---------------------------------------------------------------------------- | :--------------------------------------------------- |
| [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)     | Sets a function to be run after a given timeout.     |
| [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) | Clears a previously set timeout with `setTimeout`.   |
| [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)   | Sets a function to be run on a given interval.       |
| [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) | Clears a previously set interval with `setInterval`. |

{{< admonition type="note" >}}

The timer methods are available globally, so you can use them in your script without including an import statement.

{{< /admonition >}}

## Example

```javascript
export default function () {
  const intervalId = setInterval(() => {
    console.log('This runs every 200ms');
  }, 200);

  const timeoutId = setTimeout(() => {
    console.log('This runs after 2s');

    // clear the timeout and interval to exit k6
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  }, 2000);
}
```
