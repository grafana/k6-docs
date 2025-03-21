---
title: 'version()'
description: 'Browser module: version method'
---

# version()

Returns the browser application's version.

### Returns

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | The browser application's version. |

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

export default function () {
  const version = browser.version();
  console.log(version); // 105.0.5195.52
}
```

{{< /code >}}
