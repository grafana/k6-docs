---
title: 'sleep( t )'
description: 'Suspends VU execution for the specified duration.'
description: 'Suspends VU execution for the specified duration.'
---

# sleep( t )

Suspend VU execution for the specified duration.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| t         | number | Duration, in seconds. |

### Examples

Fetching two different pages with a 0-30 second random sleep in between:

{{< code >}}

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export default function () {
  http.get('https://k6.io');
  sleep(Math.random() * 30);
  http.get('https://k6.io/features');
}
```

{{< /code >}}

Using the [k6-utils](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils) library to specify a range between a minimum and maximum:

{{< code >}}

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

{{< /code >}}
