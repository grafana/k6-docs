---
title: 'boundingBox()'
description: 'Browser module: elementHandle.boundingBox() method'
---

# boundingBox()

Returns the bounding box of the element. The bounding box is calculated with respect to the position of the [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame) of the current [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle), which is usually the [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page)'s main frame.

### Returns

| Type                    | Description                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Promise<null \| Rect>` | A Promise that fulfills with the bounding box of the element as a [Rect](#rect). If the element is not visible, the Promise resolves to `null`. |


### Rect

The `Rect` object represents the bounding box of an element.

| Property | Type     | Description                                |
| -------- | -------- | ------------------------------------------ |
| x        | `number` | The x-coordinate of the element in pixels. |
| y        | `number` | The y-coordinate of the element in pixels. |
| width    | `number` | The width of the element in pixels.        |
| height   | `number` | The height of the element in pixels.       |

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
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');

  const element = await page.$('#text1');
  const boundingBox = await element.boundingBox();
  console.log(`x: ${boundingBox.x}, y: ${boundingBox.y}, width: ${boundingBox.width}, height: ${boundingBox.height}`);

  page.close();
}
```

{{< /code >}}