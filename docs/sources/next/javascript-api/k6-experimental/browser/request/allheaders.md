---
title: 'allHeaders()'
description: 'Browser module: Request.allHeaders method'
---

# allHeaders()

{{% admonition type="caution" %}}

This method has a **known issue**. For details, refer to [#965](https://github.com/grafana/xk6-browser/issues/965).

{{% /admonition %}}

An object of key value pairs made up of HTTP headers associated with the request and the ones that the browser adds (such as cookies). All header names are lower-case.

### Returns

| Type                              | Description                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| `Promise<Record<string, string>>` | A promise that resolves to an object of key value pairs for each header |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

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

    const allHeaders = await req.allHeaders();
    console.log(`allHeaders: ${JSON.stringify(allHeaders)}`); // allHeaders: {"user-agent":"Mozilla/5.0...}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
