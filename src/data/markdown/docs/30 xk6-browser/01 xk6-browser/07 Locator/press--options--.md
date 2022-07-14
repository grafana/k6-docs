---
title: 'press(key, [options])'
excerpt: 'xk6-browser: locator.press method'
---

Press a single key on the keyboard or a combination of keys.

| Parameter | Type   | Description                                                                      |
|-----------|--------|----------------------------------------------------------------------------------|
| key       | string | Name of the key to press or a character to generate, such as `ArrowLeft` or `a`. A superset of the key values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values). |
| options   | object | See [options](#options) for more details.                                        |

### options

<!-- vale off -->

| Option      | Type    | Default | Description                                                                                                                                                                                                                           |
|-------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| delay       | number  | `0`     | Milliseconds to wait between `keydown` and `keyup`.                                                                                                                                                                                   |
| noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const text = page.locator('#text1');
text.press('i');
text.press('ArrowLeft');
text.press('h');
```

</CodeGroup>
