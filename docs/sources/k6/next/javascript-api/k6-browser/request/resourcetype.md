---
title: 'resourceType()'
description: 'Browser module: Request.resourceType method'
---

# resourceType()

Contains the request's resource type as it was perceived by the rendering engine. It will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

### Returns

| Type   | Description         |
| ------ | ------------------- |
| string | Resource type name. |

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

    const resourceType = req.resourceType();
    console.log(`resourceType: ${resourceType}`); // resourceType: Document
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
