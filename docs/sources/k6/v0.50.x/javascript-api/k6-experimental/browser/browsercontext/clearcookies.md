---
title: 'clearCookies()'
description: 'Clears context cookies.'
---

# clearCookies()

Clears the `BrowserContext`'s cookies.

### Example

{{< code >}}

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
};

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();

  await page.goto('https://httpbin.org/cookies/set?testcookie=testcookievalue');
  console.log(context.cookies().length); // prints: 1

  context.clearCookies();
  console.log(context.cookies().length); // prints: 0
}
```

{{< /code >}}
