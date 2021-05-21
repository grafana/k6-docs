---
title: 'randomItem(array)'
description: 'Random item from an array'
excerpt: 'Random item from an array'
---

Function returns a random item from an array.

| Parameter     | Type   | Description |
| ------------- | ------ |  --- |
| arrayOfItems  | array  | Array [] of items |


### Returns

| Type   | Description     |
| -----  | --------------- |
| any    | Random item from the array  |


### Example

<CodeGroup labels={[]}>

```javascript
import { randomItem } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

let names = ['John', 'Jane', 'Bert', 'Ed'];

export default function() {
  let randomName = randomItem(names);
  console.log(`Hello, my name is ${randomName}`)
}
```

</CodeGroup>
