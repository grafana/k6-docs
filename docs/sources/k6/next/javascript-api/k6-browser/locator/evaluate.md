---
title: 'evaluate(pageFunction[, arg])'
description: 'Browser module: locator.evaluate(pageFunction[, arg]) method'
---

# evaluate(pageFunction[, arg])

Returns the value of the `pageFunction` invocation. It passes the matching element of the locator as the first argument to the `pageFunction` and arg as a second argument.

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
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

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

    await check(page, {
      'pizza name': async p => {
        const n = await p.locator('#pizza-name').evaluate((pizzaName, extra) => pizzaName.textContent + extra, ' Super pizza!');
        return n == 'Our recommendation: Super pizza!';
      }
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
