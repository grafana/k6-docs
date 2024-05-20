---
title: 'down([options])'
description: 'Mouse dispatches a `mousedown` event on the current position of the mouse.'
---

# down([options])

Dispatches a `mousedown` event on the mouse's current position. Mouse can be moved to a different position using [`mouse.move()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/move).

| Parameter          | Type   | Description                                                                                              |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| options            | object | Optional.                                                                                                |
| options.button     | string | The mouse button to click. Possible values are `'left'`, `'right'`, and `'middle'`. Default is `'left'`. |
| options.clickCount | number | The number of times to click. Default is `1`.                                                            |

### Returns

| Type            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the mouse down action is complete. |