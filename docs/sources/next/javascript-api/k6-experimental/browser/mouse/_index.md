---
title: 'Mouse'
description: 'Browser module: Mouse Class'
weight: 09
---

# Mouse

`Mouse` provides a way to interact with a virtual mouse.

| Method                                                                                                                            | Description                                                     |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [mouse.click(x, y[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/click)       | Mouse clicks on the `x` and `y` coordinates.                    |
| [mouse.dblclick(x, y[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/dblclick) | Mouse double clicks on the `x` and `y` coordinates.             |
| [mouse.down([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/down)               | Dispatches a `mousedown` event on the mouse's current position. |
| [mouse.up([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/up)                   | Dispatches a `mouseup` event on the mouse's current position.   |
| [mouse.move(x, y[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/move)         | Dispatches a `mousemove` event on the mouse's current position. |

### Example

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  }
}

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/', {
    waitUntil: 'networkidle'
});

  // Obtain ElementHandle for news link and navigate to it
  // by clicking in the 'a' element's bounding box
  const newsLinkBox = await page.$('a[href="/news.php"]');
  const boundingBox = await newsLinkBox.boundingBox();
  const x = newsLinkBox.x + newsLinkBox.width / 2; // center of the box
  const y = newsLinkBox.y;

  await page.mouse.click(x, y);

  await page.close();
}
```