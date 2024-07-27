---
title: 'randomIntBetween(min, max)'
description: 'Random integer'
excerpt: 'Random integer'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomintbetween/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/utils/randomintbetween/
---

Function returns a random number between the specified range. The returned value is no lower than (and may possibly equal) min, and is no bigger than (and may possibly equal) max.

| Parameter      | Type   | Description |
| -------------- | ------ |  --- |
| min  | int  | Lower-end bound. Inclusive |
| max  | int  | Upper-end bound. Inclusive|


### Returns

| Type   | Description     |
| -----  | --------------- |
| int    | Random integer  |


### Example

<CodeGroup labels={[]}>

```javascript
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  // code ...

  sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds.
}
```

</CodeGroup>
