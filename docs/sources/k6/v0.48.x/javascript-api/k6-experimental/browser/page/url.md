---
title: 'url()'
description: 'Browser module: page.url method'
---

# url()

Returns the page's URL.

### Returns

| Type   | Description     |
| ------ | --------------- |
| string | The page's URL. |

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
  console.log(page.url());
}
```

{{< /code >}}
