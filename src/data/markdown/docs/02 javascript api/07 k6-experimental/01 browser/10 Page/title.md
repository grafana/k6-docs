---
title: 'title()'
excerpt: 'Browser module: page.title method'
---

Returns the page's title.

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| string | The page's title. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.title());
}
```

</CodeGroup>