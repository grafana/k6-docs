---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the BrowserContext.'
---

Clears all permission overrides for the `BrowserContext`.


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const context = browser.newContext();
context.grantPermissions(['clipboard-read']);
// do stuff ...
context.clearPermissions();
```

</CodeGroup>
