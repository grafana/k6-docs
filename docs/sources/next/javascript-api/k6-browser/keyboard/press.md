---
title: 'press(key[, options])'
description: 'Dispatches a `keydown` event followed by a `keyup` event. This is useful for simulating pressing and releasing a key.'
---

# press(key[, options])

Dispatches a `keydown` event followed by a `keyup` event. This is useful for simulating pressing a key.

| Parameter     | Type   | Default | Description                                                             |
| ------------- | ------ | ------- | ----------------------------------------------------------------------- |
| key           | string | `''`    | Name of the key to press, such as `Enter`.                              |
| options       | object | `null`  | Optional settings.                                                      |
| options.delay | number | `0`     | Optional. Time to wait before running the press action in milliseconds. |

### Returns

| Type            | Description                                            |
| --------------- | ------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the key has been pressed. |
