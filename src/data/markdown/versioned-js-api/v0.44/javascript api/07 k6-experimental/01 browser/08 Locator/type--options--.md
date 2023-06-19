---
title: 'type(text, [options])'
excerpt: 'Browser module: locator.type method'
---

Type in the text into the input field.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                           |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text                | string  | `''`    | A text to type into a focused element.                                                                                                                                                                                                |
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.delay       | number  | `0`     | Milliseconds to wait between key presses. Defaults to `0`.                                                                                                                                                                            |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator("#text1");
  text.type('hello world!');   
}
```

</CodeGroup>
