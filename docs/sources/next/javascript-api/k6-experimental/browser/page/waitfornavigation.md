---
title: 'waitForNavigation([options])'
description: 'Browser module: page.waitForNavigation([options]) method'
---

# waitForNavigation([options])

Waits for the given navigation lifecycle event to occur and returns the main resource response.

<TableWithNestedRows>

| Parameter         | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | object | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout   | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |
| options.waitUntil | string | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                                                         |

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

| Type                                                                                                                   | Description                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Promise<null \| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response/)> | The `Response` instance associated with the page. Else, it returns `null` |

### Example

{{< code >}}

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
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
  }
}
```

{{< /code >}}
