---
title: 'setExtraHTTPHeaders(headers)'
excerpt: 'Browser module: page.setExtraHTTPHeaders(headers) method'
canonicalUrl: https://grafana.com/docs/k6
---

This sets extra HTTP headers which will be sent with subsequent HTTP requests.

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| headers        | Object<string, string>  |     |  An object containing the additional HTTP headers. All header values must be strings.                             |

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
  
  page.setExtraHTTPHeaders({ 'foo': 'bar' });
  const url = await page.goto('https://test.k6.io/browser.php');

  console.log(url.request().headers().foo) // prints bar
}
```

</CodeGroup>