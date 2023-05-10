---
title: 'sleep( t )'
description: 'Suspends VU execution for the specified duration.'
excerpt: 'Suspends VU execution for the specified duration.'
---

Suspend VU execution for the specified duration.

`sleep` is the primary means of introducing delays in your script. These delays aim to represent the time it would take a real user to parse a page before proceeding to the next page, commonly referred to as "think time". Without `sleep` statements, a script will run as quickly as the system it runs on allows it, as well as by how fast the server(s) it communicates with responds (because k6 executes HTTP requests synchronously).

Unless you are [stress testing](/test-types/stress-testing/) and want each VU to execute as many requests per second as possible, you should include [`sleep`](/javascript-api/k6/sleep/) statements throughout the script.
This relates your VU behavior more closely to the behavior of real users.

Ideally, you would also feed in a randomized pause duration, further encouraging natural concurrency to develop.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| t         | number | Duration, in seconds. |

### Examples

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
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  http.get('https://k6.io');
  sleep(randomIntBetween(20, 30));
  http.get('https://k6.io/features');
}
```

</CodeGroup>
