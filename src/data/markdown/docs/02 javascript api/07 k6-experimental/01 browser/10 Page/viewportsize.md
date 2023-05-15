---
title: 'viewportSize()'
excerpt: 'Browser module: page.viewportSize method'
---

Returns the page's size (width and height).

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| Object               | An object containing the page's width and height.                                               |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  page.setViewportSize({
    width: 640,
    height: 480,
  });
  await page.goto('https://test.k6.io/browser.php');

  console.log(page.viewportSize());
}
```

</CodeGroup>