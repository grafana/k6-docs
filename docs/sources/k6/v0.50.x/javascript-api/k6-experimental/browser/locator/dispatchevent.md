---
title: 'dispatchEvent(type, eventInit, [options])'
description: 'Browser module: locator.dispatchEvent method'
---

# dispatchEvent(type, eventInit, [options])

Dispatches HTML DOM event types e.g. `'click'`.

<TableWithNestedRows>

| Parameter       | Type   | Defaults | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type            | string | `''`     | DOM event type e.g. `'click'`.                                                                                                                                                                                                                                                                                                                |
| eventInit       | object | `null`   | Optional event specific properties. See [eventInit](#eventinit) for more details.                                                                                                                                                                                                                                                             |
| options         | object | `null`   |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout | number | `30000`  | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### eventInit

Since eventInit is event-specific, please refer to the events documentation for the lists of initial properties:

- [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
- [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
- [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
- [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
- [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
- [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const button = page.locator('#counter-button');
  button.dispatchEvent('click');

  page.close();
}
```

{{< /code >}}
