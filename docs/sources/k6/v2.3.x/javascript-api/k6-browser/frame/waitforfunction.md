---
title: 'waitForFunction(pageFunction, options[, arg])'
description: 'Browser module: frame.waitForFunction(pageFunction, options[, arg]) method'
---

# waitForFunction(pageFunction, options[, arg])

Returns when the `pageFunction` returns a truthy value.


| Parameter       | Type                         | Default | Description |
| --------------- | ---------------------------- | ------- | ----------- |
| pageFunction    | function                     |         | Function to be evaluated in the page context. |
| options         | object                       | `null`  |  |
| options.polling | number, `raf`, or `mutation` | `raf`   | If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is `'mutation'`, then `pageFunction` is executed on each change to the DOM tree. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. |
| options.timeout | number                       | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| arg             | any                          | `''`    | Optional argument to pass to `pageFunction` |


### Returns

| Type                                                                                                           | Description                                       |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Promise<[JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/)> | The `JSHandle` instance associated with the page. |
