---
title: 'emulateMedia([options])'
excerpt: 'Browser module: page.emulateMedia([options]) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/emulatemedia/
---

This method changes the CSS `@media type` through the `media` argument, and/or the `'prefers-colors-scheme'` media feature, using the `colorScheme` argument.

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
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.evaluate(() => matchMedia('screen').matches)); // true
}
```

</CodeGroup>


