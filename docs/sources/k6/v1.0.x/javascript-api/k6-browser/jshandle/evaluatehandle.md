---
title: 'evaluateHandle(pageFunction[, arg])'
description: 'Browser module: JSHandle.evaluateHandle(pageFunction[, arg]) method'
---

# evaluateHandle(pageFunction[, arg])

Returns the value of the `pageFunction` invocation as a `JSHandle`. It passes this handle as the first argument to the `pageFunction`.

The only difference between [evaluate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/evaluate/) and `evaluateHandle` is that `evaluateHandle` returns [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/).

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
