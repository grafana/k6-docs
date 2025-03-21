---
title: 'headerValue(name)'
description: 'Browser module: Response.headerValue method'
---

# headerValue(name)

Returns the value of the header matching the name. The name is case insensitive.

<TableWithNestedRows>

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| name      | string | Header name to retrieve values for. |

</TableWithNestedRows>

### Returns

| Type                      | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `Promise<string \| null>` | A promise that resolves to the value of the header matching the name, otherwise `null`. |

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

    const headerValue = await res.headerValue('connection');
    console.log(`headerValue: ${headerValue}`); // headerValue: keep-alive
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
