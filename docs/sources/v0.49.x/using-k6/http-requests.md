---
title: 'HTTP Requests'
description: 'Define the HTTP requests and methods you want to use. k6 adds tags to the requests, making it easier to filter results. You can customize tags as you wish.'
weight: 01
---

# HTTP Requests

When you create a new load test, one of the first steps is to define the HTTP requests that you would like to test.

## Make HTTP Requests {#making-http-requests}

A GET request looks like this:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('http://test.k6.io');
}
```

{{< /code >}}

For something slightly more complex, this example shows a POST request with an email/password authentication payload:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
```

{{< /code >}}

## Available methods

The [http module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http) handles all kinds of HTTP requests and methods.

| Name                                                                                 | Value                                                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [batch()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/batch)     | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do). |
| [del()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/del)         | Issue an HTTP DELETE request.                                             |
| [get()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/get)         | Issue an HTTP GET request.                                                |
| [head()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head)       | Issue an HTTP HEAD request.                                               |
| [options()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/options) | Issue an HTTP OPTIONS request.                                            |
| [patch()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/patch)     | Issue an HTTP PATCH request.                                              |
| [post()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post)       | Issue an HTTP POST request.                                               |
| [put()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/put)         | Issue an HTTP PUT request.                                                |
| [request()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request) | Issue any type of HTTP request.                                           |

## HTTP Request Tags

k6 automatically applies [tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#section-tags) to your HTTP requests.
You can use these tags to filter your results and organize your analysis.

| Name              | Description                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| expected_response | By default, response statuses between 200 and 399 are `true`. Change the default behavior with [setResponseCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback). |
| group             | When the request runs inside a [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group), the tag value is the group name. Default is empty.                                                 |
| name              | Defaults to URL requested                                                                                                                                                                                    |
| method            | Request method (`GET`, `POST`, `PUT` etc.)                                                                                                                                                                   |
| scenario          | When the request runs inside a [scenario](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios), the tag value is the scenario name. Default is `default`.                                            |
| status            | response status                                                                                                                                                                                              |
| url               | defaults to URL requested                                                                                                                                                                                    |

The following snippet shows a JSON example of how a test-result data point is logged.
In this example, the metric is the duration of an HTTP request.

Note how the `tags` object groups data.

{{< code >}}

```json
{
  "type": "Point",
  "metric": "http_req_duration",
  "data": {
    "time": "2017-06-02T23:10:29.52444541+02:00",
    "value": 586.831127,
    "tags": {
      "expected_response": "true",
      "group": "",
      "method": "GET",
      "name": "http://test.k6.io",
      "scenario": "default",
      "status": "200",
      "url": "http://test.k6.io"
    }
  }
}
```

{{< /code >}}

## Group URLs under one tag {#url-grouping}

By default, tags have a `name` field that holds the value of the request URL.
If your test has dynamic URL paths, you might not want this behavior, which could bring a large number of unique URLs into the metrics stream.
For example, the following code accesses 100 different URLs:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  for (let id = 1; id <= 100; id++) {
    http.get(`http://example.com/posts/${id}`);
  }
}
// tags.name=\"http://example.com/posts/1\",
// tags.name=\"http://example.com/posts/2\",
```

{{< /code >}}

You might prefer to report this data in a single metric:
To aggregate data from dynamic URLs, explicitly set a `name` tag:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  for (let id = 1; id <= 100; id++) {
    http.get(`http://example.com/posts/${id}`, {
      tags: { name: 'PostsItemURL' },
    });
  }
}
// tags.name=\"PostsItemURL\",
// tags.name=\"PostsItemURL\",
```

{{< /code >}}

That code would produce JSON output like this:

{{< code >}}

```json
{
    "type":"Point",
    "metric":"http_req_duration",
    "data": {
        "time":"2017-06-02T23:10:29.52444541+02:00",
        "value":586.831127,
        "tags": {
            "method":"GET",
            "name":"PostsItemURL",
            "status":"200",
            "url":"http://example.com/1"
        }
    }
}

// and

{
    "type":"Point",
    "metric":"http_req_duration",
    "data": {
        "time":"2017-06-02T23:10:29.58582529+02:00",
        "value":580.839273,
        "tags": {
            "method":"GET",
            "name":"PostsItemURL",
            "status":"200",
            "url":"http://example.com/2"
        }
    }
}
```

{{< /code >}}

Note how these two objects have the same `name`, despite having different URLs.
If you filter the results for the tag `name: PostsItemURL`, the results include all data points from all 100 URLs.

As an alternative, you can also use the `http.url` wrapper to set the `name` tag with a string template value:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  for (let id = 1; id <= 100; id++) {
    http.get(http.url`http://example.com/posts/${id}`);
  }
}
// tags.name="http://example.com/posts/${}",
// tags.name="http://example.com/posts/${}",
```

{{< /code >}}
