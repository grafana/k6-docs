---
title: 'opener()'
excerpt: 'Browser module: page.mouse method'
---

Returns the page that opened the current page. The first page that is navigated to will have a `null` opener.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| null or [Page](/javascript-api/k6-experimental/browser/page/)              | The `Page` instance. Else, it returns `null`.        |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.opener())
}
```

</CodeGroup>