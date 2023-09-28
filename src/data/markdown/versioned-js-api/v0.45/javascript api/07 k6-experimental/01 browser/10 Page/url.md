---
title: 'url()'
excerpt: 'Browser module: page.url method'
---

Returns the page's URL.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string               | The page's URL.                                              |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.url());
}
```

</CodeGroup>