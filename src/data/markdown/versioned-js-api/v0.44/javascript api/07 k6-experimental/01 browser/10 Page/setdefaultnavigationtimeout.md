---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Browser module: page.setDefaultNavigationTimeout(timeout) method'
---

This setting will change the navigation timeout for the following methods:
  - [page.goto(url, [options])](/javascript-api/k6-experimental/browser/page/goto/)
  - [page.reload([options])](/javascript-api/k6-experimental/browser/page/reload/)
  - [page.setContent(html, [options])](/javascript-api/k6-experimental/browser/page/setcontent/)
  - [page.waitForNavigation([options])](/javascript-api/k6-experimental/browser/page/waitfornavigation/)

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout        | number  |     |  Timeout in milliseconds.                              |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  page.setDefaultNavigationTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```

</CodeGroup>