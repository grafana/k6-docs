---
title: 'expectedStatuses( statuses )'
description: 'generates a responseCallback to check status codes'
description: 'generates a responseCallback to check status codes'
weight: 11
---

# expectedStatuses( statuses )

Returns a callback to be used with [setResponseCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback) to mark responses as expected based only on their status codes.

| Parameter | Type            | Description                                                                                                    |
| --------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| statuses  | integer/objects | either an integer or an object like {min:100, max:300} which gives a minimum and maximum expected status codes |

You can have as many arguments as wanted in any order.

### Example

{{< code >}}

```javascript
import http from 'k6/http';

// setting some pretty strange status codes as expected
http.setResponseCallback(
  http.expectedStatuses(406, 500, { min: 200, max: 204 }, 302, { min: 305, max: 405 })
);

export default () => {
  // this one will actually be marked as failed as it doesn't match any of the above listed status
  // codes
  http.get('https://httpbin.test.k6.io/status/205');
};
```

{{< /code >}}
