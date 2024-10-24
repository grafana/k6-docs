---
title: 'title()'
description: 'Browser module: page.title method'
---

# title()

Returns the page's title.

### Returns

| Type   | Description       |
| ------ | ----------------- |
| string | The page's title. |

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
  console.log(page.title());
}
```

{{< /code >}}
