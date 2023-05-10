---
title: 'reload([options])'
excerpt: 'Browser module: page.reload([options]) method'
---

This reloads the current page and returns the main resource response.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum operation time in milliseconds. Pass `0` to disable the timeout. The default value can be changed via the [browserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/k6-experimental/browser/browsercontext/setdefaultnavigationtimeout/), [browserContext.setDefaultTimeout(timeout)](/javascript-api/k6-experimental/browser/browsercontext/setdefaulttimeout/), [page.setDefaultNavigationTimeout(timeout)](/javascript-api/k6-experimental/browser/page/setdefaultnavigationtimeout/) or [page.setDefaultTimeout(timeout)](/javascript-api/k6-experimental/browser/page/setdefaulttimeout/) methods. Setting the value to `0` will disable the timeout. |
| options.waitUntil | string | `load` | When to consider operation to have succeeded. See [Events](#events) for more details. |

</TableWithNestedRows>

### Events

 <Blockquote mod="attention">

 `networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

 </Blockquote>

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms. 

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.reload();
}
```

</CodeGroup>
