---
title: 'isClosed()'
excerpt: 'Browser module: page.isClosed() method'
canonicalUrl: https://grafana.com/docs/k6
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
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.close();

  console.log(page.isClosed())
}
```

</CodeGroup>
