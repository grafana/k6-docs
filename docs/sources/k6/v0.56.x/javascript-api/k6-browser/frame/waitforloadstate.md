---
title: 'waitForLoadState(state[, options])'
description: 'Browser module: frame.waitForLoadState(state[, options]) method'
---

# waitForLoadState(state[, options])

{{< admonition type="caution" >}}

This method has **known issues**. For details, refer to [#880](https://github.com/grafana/xk6-browser/issues/880).

{{< /admonition >}}

This waits for the given load state to be reached. It will immediately unblock if that lifecycle event has already been received.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state           | string | `load`  | Optional load state to wait for. See [Events](#events) for more details.                                                                                                                                                                                                                                            |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Events

{{< admonition type="caution" >}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

{{< /admonition >}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type            | Description                                             |
| --------------- | ------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the load state is reached. |
