---
title: 'context()'
excerpt: 'Browser module: page.context method'
---

Gets the [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) that the page belongs to.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)               | The `BrowserContext` that the page belongs to.          |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.context()); // prints {"base_event_emitter":{}}
}
```

</CodeGroup>


