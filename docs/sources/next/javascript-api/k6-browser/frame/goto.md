---
title: 'goto(url[, options])'
description: 'Browser module: frame.goto(url[, options]) method'
---

# goto(url[, options])

Navigates to the specified URL and returns the main resource response.

Navigating to `about:blank` or navigation to the same URL with a different hash, will succeed and return `null`.

<TableWithNestedRows>

| Parameter         | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url               | string | `''`    | URL to navigate frame to. The url should include scheme, e.g. `https://`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| options           | object | `null`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| options.referer   | string | `''`    | Referer header value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| options.timeout   | number | `30000` | Maximum operation time in milliseconds. Pass `0` to disable the timeout. The default value can be changed via the [browserContext.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaultnavigationtimeout/), [browserContext.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaulttimeout/), [page.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaultnavigationtimeout/) or [page.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaulttimeout/) methods. Setting the value to `0` will disable the timeout. |
| options.waitUntil | string | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

</TableWithNestedRows>

### Events

{{% admonition type="caution" %}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

{{% /admonition %}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type                         | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Promise<Response \| null>` | The [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/)> instance associated with the frame. Else, it returns `null`. |
