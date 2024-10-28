---
title: 'isEditable()'
description: 'Browser module: elementHandle.isEditable method'
---

# isEditable()

{{< admonition type="warning" >}}

Use [`locator.isEditable([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/iseditable/) instead.

{{< /admonition >}}

Checks if the element is editable.

### Returns

| Type            | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is editable, else `false`. |

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

  const text = await page.$('#text1');
  const isEditable = await text.isEditable();
  if (isEditable) {
    text.fill('hello world!');
  }

  await page.close();
}
```

{{< /code >}}
