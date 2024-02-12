---
title: 'asyncRequest( method, url, [body], [params] )'
description: 'Issue any type of HTTP request asynchronously.'
description: 'Issue any type of HTTP request asynchronously.'
weight: 10
---

# asyncRequest( method, url, [body], [params] )

| Parameter         | Type                                                                                            | Description                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| method            | string                                                                                          | Request method (e.g. `'POST'`). Must be uppercase.                                                                                |
| url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `'http://example.com'`).                                                                                        |
| body (optional)   | string / object / ArrayBuffer                                                                   | Request body. Objects will be `x-www-form-urlencoded` encoded.                                                                    |
| params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type                  | Description                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Promise with Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Examples

Using http.asyncRequest() to issue a POST request:

{{< code >}}

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';

export default async function () {
  const data = { name: 'Bert' };

  // Using a JSON string as body
  let res = await http.asyncRequest('POST', url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res.json().json.name); // Bert

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = await http.asyncRequest('POST', url, data);
  console.log(res.json().form.name); // Bert
}
```

{{< /code >}}

Using `http.asyncRequest()` to issue multiple requests, then [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) to determine which requests finish first:

{{< code >}}

```javascript
import http from 'k6/http';

export default async () => {
  const urlOne = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`;
  const urlTwo = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`;
  const urlThree = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`;

  const one = http.asyncRequest('GET', urlOne);
  const two = http.asyncRequest('GET', urlTwo);
  const three = http.asyncRequest('GET', urlThree);

  console.log('Racing:');
  console.log(urlOne);
  console.log(urlTwo);
  console.log(urlThree);

  const res = await Promise.race([one, two, three]);
  console.log('winner is', res.url, 'with duration of', res.timings.duration + 'ms');
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

{{% admonition type="note" %}}

`http.asyncRequest` has no current way to abort a request.

In the preceding script, after `res` gets the value from the fastest request, the other requests will continue to execute.
This might block the end of the iteration, because the iteration only stops once all async jobs finish.

{{% /admonition %}}

{{< /code >}}
