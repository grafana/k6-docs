---
title: 'setViewportSize(viewportSize)'
description: 'Browser module: page.setViewportSize(viewportSize) method'
---

# setViewportSize(viewportSize)

This will update the page's width and height.

<TableWithNestedRows>

| Parameter           | Type   | Default | Description                                                                          |
| ------------------- | ------ | ------- | ------------------------------------------------------------------------------------ |
| viewportSize        | Object |         | An object containing the additional HTTP headers. All header values must be strings. |
| viewportSize.width  | number |         | Page width in pixels.                                                                |
| viewportSize.height | number |         | Page height in pixels.                                                               |

</TableWithNestedRows>

### Example

{{< code >}}

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
};

export default async function () {
  const page = browser.newPage();

  page.setViewportSize({
    width: 640,
    height: 480,
  });
  await page.goto('https://test.k6.io/browser.php');
}
```

{{< /code >}}
