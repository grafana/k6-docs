---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the BrowserContext.'
---

# clearPermissions()

{{% admonition type="caution" %}}

This feature has known issues.
For details, refer to [issue #443](https://github.com/grafana/xk6-browser/issues/443).

{{% /admonition %}}

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
