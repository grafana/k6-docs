---
title: 'viewportSize()'
descriptiontion: 'Browser module: page.viewportSize method'
---

# viewportSize()

Returns the page's size (width and height).

### Returns

| Type   | Description                                       |
| ------ | ------------------------------------------------- |
| Object | An object containing the page's width and height. |

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

  console.log(page.viewportSize());
}
```

{{< /code >}}
