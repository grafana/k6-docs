---
title: 'uuidv4()'
description: 'uuid v4 function'
excerpt: 'uuid v4 function'
---

Function returns a random uuid v4 in a string form.

### Returns

| Type   | Description     |
| -----  | --------------- |
| string | Random UUID v4 string |


### Example

<CodeGroup labels={[]}>

```javascript
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export default function() {
  let randomUUID = uuidv4();
  console.log(randomUUID); // 35acae14-f7cb-468a-9866-1fc45713149a
}

```

</CodeGroup>
