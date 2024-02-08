---
title: 'mouse'
description: 'Browser module: page.mouse method'
---

# mouse

Returns the [Mouse](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/) instance to interact with a virtual mouse on the page.

### Returns

| Type                                                                                            | Description                                    |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Mouse](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/) | The `Mouse` instance associated with the page. |

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
  page.mouse.down();
}
```

{{< /code >}}ß
