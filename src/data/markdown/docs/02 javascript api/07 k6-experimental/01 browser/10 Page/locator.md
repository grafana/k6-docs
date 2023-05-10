---
title: 'locator(selector)'
excerpt: 'Browser module: page.locator(selector) method'
---

The method returns an element [Locator](/javascript-api/k6-experimental/browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying dom changes.


| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector        | string  | `''`    |  A selector to use when resolving DOM element.                                                                                                               |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const textbox = page.locator("#text1");
  textbox.focus();
}
```

</CodeGroup>