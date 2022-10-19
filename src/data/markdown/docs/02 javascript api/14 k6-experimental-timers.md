---
title: "k6/experimental/timesr"
excerpt: "k6 timers experimental API"
---

<Blockquote mod="attention" title="The redis module is experimental, use at your own risk">

While we intend to keep this module as simple and stable as possible,
we may need to add features or introduce breaking changes.
This could happen at any time until we release this module as stable.

**Use at your own risk!**

Feel free to provide user feedback, and open an issue or pull request if you have any suggestions.

</Blockquote>


This modules implements the commonly found in browsers:
- SetTimeout, ClearTimeout, SetInterval, ClearInterval


### API

| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)     | sets a function to be run after a given timeout  |
| [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) | clears a previously set timeout with `setTimeout` |
| [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)   | sets a function to be run on a given interval |
| [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) | clears a previously set interval with `setInterval` |
