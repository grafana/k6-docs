---
title: 'clearPermissions()'
description: 'Clears all permission overrides for the BrowserContext.'
---

# clearPermissions()

Clears all permission overrides for the `BrowserContext`.

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
  const context = browser.newContext();
  context.grantPermissions(['clipboard-read']);
  // do stuff ...
  context.clearPermissions();
}
```

{{< /code >}}
