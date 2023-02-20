---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the BrowserContext.'
---

<Blockquote mod="attention">

This feature has known issues.
For details, refer to [issue #443](https://github.com/grafana/xk6-browser/issues/443).

</Blockquote>

Clears all permission overrides for the `BrowserContext`.


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.grantPermissions(['clipboard-read']);
  // do stuff ...
  context.clearPermissions();
}
```

</CodeGroup>
