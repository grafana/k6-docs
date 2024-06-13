---
title: 'asElement()'
description: 'Browser module: JSHandle.asElement method'
---

# asElement()

Returns either `null` or the object handle itself, provided the object handle is an instance of [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/).

### Returns

| Type                  | Description                     |
| --------------------- | ------------------------------- |
| ElementHandle \| null | The ElementHandle if available. |

### Example

{{< code >}}

<!-- eslint-skip -->

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
    await page.goto('https://test.k6.io/');
    const jsHandle = await page.evaluateHandle(() => document.head);

    const element = jsHandle.asElement();
    console.log(await element.innerHTML()); // <main class="page">...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
