---
title: 'waitForEvent(event[, optionsOrPredicate])'
excerpt: 'Waits for event to fire and passes its value into the predicate function.'
---

<Blockquote mod="warning">

This method is a Work In Progress. It requires async functionality and returning a `Promise` to be useful in scripts. See <a href="https://github.com/grafana/xk6-browser/issues/447">issue #447</a> for details.

Consider using sync methods [Page.waitForNavigation()](/javascript-api/xk6-browser/page/waitfornavigation) and [Page.waitForSelector()](/javascript-api/xk6-browser/page/waitforselector) instead.

</Blockquote>

Waits for the event to fire and passes its value into the predicate function. Returns the event data value when the predicate returns `true`.

| Parameter                    | Type             | Description                                                                                                                                        |
|------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| event                        | string           | Name of event to wait for. **NOTE**: Currently this argument is disregarded, and `waitForEvent` will always wait for `'close'` or `'page'` events. |
| optionsOrPredicate           | function\|object | Optional. If it's a function, the `'page'` event data will be passed to it and it must return `true` to continue.                                  |
| optionsOrPredicate.predicate | function         | Function that will be called when the `'page'` event is emitted. The event data will be passed to it and it must return `true` to continue.        |
| optionsOrPredicate.timeout   | number           | Maximum time to wait in milliseconds. Defaults to `30000` (30s). Pass `0` to disable timeout.                                                      |


### Returns

| Type   | Description                                      |
| ------ | ------------------------------------------------ |
| object | [Page](/javascript-api/xk6-browser/page/) object |
