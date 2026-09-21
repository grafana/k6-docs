---
title: 'down(key)'
description: 'Dispatches a `keydown` event. This is useful for simulating holding down a key.'
---

# down(key)

Dispatches a `keydown` event. This is useful for simulating holding down a key.

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| key       | string | Name of the key to press, such as `Enter`. |

### Returns

| Type            | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the `keydown` event has been dispatched. |
