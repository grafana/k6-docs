---
title: 'evaluateHandle(pageFunction[, arg])'
description: 'Browser module: frame.evaluateHandle(pageFunction[, arg]) method'
---

# evaluateHandle(pageFunction[, arg])

Executes JavaScript code in the page and returns the value of the `pageFunction` invocation as a [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/).

The only difference between `page.evaluate()` and `page.evaluateHandle()` is that `page.evaluateHandle()` returns [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/).


| Parameter    | Type               | Defaults | Description                                                              |
| ------------ | ------------------ | -------- | ------------------------------------------------------------------------ |
| pageFunction | function or string |          | Function to be evaluated in the page context. This can also be a string. |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`                              |


### Returns

| Type                | Description                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<JSHandle>` | The [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/) instance associated with the frame. |
