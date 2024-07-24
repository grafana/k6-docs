---
title: 'HTTP Requests'
excerpt: 'Define the HTTP requests and methods you want to use. k6 adds tags to the requests, making it easier to filter results. You can customize tags as you wish.'
canonicalUrl: https://grafana.com/docs/k6/latest/using-k6/http-requests/
---

When testers create new load test, the first step is often to define the HTTP requests to test the system with.

## Make HTTP Requests {#making-http-requests}

A GET request looks like this:

<CodeGroup labels={["http_get.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('http://test.k6.io');
}
```

</CodeGroup>

For something slightly more complex, this POST request authenticates on a service or site:

<CodeGroup labels={["http_post.js"]} lineNumbers={[true]}>

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

</CodeGroup>

## Available methods

The [http module](/javascript-api/k6-http) handles all kinds of HTTP requests and methods.

| Name                                                                | Value                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [batch()](/javascript-api/k6-http/batch)                   | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do). |
| [del()](/javascript-api/k6-http/del)                | Issue an HTTP DELETE request.                                             |
| [get()](/javascript-api/k6-http/get)                     | Issue an HTTP GET request.                                                |
| [head()](/javascript-api/k6-http/head)                   | Issue an HTTP HEAD request.                                               |
| [options()](/javascript-api/k6-http/options)        | Issue an HTTP OPTIONS request.                                            |
| [patch()](/javascript-api/k6-http/patch)            | Issue an HTTP PATCH request.                                              |
| [post()](/javascript-api/k6-http/post)              | Issue an HTTP POST request.                                               |
| [put()](/javascript-api/k6-http/put)                | Issue an HTTP PUT request.                                                |
| [request()](/javascript-api/k6-http/request) | Issue any type of HTTP request.                                           |

## HTTP Request Tags

k6 automatically applies [tags](/using-k6/tags-and-groups#section-tags) to your HTTP requests.
You can use these tags to filter your results and organize your analysis.

| Name   | Description                                |
| ------ | ------------------------------------------ |
| expected_response   | By default, response statuses between 200 and 399 are `true`. Change the default behavior with [setResponseCallback](/javascript-api/k6-http/setresponsecallback).                  |
| group   | When the request runs inside a [group](/javascript-api/k6/group), the tag value is the group name.  Default is empty.               |
| name   | Defaults to URL requested                  |
| method | Request method (`GET`, `POST`, `PUT` etc.) |
| scenario   | When the request runs inside a [scenario](/using-k6/scenarios), the tag value is the scenario name.  Default is `default`.               |
| status | response status                            |
| url    | defaults to URL requested                  |

The following snippet shows a JSON example of how a test-result data point is logged.
In this example, the metric is the duration of an HTTP request.

Note how the `tags` object groups data.

<CodeGroup labels={["data_point.json"]} lineNumbers={[true]}>

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

</CodeGroup>

## Group URLs under one tag {#url-grouping}

By default, tags have a `name` field that holds the value of the request URL.
If your test has dynamic URL paths, you might not want this behavior, which could bring a large number of unique URLs into the metrics stream.
For example, the following code accesses 100 different URLs:

<CodeGroup labels={["grouping.js" ]} lineNumbers={[true]}>

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

</CodeGroup>

You might prefer to report this data in a single metric:
To aggregate data from dynamic URLs, explicitly set a `name` tag:

<CodeGroup labels={["explicit_tag.js"]} lineNumbers={[true]}>

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

</CodeGroup>

That code would produce JSON output like this:

<CodeGroup labels={[ ]} lineNumbers={[true]}>

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

</CodeGroup>

Note how these two objects have the same `name`, despite having different URLs.
If you filter the results for the tag `name: PostsItemURL`, the results include all data points from all 100 URLs.

As an alternative, you can also use the `http.url` wrapper to set the `name` tag with a string template value:

<CodeGroup labels={[ ]} lineNumbers={[true]}>

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

</CodeGroup>
