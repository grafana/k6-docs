---
title: 'waitForEvent(event[, optionsOrPredicate])'
description: 'Waits for event to fire and passes its value into the predicate function.'
---

# waitForEvent(event[, optionsOrPredicate])

{{% admonition type="caution" %}}

This method is a work in progress.
It requires async functionality and returning a `Promise` to be useful in scripts.
Refer to <a href="https://github.com/grafana/xk6-browser/issues/447">#447</a> for details.

Consider using the sync methods `Page.waitForNavigation()` and `Page.waitForSelector()` instead.

{{< /admonition >}}

Waits for the event to fire and passes its value into the predicate function. Returns the event data value when the predicate returns `true`.

<TableWithNestedRows>

| Parameter                    | Type             | Default | Description                                                                                                                                        |
| ---------------------------- | ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| event                        | string           | `null`  | Name of event to wait for. **NOTE**: Currently this argument is disregarded, and `waitForEvent` will always wait for `'close'` or `'page'` events. |
| optionsOrPredicate           | function\|object | `null`  | Optional. If it's a function, the `'page'` event data will be passed to it and it must return `true` to continue.                                  |
| optionsOrPredicate.predicate | function         | `null`  | Function that will be called when the `'page'` event is emitted. The event data will be passed to it and it must return `true` to continue.        |
| optionsOrPredicate.timeout   | number           | `30000` | Maximum time to wait in milliseconds. Pass `0` to disable timeout.                                                                                 |

</TableWithNestedRows>

### Returns

| Type   | Description                                                                                          |
| ------ | ---------------------------------------------------------------------------------------------------- |
| object | [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) object |
