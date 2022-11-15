---
title: 'clearPermissions()'
excerpt: 'Clears all permission overrides for the BrowserContext.'
---

<Blockquote mod="warning">

See [issue #443](https://github.com/grafana/xk6-browser/issues/443) for details of a known issue.

</Blockquote>

Clears all permission overrides for the `BrowserContext`.


### Example

<CodeGroup labels={[]}>

[//]: # (eslint-skip)

```javascript
const context = browser.newContext();
context.grantPermissions(['clipboard-read']);
// do stuff ...
context.clearPermissions();
```

</CodeGroup>
