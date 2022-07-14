---
title: 'dispatchEvent(type, eventInit, [options])'
excerpt: 'xk6-browser: locator.dispatchEvent method'
---

Dispatches HTML DOM event types e.g. `'click'`.

| Parameter | Type   | Description                                                                       |
|-----------|--------|-----------------------------------------------------------------------------------|
| type      | string | DOM event type e.g. `'click'`.                                                    |
| eventInit | object | Optional event specific properties. See [eventInit](#eventinit) for more details. |
| options   | object | See [options](#options) for more details.                                         |

### eventInit

Since eventInit is event-specific, please refer to the events documentation for the lists of initial properties:

- [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
- [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
- [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
- [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
- [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
- [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

### options

<!-- vale off -->

| Option  | Type   | Default | Description                                                                                                                                                                                                                           |
|---------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto("https://test.k6.io/browser.php");
const button = page.locator("#counter-button");
button.dispatchEvent('click');
```

</CodeGroup>
