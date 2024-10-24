---
title: 'tap()'
description: 'Browser module: Touchscreen.tap method'
---

# tap()

Simulates a tap (dispatches a `touchstart` and `touchend` events) at the specified coordinates. The `x` and `y` arguments are the coordinates of the tap relative to the top-left corner of the main frame.

<TableWithNestedRows>

| Parameter | Type   | Default | Description       |
| --------- | ------ | ------- | ----------------- |
| x         | number | `0`     | The x coordinate. |
| y         | number | `0`     | The y coordinate. |

</TableWithNestedRows>

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  const page = await browser.newPage({
    hasTouch: true,
  });

  const touchscreen = page.touchscreen;
  await touchscreen.tap(50, 50);
}
```

{{< /code >}}
