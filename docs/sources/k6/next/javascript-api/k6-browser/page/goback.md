---
title: 'goBack([options])'
description: 'Browser module: page.goBack([options]) method'
---

# goBack([options])

Navigate back in the browser's session history. This method is safer than using `page.evaluate(() => window.history.back())` which can cause race conditions.

Returns the main resource response for the navigation, or `null` if the navigation is impossible (e.g., when already at the beginning of the session history).


| Parameter         | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | object | `null`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| options.timeout   | number | `30000` | Maximum operation time in milliseconds. Pass `0` to disable the timeout. The default value can be changed via the [browserContext.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaultnavigationtimeout/), [browserContext.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaulttimeout/), [page.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaultnavigationtimeout/) or [page.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaulttimeout/) methods. Setting the value to `0` will disable the timeout. |
| options.waitUntil | string | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |


### Events

{{< admonition type="caution" >}}

Avoid using `networkidle` for testing. This event might never fire on websites with high network activity. Instead, use web assertions to assess when the page is ready

{{< /admonition >}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type                       | Description                                                                                                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<Response \| null` | A Promise that fulfills with the [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/)> instance associated with the page, else `null` if navigation is not possible. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'k6';

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
  const page = await browser.newPage();

  try {
    // Navigate to first page
    await page.goto('https://test.k6.io/browser.php');
    const url1 = await page.url();
    
    // Navigate to second page
    await page.goto('https://test.k6.io/my_messages.php');
    const url2 = await page.url();
    
    // Go back to first page
    const response = await page.goBack();
    
    // Verify we're back on the first page
    const currentUrl = await page.url();
    check(currentUrl, {
      'went back to first page': (url) => url.includes('browser.php'),
    });
    
    // Verify the response is not null (since navigation was possible)
    check(response, {
      'response is not null': (resp) => resp !== null,
    });
    
    // Attempt to go back again (should return null since we're at the beginning of history)
    const nullResponse = await page.goBack();
    check(nullResponse, {
      'goBack at boundary returns null': (resp) => resp === null,
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Related

- [page.goForward()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goforward/) - Navigate forward in browser history
- [page.goto()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goto/) - Navigate to a specific URL
- [page.reload()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/reload/) - Reload the current page