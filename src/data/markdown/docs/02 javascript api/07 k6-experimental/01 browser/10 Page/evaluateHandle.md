---
title: 'evaluateHandle(pageFunction, [arg])'
excerpt: 'Browser module: page.evaluateHandle(pageFunction, [arg]) method'
---

Returns the value of the `pageFunction` invocation as a [JSHandle](/javascript-api/k6-experimental/browser/jshandle/). 

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns [JSHandle](/javascript-api/k6-experimental/browser/jshandle/).

<TableWithNestedRows>

| Parameter       | Type   | Defaults | Description                                                                                                                                                                                 |
|-----------------|--------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pageFunction    | function or string |          |  Function to be evaluated in the page context. This can also be a string.                                                                                                       |
| arg             | string             | `''`     | Optional argument to pass to `pageFunction`                                                                                                                                     |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const resultHandle = page.evaluateHandle(() => document.body);
  console.log(resultHandle.jsonValue());
}
```

</CodeGroup>