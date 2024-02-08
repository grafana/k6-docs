---
title: 'content()'
description: 'Browser module: page.content method'
---

# content()

Gets the HTML contents of the page.

### Returns

| Type   | Description                    |
| ------ | ------------------------------ |
| string | The HTML contents of the page. |

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
  console.log(page.content()); // HTML content printed in the console
}
```

{{< /code >}}
