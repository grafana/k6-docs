---
title: 'randomString(length)'
description: 'Random string'
excerpt: 'Random string'
---

Function returns a random string of a given length.

| Parameter     | Type   | Description |
| ------------- | ------ |  --- |
| length  | int  | Length of the random string |


### Returns

| Type   | Description     |
| -----  | --------------- |
| any    | Random item from the array  |


### Example

<CodeGroup labels={[]}>

```javascript
import { randomString } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export default function () {
  const randomName = randomString(8);
  console.log(`Hello, my name is ${randomName}`);
}
```

</CodeGroup>
