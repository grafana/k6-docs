---
title: 'randomItem(array)'
description: 'Random item from an array'
weight: 42
---

# randomItem(array)

Function returns a random item from an array.

| Parameter    | Type  | Description       |
| ------------ | ----- | ----------------- |
| arrayOfItems | array | Array [] of items |

### Returns

| Type | Description                |
| ---- | -------------------------- |
| any  | Random item from the array |

### Example

{{< code >}}

```javascript
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const names = ['John', 'Jane', 'Bert', 'Ed'];

export default function () {
  const randomName = randomItem(names);
  console.log(`Hello, my name is ${randomName}`);
}
```

{{< /code >}}
