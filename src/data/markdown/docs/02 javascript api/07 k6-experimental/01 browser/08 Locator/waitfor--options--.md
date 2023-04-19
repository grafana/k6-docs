---
title: 'waitFor([options])'
excerpt: 'Browser module: locator.waitFor method'
---

<Blockquote mod="attention">

This feature has **known issues**. For details,
refer to [#472](https://github.com/grafana/xk6-browser/issues/472).

</Blockquote>

Wait for the element to be in a particular state e.g. `visible`.

<TableWithNestedRows>

| Parameter       | Type   | Default   | Description                                                                                                                                                                                                                           |
|-----------------|--------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`    |                                                                                                                                                                                                                      |
| options.state   | string | `visible` | Can be `attached`, `detached`, `visible` or `hidden`.                                                                                                                                                                                 |
| options.timeout | number | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
	const text = page.locator('#input-text-hidden');
	text.waitFor({
			state: 'hidden',
	});  
}
```

</CodeGroup>
