---
title: 'content()'
excerpt: 'Browser module: page.content method'
---

Gets the HTML contents of the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string               | The HTML contents of the page.                                                                  |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.content()); // HTML content printed in the console
}
```

</CodeGroup>


