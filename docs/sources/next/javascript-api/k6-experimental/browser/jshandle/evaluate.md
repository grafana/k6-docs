---
title: 'evaluate(pageFunction[, arg])'
description: 'Browser module: JSHandle.evaluate(pageFunction[, arg]) method'
---

# evaluate(pageFunction[, arg])

Returns the value of the `pageFunction` invocation. It passes this handle as the first argument to the `pageFunction`.

<TableWithNestedRows>

| Parameter    | Type               | Defaults | Description                                  |
| ------------ | ------------------ | -------- | -------------------------------------------- |
| pageFunction | function or string |          | Function to be evaluated.                    |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`. |

</TableWithNestedRows>

### Returns

| Type         | Description                         |
| ------------ | ----------------------------------- |
| Promise<any> | The return value of `pageFunction`. |

### Example

{{< code >}}

<!-- eslint-skip -->

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
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
    const jsHandle = await page.evaluateHandle(() => document.body);

    const innerHTML = await jsHandle.evaluate((node) => node.innerHTML);
    console.log(innerHTML); // <p><a href="/">&lt; Back</a></p>...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
