---
title: 'pressSequentially(text, [options])'
description: 'Browser module: locator.pressSequentially(text[, options]) method'
---

# pressSequentially(text, [options])

Focuses the element and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

This method is useful for simulating real user typing behavior when the page has special keyboard event handling, such as input validation, autocomplete, or character counters that trigger on individual key presses. For simple text input without special keyboard handling, use [fill()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/fill/) instead as it's faster and more reliable.

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text                | string  | `''`    | Text to type into the focused element character by character.                                                                                                                                                                                                                                                                                 |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.delay       | number  | `0`     | Milliseconds to wait between key presses. Defaults to `0`.                                                                                                                                                                                                                                                                                    |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |


### Returns

| Type            | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the text has been typed into the element. |

### Examples

#### Basic usage

<!-- md-k6:skip -->
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
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    // Type text character by character
    const textInput = page.locator('#text1');
    await textInput.pressSequentially('Hello World');
  } finally {
    await page.close();
  }
}
```

#### Typing with delay

This example demonstrates typing text with a delay between keystrokes to simulate realistic user typing speed:

<!-- md-k6:skip -->
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
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    // Type text with 100ms delay between each character
    const searchInput = page.locator('input[type="text"]');
    await searchInput.pressSequentially('test query', { delay: 100 });
  } finally {
    await page.close();
  }
}
```

### Best practices

1. **Use `fill()` for simple text input**: For form fields without special keyboard handling, use [fill()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/fill/) instead as it's significantly faster and more reliable.

2. **Use `pressSequentially()` for interactive input**: Only use `pressSequentially()` when testing features that require gradual typing, such as:
   - Autocomplete suggestions
   - Input validation that triggers per character
   - Character counters
   - Search-as-you-type functionality

3. **Consider performance**: Typing character-by-character is slower than filling text directly. Use this method only when necessary for accurate testing.

4. **Handling special keys**: For special keys like `Enter`, `Tab`, or `Escape`, use [press()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/press/) instead.

### Related

- [fill()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/fill/) - Fill text instantly without keyboard events
- [press()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/press/) - Press special keys or key combinations
- [type()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/type/) - Type text into an input field
