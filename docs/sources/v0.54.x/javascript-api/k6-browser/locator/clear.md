---
title: 'clear([options])'
description: 'Browser module: locator.clear method'
---

# clear([options])

Clears text boxes and input fields (`input`, `textarea` or `contenteditable` elements) of any existing values.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                       |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                          |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the clear action is finished. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

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
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://test.k6.io/my_messages.php', {
    waitUntil: 'networkidle',
  });

  // Fill an input element with some text that we will later clear
  const login = page.locator('input[name="login"]');
  await login.type('admin');

  // Check that the element has been filled with text
  await check(login, {
    'not empty': async (lo) => (await lo.inputValue()) != '',
  });

  // Now clear the text from the element
  await login.clear();

  // Check that the element is now empty
  await check(login, {
    empty: async (lo) => (await lo.inputValue()) == '',
  });

  await page.close();
}
```

{{< /code >}}
