---
title: 'press(key, [options])'
description: 'Browser module: locator.press method'
---

# press(key, [options])

Press a single key on the keyboard or a combination of keys.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key                 | string  | `''`    | Name of the key to press or a character to generate, such as `ArrowLeft` or `a`. A superset of the key values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).                                                                                                                      |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.delay       | number  | `0`     | Milliseconds to wait between `keydown` and `keyup`.                                                                                                                                                                                                                                                                                           |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

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
  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator('#text1');
  text.press('i');
  text.press('ArrowLeft');
  text.press('h');
}
```

{{< /code >}}
