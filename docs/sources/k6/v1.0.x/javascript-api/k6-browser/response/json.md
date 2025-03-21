---
title: 'json()'
description: 'Browser module: Response.json method'
---

# json()

Returns the JSON representation of response body. Throws if response body is not parsable via `JSON.parse`.

### Returns

| Type           | Description                           |
| -------------- | ------------------------------------- |
| `Promise<any>` | JSON representation of response body. |

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
    const res = await page.goto('https://quickpizza.grafana.com/api/json?foo=bar');

    const json = await res.json();
    console.log(`json: ${JSON.stringify(json)}`); // json: {"foo": "bar"}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
