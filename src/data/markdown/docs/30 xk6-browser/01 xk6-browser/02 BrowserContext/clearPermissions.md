---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the browser context.'
---

Clears all permission overrides for the browser context.


### Example

<CodeGroup labels={[]}>

```javascript
const context = browser.newContext();
context.grantPermissions(['clipboard-read']);
// do stuff ...
context.clearPermissions();
```

</CodeGroup>
