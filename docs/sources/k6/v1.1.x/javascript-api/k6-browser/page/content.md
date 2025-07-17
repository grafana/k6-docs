---
title: 'content()'
description: 'Browser module: page.content method'
---

# content()

Gets the HTML contents of the page.

### Returns

| Type                      | Description                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Promise<string \| null>` | A Promise that fulfills with the HTML content of the page as a string value or `null` if the attribute is not present. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  console.log(await page.content()); // HTML content printed in the console
}
```

{{< /code >}}
