---
title: 'setDefaultTimeout(timeout)'
excerpt: 'Sets the default timeout in milliseconds.'
---

Sets the default maximum timeout for all methods accepting a `timeout` option in milliseconds.

| Parameter | Type   | Default                  | Description                  |
|-----------|--------|--------------------------|------------------------------|
| timeout   | number | Dependent on the action. | The timeout in milliseconds. |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.setDefaultTimeout(1000); // 1s
  const page = context.newPage();
  await page.click('h2'); // times out
}
```

</CodeGroup>
