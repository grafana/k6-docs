---
title: 'asyncRequest( method, url, [body], [params] )'
description: 'Issue any type of HTTP request asynchronously.'
excerpt: 'Issue any type of HTTP request asynchronously.'
---

| Parameter         | Type                          | Description                                                                               |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| method            | string                        | Request method (e.g. `POST`). Note, the method must be uppercase.                         |
| url               | string / [HTTP URL](/javascript-api/k6-http/urlurl#returns) | Request URL (e.g. `http://example.com`).                                                  |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                    |
| params (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| Promise with Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

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

Using http.asyncRequest() to issue multiple requests and see which one finishes first using [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race):

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default async () => {

  const google = http.asyncRequest('GET', 'https://www.google.com/search?q=k6')
  const bing = http.asyncRequest('GET', 'https://www.bing.com/search?q=k6')
  const duckduckgo = http.asyncRequest('GET', 'https://www.duckduckgo.com/?q=k6')

  const winner = await Promise.race([google, bing, duckduckgo])
  console.log('Winner is ' + winner.url);
}
```

</CodeGroup>
