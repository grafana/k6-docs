---
title: 'headersArray()'
description: 'Browser module: Request.headersArray method'
---

# headersArray()

An array with all the request HTTP headers. Unlike [request.allHeaders()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/allheaders), header names are not lower-cased. Headers with multiple entries, such as `Set-Cookie`, appear in the array multiple times.

### Returns

| Type                                             | Description                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| `Promise<Array<{ name: string; value: string }>` | A promise that resolves to an array of all the request HTTP headers. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
    const res = await page.goto('https://test.k6.io/');
    const req = res.request();

    const headersArray = await req.headersArray();
    console.log(`headersArray: ${JSON.stringify(headersArray)}`); // headersArray: [{"name":"Accept-Language","value"...}]
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
