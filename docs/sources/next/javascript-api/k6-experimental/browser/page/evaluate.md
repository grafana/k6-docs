---
title: 'evaluate(pageFunction[, arg])'
description: 'Browser module: page.evaluate(pageFunction[, arg]) method'
---

# evaluate(pageFunction[, arg])

Returns the value of the `pageFunction` invocation.

<TableWithNestedRows>

| Parameter    | Type               | Defaults | Description                                                              |
| ------------ | ------------------ | -------- | ------------------------------------------------------------------------ |
| pageFunction | function or string |          | Function to be evaluated in the page context. This can also be a string. |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`                              |

</TableWithNestedRows>

### Returns

| Type | Description                                 |
| ---- | ------------------------------------------- |
| any  | The value of the `pageFunction` invocation. |

### Example

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6/http';

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
  const dimensions = page.evaluate(() => {
    const obj = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
    return obj;
  });

  check(dimensions, {
    width: (d) => d.width === 1280,
    height: (d) => d.height === 720,
    scale: (d) => d.deviceScaleFactor === 1,
  });
}
```

{{< /code >}}
