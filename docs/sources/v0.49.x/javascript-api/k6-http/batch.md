---
title: 'batch( requests )'
description: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
description: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
weight: 10
---

# batch( requests )

Batch multiple HTTP requests together to issue them in parallel over multiple TCP connections.
To set batch size, use the [batch per host](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#batch-per-host) option.

| Parameter | Type            | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| requests  | array \| object | An array or object containing requests, in string or object form |

### Request definition

You have multiple ways to structure batch requests:

- In an array of arrays
- As an object or array of objects
- As an array of URL strings

Defining batch requests as URL strings is a shortcut for GET requests.
You can use this GET shortcut in objects&mdash;name a key and give it a URL value
(refer to subsequent sections for example syntax).

#### Array and Object

You can define a request specified as an array or object with the following parameters.

{{% admonition type="caution" %}}

When you define requests as an array, you must use a specific order of items.
Note the `Position` column for the correct order.

{{% /admonition %}}

| Array position | Name              | Type                                                                                            | Description                                                                                                                 |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1              | method            | string                                                                                          | Mandatory. The HTTP method of the request. One of GET, POST, PUT, PATCH, DELETE, HEAD or OPTION.                            |
| 2              | url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Mandatory. The URL to request.                                                                                              |
| 3              | body (optional)   | string / object / ArrayBuffer                                                                   | The body of the request if relevant. Can be set to `null` if not applicable but you want to set the last `params` argument. |
| 4              | params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) like auth, custom headers and tags.        |

#### String

If you pass an array of string values, k6 automatically parses them into a batch of `GET` requests, where the target is the value of the strings.

### Returns

| Type   | Description                                                                                                                                                                                                                                                                       |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | The returned object contains [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) objects.<br /><br />It is an array when users pass an array as `requests`, and is an ordinary object with string keys when named requests are used (see below). |

### Example with arrays

This example batches three URLs in arrays for parallel fetching:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
}
```

{{< /code >}}

### Example with request objects

This example uses objects to define a batch of POST requests (along with custom HTTP headers in a [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object to the request):

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const req1 = {
    method: 'GET',
    url: 'https://httpbin.test.k6.io/get',
  };
  const req2 = {
    method: 'GET',
    url: 'https://test.k6.io',
  };
  const req3 = {
    method: 'POST',
    url: 'https://httpbin.test.k6.io/post',
    body: {
      hello: 'world!',
    },
    params: {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  };
  const responses = http.batch([req1, req2, req3]);
  // httpbin.test.k6.io should return our POST data in the response body, so
  // we check the third response object to see that the POST worked.
  check(responses[2], {
    'form data OK': (res) => JSON.parse(res.body)['form']['hello'] == 'world!',
  });
}
```

{{< /code >}}

{{% admonition type="note" %}}

In the preceding example, `req1` can happen before `req2` or `req3`.

{{% /admonition %}}

### Example with array of strings

This example uses an array of URL strings to send a batch of GET requests.

{{< code >}}

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const responses = http.batch(['http://test.k6.io', 'http://test.k6.io/pi.php']);

  check(responses[0], {
    'main page 200': (res) => res.status === 200,
  });

  check(responses[1], {
    'pi page 200': (res) => res.status === 200,
    'pi page has right content': (res) => res.body === '3.14',
  });
}
```

{{< /code >}}

### Example object with named properties

Finally, you can also send in named requests by using an object instead of an array as the parameter to `http.batch()`.
This example mixes string URLs and request objects.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const requests = {
    'front page': 'https://k6.io',
    'features page': {
      method: 'GET',
      url: 'https://k6.io/features',
      params: { headers: { 'User-Agent': 'k6' } },
    },
  };
  const responses = http.batch(requests);
  // when accessing results, we use the name of the request as index
  // in order to find the corresponding Response object
  check(responses['front page'], {
    'front page status was 200': (res) => res.status === 200,
  });
}
```

{{< /code >}}
