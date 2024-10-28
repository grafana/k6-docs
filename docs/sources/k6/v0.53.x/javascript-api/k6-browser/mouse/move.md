---
title: 'move(x, y[, options])'
description: 'Mouse moves to the `x` and `y` coordinates.'
---

# move(x, y[, options])

Mouse moves to the `x` and `y` coordinates. This is useful for simulating mouse movement. The `step` option is the number of steps the mouse will take to move from the current position to the target position. The higher the step count, the smoother the movement will be.

| Parameter     | Type   | Description                                                    |
| ------------- | ------ | -------------------------------------------------------------- |
| x             | number | The x-coordinate to move to.                                   |
| y             | number | The y-coordinate to move to.                                   |
| options       | object | Optional.                                                      |
| options.steps | number | The number of steps to take to move the mouse. Default is `1`. |

### Returns

| Type            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the mouse up action is complete. |
