---
title: 'clearCookies()'
excerpt: 'Clears context cookies.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/browsercontext/clearcookies/
---

Clears the `BrowserContext`'s cookies.

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
  const context = browser.newContext();
  const page = context.newPage();

  await page.goto('https://httpbin.org/cookies/set?testcookie=testcookievalue');
  console.log(context.cookies().length); // prints: 1

  context.clearCookies();
  console.log(context.cookies().length); // prints: 0
}
```

</CodeGroup>
