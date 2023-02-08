---
title: 'getAttribute(name, [options])'
excerpt: 'xk6-browser: locator.getAttribute method'
---

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name            | string | `''`    | Attribute name to get the value for.                                                                                                                                                                                                  |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                         |
|--------|-------------------------------------|
| string | The value of the attribute or null. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const textbox = page.locator("#text1");
  const attribute = textbox.getAttribute('onfocus');
  console.log(attribute);
}
```

</CodeGroup>
