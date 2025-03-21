---
title: 'up([options])'
description: 'Mouse dispatches a `mouseup` event on the current position of the mouse.'
---

# up([options])

Dispatches a `mouseup` event on the mouse's current position. Mouse's current position can be changed using [`mouse.move()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/mouse/move).

| Parameter          | Type   | Description                                                                                              |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| options            | object | Optional.                                                                                                |
| options.button     | string | The mouse button to click. Possible values are `'left'`, `'right'`, and `'middle'`. Default is `'left'`. |
| options.clickCount | number | The number of times to click. Default is `1`.                                                            |

### Returns

| Type            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the mouse up action is complete. |
