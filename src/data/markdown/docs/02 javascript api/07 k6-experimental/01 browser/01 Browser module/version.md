---
title: 'version()'
excerpt: 'Browser module: version method'
---

Returns the browser application's version.

### Returns

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | The browser application's version. |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const version = browser.version();
  console.log(version); // 105.0.5195.52

  browser.close();
}
```

</CodeGroup>
