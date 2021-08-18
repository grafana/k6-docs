---
title: 'sleep( t )'
description: 'Suspends VU execution for the specified duration.'
excerpt: 'Suspends VU execution for the specified duration.'
---

Suspend VU execution for the specified duration.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| t         | number | Duration, in seconds. |

### More information
Sleep doesn’t impact the test duration. It will impact how quickly the VUs can complete iterations of the default function and thus how many requests are made.

Consider the example below. If it for 60 seconds with 1 VU, it would make roughly 60 total requests/iterations of the script. If sleep(t) is changed to 60 seconds, it would make 1 iteration/request. 

Sleep is an idle time for VUs. It’s mostly used for script pacing, emulating user behavior, and just load generation stability. VUs will naturally execute as quickly as possible so if you get too aggressive, you can eat up all the resources on the load generation and skew results.

### Examples
<CodeGroup labels={[]}>

```javascript
import http from "k6/http";
import { sleep } from "k6";

export default function() {
  let res = http.get("https://loadimpact.com");
  sleep(1);
};
```

</CodeGroup>

Fetching two different pages with a 0-30 second random sleep in between:

<CodeGroup labels={[]}>

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export default function () {
  http.get('https://k6.io');
  sleep(Math.random() * 30);
  http.get('https://k6.io/features');
}
```

</CodeGroup>

Using the [k6-utils](https://jslib.k6.io/k6-utils/) library to specify a range between a minimum and maximum:

<CodeGroup labels={[]}>

```javascript
import { sleep } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export default function () {
  http.get('https://k6.io');
  sleep(randomIntBetween(20, 30));
  http.get('https://k6.io/features');
}
```

</CodeGroup>
