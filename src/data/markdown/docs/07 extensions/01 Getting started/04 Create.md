---
title: 'Create'
excerpt: 'Creating k6 extensions does not have to be a daunting task, but there are some prerequisites to succeed.'
---

If you find a gap in your testing process that no k6 extension can fix,
consider building your own extension.

These tutorials show you how to create custom JavaScript and output extensions.

* [Create a JavaScript extension](/extensions/getting-started/create/javascript-extensions/)
to extend the JavaScript functionality of your script or add support for a new network protocol to test.
* [Create an Output extension](/extensions/getting-started/create/output-extensions/)
to process the metrics emitted by k6 or publish them to unsupported backend stores.

## Necessary knowledge

Anyone who can use the command line to edit files and install software should be able to follow along.
But, if you want to create an extension for more than the purposes of demonstration,
there's some background knowledge you should have:

* You should be familiar with both Go(lang), JavaScript, and their tooling
* You should understand how the [_Go-to-JavaScript_](/extensions/explanations/go-js-bridge/) bridge works within k6


<Blockquote mod="note" title="">

If you maintain a public xk6 repository,
the community appreciates that it stays up to date with the latest k6 APIs.

</Blockquote>

## Avoid unneeded work

These actions may save you the trouble of building a whole new extension when its not needed.

- Confirm that a similar extension doesn't already exist for your use case. Take a look at
the [Extensions listing](/extensions/getting-started/explore) and the [`xk6` topic on GitHub](https://github.com/topics/xk6).
- Prefer generic solutions. For example, if you can test a system with a generic protocol like _MQTT_, prefer
[xk6-mqtt](https://github.com/pmalhaire/xk6-mqtt) over a new extension for some custom protocol.
- Lean toward writing pure JavaScript libraries over building an extension in Go.
A JavaScript library will be better supported, more straightforward, and reusable than an extension.

