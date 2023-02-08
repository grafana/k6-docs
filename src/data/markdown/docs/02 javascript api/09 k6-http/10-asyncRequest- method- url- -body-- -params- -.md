---
title: 'asyncRequest( method, url, [body], [params] )'
description: 'Issue any type of HTTP request asynchronously.'
excerpt: 'Issue any type of HTTP request asynchronously.'
---

| Parameter         | Type                          | Description                                                                               |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| method            | string                        | Request method (e.g. `POST`). Must be uppercase.                         |
| url               | string / [HTTP URL](/javascript-api/k6-http/urlurl#returns) | Request URL (e.g. `http://example.com`).                                                  |
| body (optional)   | string / object / ArrayBuffer | Request body. Objects will be `x-www-form-urlencoded` encoded.                                    |
| params (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| Promise with Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Examples

Using http.asyncRequest() to issue a POST request:

<CodeGroup labels={[]}>

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

</CodeGroup>

Using  `http.asyncRequest()` to issue multiple requests, then [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) to determine which requests finish first:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default async () => {
  const urlOne = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`
  const urlTwo = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`
  const urlThree = `https://httpbin.test.k6.io/delay/${randomInt(1, 5)}`

  const one = http.asyncRequest('GET', urlOne);
  const two = http.asyncRequest('GET', urlTwo);
  const three = http.asyncRequest('GET', urlThree);

  console.log('Racing:')
  console.log(urlOne);
  console.log(urlTwo);
  console.log(urlThree);

  const res = await Promise.race([  one, two, three])
  console.log('winner is', res.url, 'with duration of', res.timings.duration+'ms');
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

Note: `http.asyncRequest` has no current way of aborting a request. So while the above will get the one that is the fastest, the remaining ones will still continue and may block the end of the iteration as iteration only stop once all async jobs are finished.

</CodeGroup>
