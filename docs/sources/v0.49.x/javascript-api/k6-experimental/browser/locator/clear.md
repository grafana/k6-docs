---
title: 'clear([options])'
description: 'Browser module: locator.clear method'
---

# clear([options])

Clears text boxes and input fields (`input`, `textarea` or `contenteditable` elements) of any existing values.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                                                 |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Example

{{< code >}}

```javascript
import { check } from 'k6';
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
  },
};

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();

  await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

  // Fill an input element with some text that we will later clear.
  page.locator('input[name="login"]').type('admin');

  // This checks that the element has been filled with text.
  check(page, {
    not_empty: (p) => p.locator('input[name="login"]').inputValue() != '',
  });

  // Now clear the text from the element.
  page.locator('input[name="login"]').clear();

  // This checks that the element is now empty.
  check(page, {
    empty: (p) => p.locator('input[name="login"]').inputValue() == '',
  });

  page.close();
}
```

{{< /code >}}
