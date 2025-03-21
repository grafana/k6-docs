---
title: 'opener()'
description: 'Browser module: page.opener method'
---

# opener()

Returns the page that opened the current page. The first page that is navigated to will have a `null` opener.

### Returns

| Type                                                                                                  | Description                                   |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| null or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) | The `Page` instance. Else, it returns `null`. |

### Example

{{< code >}}

```javascript
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

  await page.goto('https://test.k6.io/browser.php');
  console.log(page.opener());
}
```

{{< /code >}}
