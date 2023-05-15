---
title: 'waitForNavigation([options])'
excerpt: 'Browser module: page.waitForNavigation([options]) method'
---

Waits for the given navigation lifecycle event to occur and returns the main resource response.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |
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

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| Promise<null or [Response](/javascript-api/k6-experimental/browser/response/)>               | The `Response` instance associated with the page. Else, it returns `null` |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()])

    check(page, {
      header: page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>