---
title: 'waitForFunction(pageFunction, options[, arg])'
description: 'Browser module: page.waitForFunction(pageFunction, options[, arg]) method'
---

# waitForFunction(pageFunction, options[, arg])

Returns when the `pageFunction` returns a truthy value.


| Parameter       | Type                         | Default | Description |
| --------------- | ---------------------------- | ------- | ----------- |
| pageFunction    | function                     |         | Function to be evaluated in the page context. |
| options         | object                       | `null`  |  |
| options.polling | number, `raf`, or `mutation` | `raf`   | If `polling` is `'raf'`, then `pageFunction` is constantly executed in `requestAnimationFrame` callback. If `polling` is `'mutation'`, then `pageFunction` is executed on each change to the DOM tree. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. |
| options.timeout | number                       | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| arg             | any                          | `''`    | Optional argument to pass to `pageFunction` |


### Returns

| Type                                                                                                           | Description                                       |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Promise<[JSHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/)> | The `JSHandle` instance associated with the page. |

### Example

<!-- eslint-skip-->

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

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

  try {
    await page.evaluate(() => {
      setTimeout(() => {
        const el = document.createElement('h1');
        el.innerHTML = 'Hello';
        document.body.appendChild(el);
      }, 1000);
    });

    const ok = await page.waitForFunction("document.querySelector('h1')", {
      polling: 'mutation',
      timeout: 2000,
    });
    await check(ok, {
      'waitForFunction successfully resolved': async (ok) =>
          await ok.innerHTML() == 'Hello'
    });
  } finally {
    await page.close();
  }
}
```
