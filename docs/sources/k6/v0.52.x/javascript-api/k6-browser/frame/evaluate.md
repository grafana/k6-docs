---
title: 'evaluate(pageFunction[, arg])'
description: 'Browser module: frame.evaluate(pageFunction[, arg]) method'
---

# evaluate(pageFunction[, arg])

Returns the value of the `pageFunction` invocation.

<TableWithNestedRows>

| Parameter    | Type               | Defaults | Description                                                              |
| ------------ | ------------------ | -------- | ------------------------------------------------------------------------ |
| pageFunction | function or string |          | Function to be evaluated in the page context. This can also be a string. |
| arg          | string             | `''`     | Optional argument to pass to `pageFunction`                              |

</TableWithNestedRows>

### Returns

| Type           | Description                                 |
| -------------- | ------------------------------------------- |
| `Promise<any>` | The value of the `pageFunction` invocation. |
