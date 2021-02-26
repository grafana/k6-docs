---
title: 'test( name, function )'
description: 'Groups test cases.'
---

`test(name, function)` creates a group



| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| expectedValue  | any    | The expected value |


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    // t.expect(1).toEqual(1)
  })

  test('Basic API test', (t) => {

  })

}
```

</CodeGroup>
