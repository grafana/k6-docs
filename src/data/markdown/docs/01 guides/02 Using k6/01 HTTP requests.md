---
title: 'HTTP Requests'
excerpt: ''
---

## Making HTTP Requests

When creating a new load test, the first thing you'll often do is define the HTTP requests that will be used to test
your system. A simple example that just performs a GET request looks like this:

<div class="code-group" data-props='{"labels": ["http_get.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';

export default function() {
  http.get('http://test.k6.io');
}
```

</div>

A slightly more complex request might be e.g. a POST request to authenticate on a site/service:

<div class="code-group" data-props='{"labels": ["http_post.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';

export default function() {
  var url = 'http://test.k6.io/login';
  var payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
```

</div>

## Available methods

Use the [http module](/javascript-api/k6-http) to perform all kinds of HTTP requests in your load tests.

| Name                                                               | Value                                                                     |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [batch()](/javascript-api/k6-http/batch-requests)                   | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do). |
| [del()](/javascript-api/k6-http/del-url-body-params)                | Issue an HTTP DELETE request.                                                |
| [get()](/javascript-api/k6-http/get-url-params)                | Issue an HTTP GET request.                                               |
| [options()](/javascript-api/k6-http/options-url-body-params)        | Issue an HTTP OPTIONS request.                                              |
| [patch()](/javascript-api/k6-http/patch-url-body-params)            | Issue an HTTP PATCH request.                                            |
| [post()](/javascript-api/k6-http/post-url-body-params)              | Issue an HTTP POST request.                                                |
| [put()](/javascript-api/k6-http/put-url-body-params)                | Issue an HTTP PUT request.                                             |
| [request()](/javascript-api/k6-http/request-method-url-body-params) | Issue any type of HTTP request.                                            |

## HTTP Request Tags

k6 will automatically apply [tags](/using-k6/tags-and-groups#section-tags) to your HTTP requests. These tags allow you to filter your results during analysis.

| Name   | Description                                |
| ------ | ------------------------------------------ |
| name   | Defaults to URL requested                  |
| method | Request method (`GET`, `POST`, `PUT` etc.) |
| status | response status                            |
| url    | defaults to URL requested                  |

Below you can see how a test result data point (the duration of an HTTP request) is logged, in JSON format, including the various tags mentioned above:

<div class="code-group" data-props='{"labels": ["data_point.json"], "lineNumbers": [true]}'>

```json
{
  "type": "Point",
  "metric": "http_req_duration",
  "data": {
    "time": "2017-06-02T23:10:29.52444541+02:00",
    "value": 586.831127,
    "tags": {
      "group": "",
      "method": "GET",
      "name": "http://test.k6.io",
      "status": "200",
      "url": "http://test.k6.io"
    }
  }
}
```

</div>

## URL Grouping

By default, requests report the name tag with the value of the request URL. For URLs that contain dynamic parts, this might not be desirable since it can
introduce a large number of unique URLs in the metrics stream. The below code shows a situation when you'll access 100 different URLs but may want them
all reported using one single metric:

<div class="code-group" data-props='{"labels": ["grouping.js" ], "lineNumbers": [true]}'>

```js
for (var id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`);
}

// tags.name=\"http://example.com/posts/1\",
// tags.name=\"http://example.com/posts/2\",
```

</div>

You can aggregate data from dynamic URLs by explicitly setting a name tag:

<div class="code-group" data-props='{"labels": ["explicit_tag.js"], "lineNumbers": [true]}'>

```js
for (var id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`, {
    tags: { name: 'PostsItemURL' },
  });
}

// tags.name=\"PostsItemURL\",
// tags.name=\"PostsItemURL\",
```

</div>

Which would produce JSON output like the following:

<div class="code-group" data-props='{"labels": [ ], "lineNumbers": [true]}'>

```json
{
    "type":"Point",
    "metric":"http_req_duration",
    "data": {
        "time":"2017-06-02T23:10:29.52444541+02:00",
        "value":586.831127,
        "tags": {
            "group":"",
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
            "group":"",
            "method":"GET",
            "name":"PostsItemURL",
            "status":"200",
            "url":"http://example.com/2"
        }
    }
}
```

</div>

Note how the `name` is the same for the two data samples related to two different URLs. Filtering the results on tag `name: PostsItemURL` will give you a result set including all the data points from all the 100 different URLs.

Additionally, you can use the `http.url` (v0.16.0) wrapper to set the name tag with a string template value:

<div class="code-group" data-props='{"labels": [ ], "lineNumbers": [true]}'>

```js
for (var id = 1; id <= 100; id++) {
  http.get(http.url`http://example.com/posts/${id}`);
}

// tags.name="http://example.com/posts/${}",
// tags.name="http://example.com/posts/${}",
```

</div>

## Inside k6 Cloud Results

[k6 Cloud Results's HTTP Table](/cloud/analyzing-results/http-tab) will show all the requests, on an aggregated level per URL.

![cloud insights url table](/images/02 Using k6/cloud-insights-http-tab.png)
