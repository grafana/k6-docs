---
title: 'waitForFunction(pageFunction, arg[, options])'
description: 'Browser module: frame.waitForFunction(pageFunction, arg[, options]) method'
---

# waitForFunction(pageFunction, arg[, options])

Returns when the `pageFunction` returns a truthy value.

<TableWithNestedRows>

| Parameter       | Type            | Default | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pageFunction    | function        |         | Function to be evaluated in the page context.                                                                                                                                                                                                                                                                       |
| arg             | string          | `''`    | Optional argument to pass to `pageFunction`                                                                                                                                                                                                                                                                         |
| options         | object          | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.polling | number or `raf` | `raf`   | If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed.                                                                                       |
| options.timeout | number          | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type                                                                                              | Description                                       |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Promise<[JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/)> | The `JSHandle` instance associated with the page. |
