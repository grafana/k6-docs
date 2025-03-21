---
title: 'up(key)'
description: 'Dispatches a `keyup` event. This is useful for simulating releasing a key.'
---

# up(key)

Dispatches a `keyup` event. This is useful for simulating releasing a key.

| Parameter | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| key       | string | Name of the key to release, such as `Enter`. |

### Returns

| Type            | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the `keyup` event has been dispatched. |
