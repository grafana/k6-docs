---
title: 'browser()'
excerpt: 'Returns the browser instance that this BrowserContext belongs to.'
---

Returns the [browser](/javascript-api/xk6-browser/browser) instance that this `BrowserContext` belongs to.


### Returns

| Type                                            | Description             |
| ----------------------------------------------  | ----------------------- |
| [Browser](/javascript-api/xk6-browser/browser/) | The Browser instance.   |


### Example

<CodeGroup labels={[]}>

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext();
  const b2 = context.browser();
  b2.close();
}
```

</CodeGroup>
