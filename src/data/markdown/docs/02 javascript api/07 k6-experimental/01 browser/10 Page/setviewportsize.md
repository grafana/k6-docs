---
title: 'setViewportSize(viewportSize)'
excerpt: 'Browser module: page.setViewportSize(viewportSize) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/setviewportsize/
---

This will update the page's width and height.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| viewportSize    | Object |         |  An object containing the additional HTTP headers. All header values must be strings.                             |
| viewportSize.width | number |      | Page width in pixels. |
| viewportSize.height | number |      | Page height in pixels. |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

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
  
  page.setViewportSize({
    width: 640,
    height: 480,
  });
  await page.goto('https://test.k6.io/browser.php');
}
```

</CodeGroup>