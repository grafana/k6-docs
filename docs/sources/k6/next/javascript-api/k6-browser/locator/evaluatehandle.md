---
title: 'evaluateHandle(pageFunction[, arg])'
description: 'Browser module: locator.evaluateHandle(pageFunction[, arg]) method'
---

# evaluateHandle(pageFunction[, arg])

Returns the value of the `pageFunction` invocation as a `JSHandle`. It passes the matching element of the locator as the first argument to the `pageFunction` and arg as a second argument.

The only difference between [evaluate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/evaluate/) and `evaluateHandle` is that `evaluateHandle` returns [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/).

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
    await page.goto("https://quickpizza.grafana.com", { waitUntil: "load" });

    await page.getByText('Pizza, Please!').click();

    const jsHandle = await page.locator('#pizza-name').evaluateHandle((pizzaName) => pizzaName);

    const obj = await jsHandle.evaluateHandle((handle) => {
      return { innerText: handle.innerText };
    });
    console.log(await obj.jsonValue()); // {"innerText":"Our recommendation:"}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
