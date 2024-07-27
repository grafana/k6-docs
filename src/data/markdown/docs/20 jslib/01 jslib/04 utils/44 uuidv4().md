---
title: 'uuidv4()'
description: 'uuid v4 function'
excerpt: 'uuid v4 function'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/uuidv4/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/uuidv4/
---

Function returns a random uuid v4 in a string form.

### Parameters

| Parameter         | Type    | Description                                                                                                                                                                                                                                                                                                                                    |
| :---------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secure (optional) | boolean | By default, `uuidv4()` uses a standard random number generator. If the `secure` option is set to `true`, `uuidv4` uses a cryptographically secure random number generator instead. While this adds security, the `secure` option also makes the function an order of magnitude slower. |

### Returns

| Type   | Description           |
| :----- | :-------------------- |
| string | Random UUID v4 string |


### Example

<CodeGroup labels={[]}>

```javascript
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
  const randomUUID = uuidv4();
  console.log(randomUUID); // 35acae14-f7cb-468a-9866-1fc45713149a
}
```

</CodeGroup>
