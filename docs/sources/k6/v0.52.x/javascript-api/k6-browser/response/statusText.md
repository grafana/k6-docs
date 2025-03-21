---
title: 'statusText()'
description: 'Browser module: Response.statusText method'
---

# statusText()

Contains the status text of the response (e.g. usually an "OK" for a success).

### Returns

| Type   | Description                      |
| ------ | -------------------------------- |
| string | The status text of the response. |

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

    console.log(`statusText: ${res.statusText()}`); // statusText: OK
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
