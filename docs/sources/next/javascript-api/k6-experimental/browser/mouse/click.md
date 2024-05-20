---
title: 'click(x, y[, options])'
description: 'Mouse clicks on the `x` and `y` coordinates.'
---

# click(x, y[, options])

Mouse clicks on the `x` and `y` coordinates. It's a shorthand for calling [`mouse.move(x, y)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/move) followed by [`mouse.down()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/down) and [`mouse.up()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/mouse/up). This is useful for simulating a single mouse click.

| Parameter          | Type   | Description                                                                                              |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| x                  | number | The x-coordinate to click on.                                                                            |
| y                  | number | The y-coordinate to click on.                                                                            |
| options            | object | Optional.                                                                                                |
| options.button     | string | The mouse button to click. Possible values are `'left'`, `'right'`, and `'middle'`. Default is `'left'`. |
| options.clickCount | number | The number of times to click. Default is `1`.                                                            |
| options.delay      | number | The delay in milliseconds between `mousedown` and `mouseup` events. Default is `0`.                      |

### Returns

| Type            | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the mouse click action is complete. |