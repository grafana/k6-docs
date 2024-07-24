---
title: 'randomString(length, [charset])'
description: 'Random string'
excerpt: 'Random string'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomstring/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomstring/
---

Function returns a random string of a given length, optionally selected from a custom character set.


| Parameter          | Type    | Description |
| ------------------ | ------- | ----------- |
| length             | int     | Length of the random string  |
| charset (optional) | string  | A customized list of characters  |


### Returns

| Type   | Description     |
| -----  | --------------- |
| any    | Random item(s) from the array of characters  |


### Example

<CodeGroup labels={[]}>

```javascript
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  const randomFirstName = randomString(8);
  console.log(`Hello, my first name is ${randomFirstName}`);

  const randomLastName = randomString(10, `aeioubcdfghijpqrstuv`);
  console.log(`Hello, my last name is ${randomLastName}`);

  const randomCharacterWeighted = randomString(1, `AAAABBBCCD`);
  console.log(`Chose a random character ${randomCharacterWeighted}`);
}
```

</CodeGroup>
