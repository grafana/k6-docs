---
title: 'batch( requests )'
description: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
excerpt: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
---

Batch multiple HTTP requests together, to issue them in parallel over multiple TCP connections.

| Parameter | Type            | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| requests  | array \| object | An array or object containing requests, in string or object form |

When each request is specified as an array, the order of the arguments for each request is as follows:

### Returns

| Type   | Description                                                                                                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | An object containing [Response](/javascript-api/k6-http/response) objects.<br /><br />It is an array when users pass an array as `requests` and is a normal object with string keys when named requests are used (see below). |

| Position | Name              | Type                          | Description                                                                                                                 |
| -------- | ----------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1        | method            | string                        | Mandatory. The HTTP method of the request. One of GET, POST, PUT, PATCH, DELETE, HEAD or OPTION.                            |
| 2        | url               | string                        | Mandatory. The URL to request.                                                                                              |
| 3        | body (optional)   | string / object / ArrayBuffer | The body of the request if relevant. Can be set to `null` if not applicable but you want to set the last `params` argument. |
| 4        | params (optional) | object                        | [Params](/javascript-api/k6-http/params) like auth, custom headers and tags.                                                |

### Example with request as an array

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    [
      'GET',
      'https://test.k6.io/images/logo.png',
      null,
      { tags: { ctype: 'images' } },
    ],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
}
```

</CodeGroup>

### Example batching three URLs for parallel fetching

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    [
      'GET',
      'https://test.k6.io/images/logo.png',
      null,
      { tags: { ctype: 'images' } },
    ],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
}
```

</CodeGroup>

### Example with request objects

You can also use objects to hold information about a request. Here is an example where we do that in order to send a POST request, plus use custom HTTP headers by adding a [Params](/javascript-api/k6-http/params) object to the request:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let req1 = {
    method: 'GET',
    url: 'https://httpbin.org/get',
  };
  let req2 = {
    method: 'GET',
    url: 'https://test.k6.io',
  };
  let req3 = {
    method: 'POST',
    url: 'https://httpbin.org/post',
    body: {
      hello: 'world!',
    },
    params: {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  };
  let responses = http.batch([req1, req2, req3]);
  // httpbin.org should return our POST data in the response body, so
  // we check the third response object to see that the POST worked.
  check(responses[2], {
    'form data OK': (res) => JSON.parse(res.body)['form']['hello'] == 'world!',
  });
}
```

</CodeGroup>

_Note that the requests in the example above may happen in any order, or simultaneously. When running requests in batches, there is no guarantee that e.g. req1 will happen before req2 or req3_

### Example with named requests

Finally, you can also send in named requests by using an object instead of an array as the parameter to http.batch(). In the following example we do this, and we also show that it is possible to mix string URLs and request objects

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let requests = {
    'front page': 'https://k6.io',
    'features page': {
      method: 'GET',
      url: 'https://k6.io/features',
      params: { headers: { 'User-Agent': 'k6' } },
    },
  };
  let responses = http.batch(requests);
  // when accessing results, we use the name of the request as index
  // in order to find the corresponding Response object
  check(responses['front page'], {
    'front page status was 200': (res) => res.status === 200,
  });
}
```

</CodeGroup>
