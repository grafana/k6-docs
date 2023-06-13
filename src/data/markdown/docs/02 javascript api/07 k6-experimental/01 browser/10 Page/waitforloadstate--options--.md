---
title: 'waitForLoadState(state[, options])'
excerpt: 'Browser module: page.waitForLoadState(state[, options]) method'
---

<Blockquote mod="attention">

This method has **known issues**. For details, refer to [#880](https://github.com/grafana/xk6-browser/issues/880).

</Blockquote>

This waits for the given load state to be reached. It will immediately unblock if that lifecycle event has already been received.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| state    | string |  `load`        |  Optional load state to wait for. See [Events](#events) for more details.                                                                                                     |
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

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
import { check } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');
    await submitButton.click();

    page.waitForLoadState(); // waits for the default `load` event

    check(page, {
      header: page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
  }
}
```

</CodeGroup>