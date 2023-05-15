---
title: 'isClosed()'
excerpt: 'Browser module: page.isClosed() method'
---

<Blockquote mod="attention">

This method has **known issues**. For details, refer to [#878](https://github.com/grafana/xk6-browser/issues/878).

</Blockquote>

Checks if the page has been closed.

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the page has been closed, else `false`. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.close();

  console.log(page.isClosed())
}
```

</CodeGroup>
