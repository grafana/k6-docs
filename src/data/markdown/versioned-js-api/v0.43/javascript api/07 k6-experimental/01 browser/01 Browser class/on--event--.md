---
title: 'on(event)'
excerpt: 'Browser module: Browser.on method'
---

Detects events from the browser application.

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| event     | string | The only accepted event value is `'disconnected'`. |

### Returns

The returned promise will be resolved when the [Browser](/javascript-api/k6-experimental/browser/browser-class/) disconnects from the browser application. Possible reasons for this might be happening as follows:

* Closed or crashed browser application.
* Calling of the [browser.close()](/javascript-api/k6-experimental/browser/browser-class/close) method.

| Type    | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| promise | On returns a Promise that is resolved when the browser process is disconnected. |

### Example

```javascript
import { chromium } from 'k6/experimental/browser';
import { check, sleep } from 'k6';

export default function () {
  const browser = chromium.launch();

  check(browser, {
    'should be connected after launch': browser.isConnected(),
  });

  const handlerCalled = Symbol();

  const p = browser
    .on('disconnected')
    // The promise resolve/success handler
    .then(
      (val) => {
        check(browser, {
          'should be disconnected on event': !browser.isConnected(),
        });
        return handlerCalled;
        // The promise reject/failure handler
      },
      (val) => {
        console.error(`promise rejected: ${val}`);
      }
    );

  p.then((val) => {
    check(val, {
      'the browser.on success handler should be called': val === handlerCalled,
    });
  });

  check(browser, {
    'should be connected before ending iteration': browser.isConnected(),
  });

  // Disconnect from the browser instance.
  browser.close();
}
```