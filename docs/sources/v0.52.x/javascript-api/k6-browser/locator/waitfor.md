---
title: 'waitFor([options])'
description: 'Browser module: locator.waitFor method'
---

# waitFor([options])

Wait for the element to be in a particular state e.g. `visible`.

<TableWithNestedRows>

| Parameter       | Type   | Default   | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`    |                                                                                                                                                                                                                                                                                                                     |
| options.state   | string | `visible` | Can be `attached`, `detached`, `visible` or `hidden`.                                                                                                                                                                                                                                                               |
| options.timeout | number | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills once the element is in the desired state. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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

  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator('#input-text-hidden');
  await text.waitFor({
    state: 'hidden',
  });
}
```

{{< /code >}}
