---
title: 'type(text[, options])'
description: 'Dispatches a `keydown`, `keypress` or`input`, and `keyup` events for each character in the text.'
---

# type(text[, options])

Dispatches a `keydown`, `keypress` or`input`, and `keyup` events for each character in the text. This is useful for simulating typing text into an input field.

| Parameter     | Type   | Default | Description                                                          |
| ------------- | ------ | ------- | -------------------------------------------------------------------- |
| text          | string | `''`    | The text to type into the input field.                               |
| options       | object | `null`  | Optional settings.                                                   |
| options.delay | number | `0`     | Optional. Time to wait before typing each character in milliseconds. |

### Returns

| Type            | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the text has been typed in the input field. |