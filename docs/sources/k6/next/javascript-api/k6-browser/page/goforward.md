---
title: 'goForward([options])'
description: 'Browser module: page.goForward([options]) method'
---

# goForward([options])

Navigates forward in the browser session history. This method is safer than `page.evaluate(() => window.history.forward())`, which can cause race conditions if the page is mid-navigation.

Returns the main resource response for the navigation, or `null` if the navigation is impossible (e.g., when already at the end of the session history).


| Parameter         | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | object | `null`  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| options.timeout   | number | `30000` | Maximum operation time in milliseconds. Pass `0` to disable the timeout. The default value can be changed via the [browserContext.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaultnavigationtimeout/), [browserContext.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/setdefaulttimeout/), [page.setDefaultNavigationTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaultnavigationtimeout/) or [page.setDefaultTimeout(timeout)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setdefaulttimeout/) methods. Setting the value to `0` will disable the timeout. |
| options.waitUntil | string | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |


### Events

{{< admonition type="caution" >}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

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
    await page.goBack();
    
    // Go forward to second page
    const response = await page.goForward();
    
    // Verify we're back on the second page
    const currentUrl = await page.url();
    check(currentUrl, {
      'went forward to second page': (url) => url.includes('my_messages.php'),
    });
    
    // Verify the response is not null (since navigation was possible)
    check(response, {
      'response is not null': (resp) => resp !== null,
    });
    
    // Attempt to go forward again (should return null since we're at the end of history)
    const nullResponse = await page.goForward();
    check(nullResponse, {
      'goForward at boundary returns null': (resp) => resp === null,
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Related

- [page.goBack()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goback/) - Navigate back in browser history
- [page.goto()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goto/) - Navigate to a specific URL
- [page.reload()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/reload/) - Reload the current page