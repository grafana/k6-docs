---
title: 'and(value)'
description: 'and(value) is similar to expect(value), but can be used in a chain.'
excerpt: 'and(value) is similar to expect(value), but can be used in a chain.'
---

<Blockquote mod="warning">

## expect.js library is no longer maintained
expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>


`and(value)` works the same as `expect(value)`, but can be used to chain multiple tests together.



| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| value          | any    | The value to be compared |


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', (t) => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    t.expect(response.status)
      .as('response status')
      .toEqual(200)
      .and(response)
      .toHaveValidJson()
      .and(response.json().length)
      .as('number of crocs')
      .toBeGreaterThan(5);
  });
}
```

</CodeGroup>
