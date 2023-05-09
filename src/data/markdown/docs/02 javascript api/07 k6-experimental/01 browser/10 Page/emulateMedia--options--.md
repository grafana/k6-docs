---
title: 'emulateMedia([options])'
excerpt: 'Browser module: page.emulateMedia([options]) method'
---

This method changes the `CSS media type` through the `media` argument, and/or the `'prefers-colors-scheme'` media feature, using the `colorScheme` argument.

<TableWithNestedRows>

| Parameter              | Type     | Default | Description                                                                                                                                                                                                                           |
|------------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options                | object   | `null`  |                                                                                                                                                                                                                                       |
| options.colorScheme    | string   | `''`    | Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, and `'no-preference'`.                                                                                                                    |
| options.media          | string   | `''`    | Changes the CSS media type of the page. The only allowed values are `'screen'`, and `'print'`.                                                                                                                                        |
| options.reducedMotion  | string   | `''`    | Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`.                                                                                                                                |

</TableWithNestedRows>


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.evaluate(() => matchMedia('screen').matches)); // true
}
```

</CodeGroup>


