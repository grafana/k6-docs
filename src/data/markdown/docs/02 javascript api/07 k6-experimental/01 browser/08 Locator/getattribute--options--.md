---
title: 'getAttribute(name, [options])'
excerpt: 'Browser module: locator.getAttribute method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/locator/getattribute/
---

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name            | string | `''`    | Attribute name to get the value for.                                                                                                                                                                                                  |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                         |
|--------|-------------------------------------|
| string | The value of the attribute or null. |

### Example

<CodeGroup labels={[]}>

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
}

export default async function () {
  const page = browser.newPage();
  await page.goto('https://test.k6.io/browser.php');
  const textbox = page.locator("#text1");
  const attribute = textbox.getAttribute('onfocus');
  console.log(attribute);
}
```

</CodeGroup>
