---
title: 'waitForEvent(event[, optionsOrPredicate])'
description: 'Waits for event to fire and returns its value.'
---

Waits for the event to fire and returns its value. If a predicate function has been set it will pass the value to the predicate function, which must return `true` for the promise to resolve.

<TableWithNestedRows>

| Parameter                    | Type             | Default | Description                                                                                                                                           |
| ---------------------------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| event                        | string           | `null`  | Name of event to wait for. Currently the `'page'` event is the only one that is supported.                                                            |
| optionsOrPredicate           | function\|object | `null`  | Optional. If it's a function, the `'page'` event data will be passed to it and it must return `true` to continue.                                     |
| optionsOrPredicate.predicate | function         | `null`  | Optional. Function that will be called when the `'page'` event is emitted. The event data will be passed to it and it must return `true` to continue. |
| optionsOrPredicate.timeout   | number           | `30000` | Optional. Maximum time to wait in milliseconds.                                                                                                       |

</TableWithNestedRows>

### Returns

| Type            | Description                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<Page>` | A Promise that fulfills with a [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page) object when the `page` event has been emitted. |

### Example

This API is useful when you want to wait for the new page to open after clicking on a link that opens in a new tab.

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/browser';

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
  },
};

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/');

  await page.keyboard.down('ControlOrMeta');

  // Open the link in a new tab with the help of the meta key.
  // Wait for the new page to be created.
  const browserContext = browser.context();
  const [newTab] = await Promise.all([
    browserContext.waitForEvent('page'),
    await page.locator('a[href="/my_messages.php"]').click(),
  ]);

  await page.keyboard.up('ControlOrMeta');

  // Wait for the new page (tab) to load.
  await newTab.waitForLoadState('load');

  // Take screenshots of each page.
  await page.screenshot({ path: `screenshot-page.png` });
  await newTab.screenshot({ path: `screenshot-newTab.png` });

  await newTab.close();
  await page.close();
}
```

</CodeGroup>

Here's an example working with the predicate:

<CodeGroup labels={[]}>

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
  const context = await browser.newContext();

  // Call waitForEvent with a predicate which will return true once at least
  // one page has been created.
  let counter = 0;
  const promise = await context.waitForEvent('page', {
    predicate: (page) => {
      if (++counter >= 1) {
        return true;
      }
      return false;
    },
  });

  // Now we create a page.
  const page = await context.newPage();

  // Wait for the predicate to pass.
  await promise;
  console.log('predicate passed');

  await page.close();
}
```

</CodeGroup>
