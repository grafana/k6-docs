---
title: 'inputValue([options])'
description: 'Browser module: locator.inputValue method'
---

# inputValue([options])

Returns `input.value` for the selected `input`, `textarea` or `select` element.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `Promise<string>` | A Promise that fulfills with the input value of the element. |

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
  const textInput = page.locator('#text1');
  await textInput.fill('Hello world!');
  console.log(await textInput.inputValue());
}
```

{{< /code >}}
