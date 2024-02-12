---
title: 'isClosed()'
description: 'Browser module: page.isClosed() method'
---

# isClosed()

{{% admonition type="caution" %}}

This method has **known issues**. For details, refer to [#878](https://github.com/grafana/xk6-browser/issues/878).

{{% /admonition %}}

Checks if the page has been closed.

### Returns

| Type | Description                                       |
| ---- | ------------------------------------------------- |
| bool | `true` if the page has been closed, else `false`. |

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  page.close();

  console.log(page.isClosed());
}
```

{{< /code >}}
