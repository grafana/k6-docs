---
title: 'dispatchEvent(selector, type, eventInit[, options])'
description: 'Browser module: page.dispatchEvent(selector, type, eventInit[, options]) method'
---

# dispatchEvent(selector, type, eventInit[, options])

{{% admonition type="warning" %}}

Use locator-based [`locator.dispatchEvent(type, eventInit[, options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/dispatchevent/) instead.

{{% /admonition %}}

Dispatches HTML DOM event types e.g. `'click'`.

<TableWithNestedRows>

| Parameter       | Type    | Defaults | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`     | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| type            | string  | `''`     | DOM event type e.g. `'click'`.                                                                                                                                                                                                                                                                                                                |
| eventInit       | object  | `null`   | Optional event specific properties. See [eventInit](#eventinit) for more details.                                                                                                                                                                                                                                                             |
| options         | object  | `null`   |                                                                                                                                                                                                                                                                                                                                               |
| options.strict  | boolean | `false`  | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout | number  | `30000`  | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### eventInit

Since `eventInit` is event-specific, please refer to the events documentation for the lists of initial properties:

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
  page.dispatchEvent('#counter-button', 'click');
}
```

{{< /code >}}
