---
title: 'insertText(text)'
description: 'Dispatches only an `input` event.'
---

# insertText(text)

Dispatches only an `input` event. This is useful for simulating typing text into an input field.

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| text      | string | The text to insert into the input field. |

### Returns

| Type            | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the text has been inserted into the input field. |
