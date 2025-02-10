---
title: 'waitForSelector(selector[, options])'
description: 'Browser module: elementHandle.waitForSelector method'
---

# waitForSelector(selector[, options])

{{< admonition type="warning" >}}

Use [`locator.waitFor([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/waitfor/) instead.

{{< /admonition >}}

Waits for the element to be present in the DOM and to be visible.

<TableWithNestedRows>

| Parameter       | Type    | Default   | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  |           | A selector to query the element.                                                                                                                                                                                                                                                                                    |
| options         | object  | `null`    | Optional settings.                                                                                                                                                                                                                                                                                                  |
| options.state   | string  | `visible` | The state to wait for. This can be one of `visible`, `hidden`, `stable`, `enabled`, `disabled`, or `editable`.                                                                                                                                                                                                      |
| options.strict  | boolean | `false`   | If set to `true`, the method will throw an error if the element is not found.                                                                                                                                                                                                                                       |
| options.timeout | number  | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type                             | Description                                                                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle \| null>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/) when the element is found. |

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
  await page.goto('https://test.k6.io');

  const element = await page.$('.header');
  const el = await element.waitForSelector('.title');
  // ... do something with the element

  await page.close();
}
```

{{< /code >}}
