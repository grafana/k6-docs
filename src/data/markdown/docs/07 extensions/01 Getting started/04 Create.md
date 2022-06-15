---
title: 'Create'
excerpt: 'Performance testing without limits. This tutorial shows how to write your first k6 extension.'
---


If you want to create your own k6 extension, you will need to be familiar with both Go and JavaScript, understand how the k6 Go<->JS bridge works, and maintain a public repository for the extension that keeps up to date with any breaking API changes while xk6 is being stabilized.

The first thing you should do before starting work on a new extension is to confirm
that a similar extension doesn't already exist for your use case. Take a look at
the [Extensions page](/extensions) and the [`xk6` topic on GitHub](https://github.com/topics/xk6).
For example, if a system you need support for can be tested with a generic protocol
like MQTT, prefer using [xk6-mqtt](https://github.com/pmalhaire/xk6-mqtt)
instead of creating an extension that uses some custom protocol.
Also, prefer to write a pure JavaScript library that can be used in k6 if you can
avoid writing an extension in Go, since a JS library will be better supported and
likely easier to write and reuse than an extension.

Next, you should decide the type of extension you need. A JavaScript extension is a
good fit if you want to extend the JS functionality of your script, or add support
for a new network protocol to test with. An Output extension would be more suitable
if you need to process the metrics emitted by k6 in some way, submit them to a
specific storage backend that was previously unsupported, etc. The k6 APIs you'll
need to use and things to consider while developing will be different in each case.
