---
title: 'evaluateHandle(pageFunction[, arg])'
description: 'Browser module: page.evaluateHandle(pageFunction[, arg]) method'
---

# evaluateHandle(pageFunction[, arg])

Returns the value of the `pageFunction` invocation as a [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/).

The only difference between `page.evaluate()` and `page.evaluateHandle()` is that `page.evaluateHandle()` returns [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/).

<TableWithNestedRows>

| Parameter    | Type               | Defaults | Description                                                              |
| ------------ | ------------------ | -------- | ------------------------------------------------------------------------ |
| pageFunction | function or string |          | Function to be evaluated in the page context. This can also be a string. |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`                              |

</TableWithNestedRows>

### Returns

| Type                                                                                                  | Description                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/) | The `JSHandle` instance associated with the page. |

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const resultHandle = page.evaluateHandle(() => document.body);
  console.log(resultHandle.jsonValue());
}
```

{{< /code >}}
