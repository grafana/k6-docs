---
title: 'serverAddr()'
description: 'Browser module: Response.serverAddr method'
---

# serverAddr()

Returns the IP address and port of the server for this response.

### Returns

| Type                        | Description                        |
| --------------------------- | ---------------------------------- |
| Promise<ServerAddr \| null> | Returns [ServerAddr](#serveraddr). |

### ServerAddr

| Property  | Type   | Description        |
| --------- | ------ | ------------------ |
| ipAddress | string | Remote IP address. |
| port      | number | Remote port.       |

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

    const sa = await res.serverAddr();
    console.log(`serverAddr: ${JSON.stringify(sa)}`); // serverAddr: {"ip_address":"18.208.91.74","port":443}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
