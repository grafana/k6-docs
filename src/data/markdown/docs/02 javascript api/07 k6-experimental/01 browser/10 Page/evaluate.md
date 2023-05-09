---
title: 'evaluate(pageFunction, [arg])'
excerpt: 'Browser module: page.evaluate(pageFunction, [arg]) method'
---

Returns the value of the `pageFunction` invocation.

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
import { check } from 'k6/http';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const dimensions = page.evaluate(() => {
    const obj = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
    return obj;
  });

  check(dimensions, {
    'width': d => d.width === 1280,
    'height': d => d.height === 720,
    'scale': d => d.deviceScaleFactor === 1,
  });
}
```

</CodeGroup>