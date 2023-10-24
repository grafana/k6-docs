---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the BrowserContext.'
canonicalUrl: https://grafana.com/docs/k6
---

<Blockquote mod="attention">

This feature has known issues.
For details, refer to [issue #443](https://github.com/grafana/xk6-browser/issues/443).

</Blockquote>

Clears all permission overrides for the `BrowserContext`.


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

export default function () {
  const context = browser.newContext();
  context.grantPermissions(['clipboard-read']);
  // do stuff ...
  context.clearPermissions();
}
```

</CodeGroup>
