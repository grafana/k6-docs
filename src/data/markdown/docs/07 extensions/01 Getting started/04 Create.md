---
title: 'Create'
excerpt: 'Creating k6 extensions does not have to be a daunting task, but there are some prerequisites to succeed.'
---

Sometimes your needs are so specific that you require a custom extension. Creating k6
extensions does not have to be a daunting task, but there are some prerequisites
to succeed.

If you want to create your k6 extension, you _should_:
* be familiar with both Go(lang) and JavaScript as well as their tooling
* understand how the _Go-to-JavaScript_ bridge works within k6 

> You should be committed to maintaining a public repository that keeps up to date 
> with the latest k6 APIs if you intend to share with the community.

## Explore existing options

The first thing you should do before starting work on a new extension is to confirm
that a similar extension doesn't already exist for your use case. Take a look at
the [Extensions listing](/extensions/getting-started/explore) and the [`xk6` topic on GitHub](https://github.com/topics/xk6).

For example, if you can test a system with a generic protocol like _MQTT_, prefer 
utilizing [xk6-mqtt](https://github.com/pmalhaire/xk6-mqtt) rather than creating 
an extension for some custom protocol. 

> Lean toward writing pure JavaScript libraries 
> over building an extension in Go; a JavaScript library will be better supported, 
> more straightforward, and reusable than an extension.

## Determine extension type

Next, you should decide the type of extension you need. 
* A [JavaScript extension](/extensions/getting-started/create/javascript-extensions/) is a good fit if you want 
to extend the JavaScript functionality of your script or add support for a new network protocol to test.
* An [Output extension](/extensions/getting-started/create/output-extensions/) is more suitable if you need 
to process the metrics emitted by k6 or publish them to unsupported backend stores. 

With either option, the k6 APIs you'll need to use and things to consider while developing will differ.
