---
title: 'waitForNavigation([options])'
description: 'Browser module: frame.waitForNavigation([options]) method'
---

# waitForNavigation([options])

Waits for the given navigation lifecycle event to occur and returns the main resource response.

<TableWithNestedRows>

| Parameter         | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | object | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout   | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| options.waitUntil | string | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                                                         |

</TableWithNestedRows>

### Events

{{% admonition type="caution" %}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

{{< /admonition >}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type                                                                                                      | Description                                                                |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Promise<null \| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/)> | The `Response` instance associated with the frame. Else, it returns `null` |
