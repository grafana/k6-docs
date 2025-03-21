---
title: 'getRandomValues'
description: 'getRandomValues fills the passed TypedArray with cryptographically sound random values.'
weight: 01
---

# getRandomValues

The `getRandomValues()` method fills the passed `TypedArray` with cryptographically sound random values.

## Usage

```
getRandomValues(typedArray)
```

## Parameters

| Name         | Type         | Description                                                                                                                                                                                                      |
| :----------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typedArray` | `TypedArray` | An integer-based `TypedArray` to fill with random values. Accepted `TypedArray` specific types are: `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, or `Uint32Array`. |

## Return Value

The same array is passed as the `typedArray` parameter with its contents replaced with the newly generated random numbers. The `typedArray` parameter is modified in place, and no copy is made.

## Throws

| Type                 | Description                                                               |
| :------------------- | :------------------------------------------------------------------------ |
| `QuotaExceededError` | Thrown when `typedArray` is too large and its `byteLength` exceeds 65536. |

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default function () {
  const array = new Uint32Array(10);
  crypto.getRandomValues(array);

  for (const num of array) {
    console.log(num);
  }
}
```

{{< /code >}}
