---
title: 'Tags and Groups'
excerpt: 'k6 provides the Tags and Groups APIs to help you during the analysis and easily visualize, sort and
filter your test results.'
---

The analysis of your load results is a required step to find performance issues; a load test
usually targets a service involving different subsystems and resources, making it hard to find
the issue/s degrading your performance.

k6 provides two scripting APIs to help you during the analysis and easily visualize, sort and
filter your test results.

- Groups: organize your load script around common logic.
- Tags: categorize your checks, thresholds, custom metrics and requests with tags for in-depth filtering.

## Groups


Groups are optional, and it allows you to “group” a large load script to help you with the test result analysis. Groups can be nested, allowing you the BDD-style of testing.

This makes all metrics emitted in a group to have the tag `group` with a value of all group names wrapping it separated by '::' (two colons). There is also a default/root group with the name '' (empty string) which means that if you just have a single group named 'cool requests' the actual value of the `group` tag will be `::cool requests`.

For example, you could use groups to organize multiple requests due to loading a page or executing a user action.

<CodeGroup labels={["groups.js"]} lineNumbers={[true]}>

```javascript
import { group } from 'k6';

export default function () {
  group('visit product listing page', function () {
    // ...
  });
  group('add several products to the shopping cart', function () {
    // ...
  });
  group('visit login page', function () {
    // ...
  });
  group('authenticate', function () {
    // ...
  });
  group('checkout process', function () {
    // ...
  });
}
```

</CodeGroup>

Groups do the following tasks internally:

- For each `group()` function, k6 emits a [group_duration metric](/using-k6/metrics) that contains the total time to execute the group function. 

- When a taggable resource: checks, requests, or custom metrics runs within a group, k6 will set the tag `group` with the current group name. Read more about it in [Tags](/using-k6/tags-and-groups#tags).

Both options, the `group_duration` metric and `group tagging`, could help you analyze and visualize better the results of more complex tests. Check out how they work in your [k6 result output](/integrations#result-store-and-visualization).

**Discouraged use cases**

Wrapping each individual request within a group might add boilerplate code and be unnecessary.

<CodeGroup labels={["group-antipattern.js"]} lineNumbers={[true]}>

```javascript
import { group, check } from 'k6';
import http from 'k6/http';

const id = 5;

// reconsider this type of code
group('get post', function () {
  http.get(`http://example.com/posts/${id}`);
});
group('list posts', function () {
  const res = http.get(`http://example.com/posts`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
});
```

</CodeGroup>

If your code looks like the example above, consider the following alternatives to write cleaner code:

- For dynamic URLs, use the [URL grouping feature](/using-k6/http-requests#url-grouping).
- To provide a meaningful name to your request, set the value of [tags.name](/using-k6/http-requests#http-request-tags).
- To reuse common logic or organize your code better, group logic in functions or create a [local Javascript module](/using-k6/modules#local-filesystem-modules) and import it into the test script.
- If you need to model advanced user patterns, check out [Scenarios](/using-k6/scenarios). 



## Tags

Tags are a simple and powerful way to categorize your k6 entities for later results filtering.

k6 provides two types of tags:

- User-defined tags: the ones you've added when writing your script.
- System tags: tags automatically assigned by k6.

### System tags

Currently, k6 automatically creates the following tags by default:

| Tag           | Description                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proto`       | the used protocol name (e.g. `HTTP/1.1`)                                                                                                                                          |
| `subproto`    | the subprotocol name (used by websockets)                                                                                                                                         |
| `status`      | the HTTP status code (e.g. `200`, `404`, etc.)                                                                                                                                    |
| `method`      | the HTTP method name (e.g. `GET`, `POST`, etc.) or the RPC method name for gRPC                                                                                                   |
| `url`         | the HTTP request URL                                                                                                                                                              |
| `name`        | the HTTP [request name](/using-k6/http-requests#url-grouping)                                                                                                                     |
| `group`       | the full [group](#groups) path, see the explanation above for details about its value                                                                                              |
| `check`       | the [Check](/using-k6/checks) name                                                                                                                                                |
| `error`       | a string with a non-HTTP error message (e.g. network or DNS error)                                                                                                                |
| `error_code`  | added in k6 v0.24.0, this is a number that is unique for different error types; a list of current error codes can be found at the [Error Codes](/javascript-api/error-codes) page |
| `tls_version` | the [TLS](/using-k6/protocols/ssl-tls) version                                                                                                                                    |
| `scenario`    | the name of the scenario where the metric was emitted                                                                                                                             |
| `service`     | the RPC service name for gRPC                                                                                                                                                     |
| `expected_response` | "true" or "false" based on the [responseCallback](/javascript-api/k6-http/setresponsecallback-callback/) used, by default this checks that the status is 2xx or 3xx |

If you choose, you could disable some of the above tags by using the `systemTags`
[option](/using-k6/options), just keep in mind that some data collectors (e.g. `cloud`)
may require that certain tags be present. Also, you can enable some additional system tags, if
you need them:

| Tag           | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `vu`          | the ID of the virtual user that executed the request                                                                              |
| `iter`        | the iteration number                                                                                                              |
| `ip`          | The IP address of the remote server                                                                                               |
| `ocsp_status` | the [Online Certificate Status Protocol (OCSP)](/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp) HTTPS status |

### User-defined tags

User-defined tags allow you to categorize k6 entities based on your logic. The following entities
can be tagged:

- checks
- thresholds
- custom metrics
- requests

<CodeGroup labels={["tagging-example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { check } from 'k6';

const myTrend = new Trend('my_trend');

export default function () {
  // Add tag to request metric data
  const res = http.get('http://httpbin.test.k6.io/', {
    tags: {
      my_tag: "I'm a tag",
    },
  });

  // Add tag to check
  check(res, { 'status is 200': (r) => r.status === 200 }, { my_tag: "I'm a tag" });

  // Add tag to custom metric
  myTrend.add(res.timings.connecting, { my_tag: "I'm a tag" });
}
```

</CodeGroup>

## Test wide tags

Besides attaching tags on requests, checks and custom metrics you can set test wide tags that
will be set across all metrics. You can either set the tags on the CLI using one or more
`--tag NAME=VALUE` flags or in the script:

<CodeGroup labels={["test-wide-tags.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  tags: {
    name: 'value',
  },
};
```

</CodeGroup>

## Tags in results output

<CodeGroup labels={["output.js"]} lineNumbers={[true]}>

```json
{
  "type ": "Point ",
  "data ": {
    "time ": "2017-05-09T14:34:45.239531499+02:00 ",
    "value ": 459.865729,
    "tags ": {
      "group ": "::my group::json ",
      "method ": "GET ",
      "status ": "200 ",
      "url ": "https://httpbin.test.k6.io/get "
    }
  },
  "metric ": "http_req_duration "
}
```

```json
{
  "type ": "Point ",
  "data ": {
    "time ": "2017-05-09T14:34:45.625742514+02:00 ",
    "value ": 5,
    "tags ": null
  },
  "metric ": "vus "
}
```

</CodeGroup>

Read more about the [k6 results output syntax](/results-visualization/json) to
see how tags affect your test result output.

## Tags and Groups in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) you can see groups
in the [result tabs](/cloud/analyzing-results/overview#result-tabs).

When using Groups, [Checks](/using-k6/checks) and [HTTP Requests](/using-k6/http-requests)
can be viewed by group, as shown below. You can switch between the group and list layout by changing the "view as"
selection in the top right.

![k6 Cloud URL Grouping](./images/Tags-and-Groups/cloud-insights-http-tab.png)

Additionally you can filter the results by tags in the [analysis tab](/cloud/analyzing-results/analysis-tab).
