---
title: 'headerValues(name)'
description: 'Browser module: Response.headerValues method'
---

# headerValues(name)

Returns all values of the headers matching the name, for example `set-cookie`. The name is case insensitive.

<TableWithNestedRows>

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| name      | string | Header name to retrieve values for. |

</TableWithNestedRows>

### Returns

| Type                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `Promise<string \| null>` | A promise that resolves to an array of header values for the given name. |

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

    const headerValues = await res.headerValues('connection');
    console.log(`headerValues: ${headerValues}`); // headerValues: keep-alive
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
