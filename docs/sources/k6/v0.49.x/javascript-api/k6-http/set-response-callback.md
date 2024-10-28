---
title: 'setResponseCallback( callback )'
description: 'set responseCallback to mark responses as expected'
description: 'set responseCallback to mark responses as expected'
weight: 10
---

# setResponseCallback( callback )

Set the response callback to be called to determine if a response was expected/successful or not.

The result of this is that requests will be tagged with `expected_response` `"true"` or `"false"` and `http_req_failed` will be emitted with the reverse. This does include all redirects so if for a request only 200 is the expected response and there is 301 redirect before that, the redirect will be marked as failed as only status code 200 was marked as expected.

#### Exceptions

Due to implementation specifics:

- Requests with authentication `digest` are always expected to first get 401 and then to get whatever was specified.
- Requests with authentication `ntlm` will let a 401 status code on the first request as well as anything defined by `expectedStatuses`

| Parameter | Type                                                                                                  | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| callback  | [expectedStatuses](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses) | an object returned from [expectedStatuses](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses) |

Currently only the very special [expectedStatuses](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses) objects are supported but in the future it is planned that a JavaScript callback will be supported as well. By default requests with status codes between 200 and 399 are considered "expected".

Setting the callback to `null` disables the tagging with `expected_response` and the emitting of `http_req_failed`.

It is recommended that if a per request responseCallback is used with [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) it is actually defined once and used instead of creating it on each request.

### Example

{{< code >}}

```javascript
import http from 'k6/http';

http.setResponseCallback(http.expectedStatuses({ min: 200, max: 300 }));

const only300Callback = http.expectedStatuses(300);

export default () => {
  // this will use the default response callback and be marked as successful
  http.get('https://httpbin.test.k6.io/status/200');

  // this will be marked as a failed request as it won't get the expected status code of 300
  http.get('https://httpbin.test.k6.io/status/200', { responseCallback: only300Callback });

  http.setResponseCallback(http.expectedStatuses(301));
  // from here on for this VU only the 301 status code will be successful so on the next iteration of
  // the VU the first request will be marked as failure
};
```

{{< /code >}}
