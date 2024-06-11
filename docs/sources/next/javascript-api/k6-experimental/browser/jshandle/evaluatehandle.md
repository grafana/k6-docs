---
title: 'evaluateHandle(pageFunction[, arg])'
description: 'Browser module: JSHandle.evaluateHandle(pageFunction[, arg]) method'
---

# evaluateHandle(pageFunction[, arg])

Evaluates the page function and returns a `JSHandle`. This method passes this handle as the first argument to the page function. Unlike [evaluate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/evaluate/), `evaluateHandle` returns the value as a `JSHandle`

<TableWithNestedRows>

| Parameter    | Type               | Defaults | Description                                  |
| ------------ | ------------------ | -------- | -------------------------------------------- |
| pageFunction | function or string |          | Function to be evaluated.                    |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`. |

</TableWithNestedRows>

### Returns

| Type              | Description                                         |
| ----------------- | --------------------------------------------------- |
| Promise<JSHandle> | A `JSHandle` of the return value of `pageFunction`. |

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

    const obj = await jsHandle.evaluateHandle((handle) => {
      return { innerText: handle.innerText };
    });
    console.log(await obj.jsonValue()); // {"innerText":"< Back...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
