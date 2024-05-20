---
title: 'press(key[, options])'
description: 'Dispatches a `keydown` event followed by an `keyup` event. This is useful for simulating pressing and releasing a key.'
---

# press(key[, options])

Dispatches a `keydown` event followed by an `keyup` event. This is useful for simulating pressing and releasing a key.

| Parameter     | Type   | Default | Description                                                     |
| ------------- | ------ | ------- | --------------------------------------------------------------- |
| key           | string | `''`    | Name of the key to press, such as `Enter`.                      |
| options       | object | `null`  | Optional settings.                                              |
| options.delay | number | `0`     | Optional. Time to wait before pressing the key in milliseconds. |

### Returns

| Type            | Description                                            |
| --------------- | ------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the key has been pressed. |
