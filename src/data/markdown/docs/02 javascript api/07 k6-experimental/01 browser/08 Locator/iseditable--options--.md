---
title: 'isEditable([options])'
excerpt: 'Browser module: locator.isEditable method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/locator/iseditable/
---

Checks if the element is `editable`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                        |
|------|----------------------------------------------------|
| bool | `true` if the element is `editable`, else `false`. |

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
	const text = page.locator('#text1');
	if (text.isEditable()) {
			text.fill("hello world!");
	}
}
```

</CodeGroup>
