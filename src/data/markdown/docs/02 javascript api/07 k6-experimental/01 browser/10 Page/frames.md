---
title: 'frames()'
excerpt: 'Browser module: page.frames method'
---

Returns an array of [Frames](/javascript-api/k6-experimental/browser/frame/) on the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [Frames](/javascript-api/k6-experimental/browser/frame/)[]               | An array of `Frames` associated with the page.        |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.frames());
}
```

</CodeGroup>