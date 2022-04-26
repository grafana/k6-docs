---
title: 'Tags and Groups'
excerpt: 'k6 provides the Tags and Groups APIs to help you during the analysis and easily visualize, sort and
filter your test results.'
---

A load test usually targets a service with different subsystems and resources.
This can make it hard to pinpoint the issues that are degrading performance.

k6 provides two scripting APIs to help you visualize, sort, and filter your test results.

- *Tags* categorize your checks, thresholds, custom metrics, and requests for in-depth filtering.
- *Groups* let you apply tags to the script's functions.

Besides these granular tags, you can also use options to set test-wide tags.
You can use these tags to compare results from multiple tests.

In addition to filtering results, you can also [use tags to limit the operations that your thresholds analyze](/using-k6/thresholds/#thresholds-on-tags).

## Tags

Tags are a powerful way to categorize your k6 entities and filter test results.

k6 provides two types of tags:

- *System tags* are tags that k6 automatically assigns.
- *User-defined* tags are tags that you add when you write your script.

### System tags

Currently, k6 automatically creates the following tags by default:

| Tag                 | Description                                                                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `proto`             | the name of the protocol used (e.g. `HTTP/1.1`)                                                                                                     |
| `subproto`          | the subprotocol name (used by websockets)                                                                                                           |
| `status`            | the HTTP status code (e.g. `200`, `404`, etc.)                                                                                                      |
| `method`            | the HTTP method name (e.g. `GET`, `POST`, etc.) or the RPC method name for gRPC                                                                     |
| `url`               | the HTTP request URL                                                                                                                                |
| `name`              | the HTTP [request name](/using-k6/http-requests#url-grouping)                                                                                       |
| `group`             | the full [group](#groups) path, see the preceding explanation for details about its value                                                           |
| `check`             | the [Check](/using-k6/checks) name                                                                                                                  |
| `error`             | a string with a non-HTTP error message (e.g. network or DNS error)                                                                                  |
| `error_code`        | A number specifying an error types; a list of current error codes can be found at the [Error Codes](/javascript-api/error-codes) page               |
| `tls_version`       | the [TLS](/using-k6/protocols/ssl-tls) version                                                                                                      |
| `scenario`          | the name of the scenario where the metric was emitted                                                                                               |
| `service`           | the RPC service name for gRPC                                                                                                                       |
| `expected_response` | `true` or `false` based on the [responseCallback](/javascript-api/k6-http/setresponsecallback/); by default checks whether the status is 2xx or 3xx |

To disable some of the above tags, you can use the `systemTags`
[option](/using-k6/options).
Keep in mind that some data collectors (e.g. `cloud`) may require certain tags.
You can als enable some additional system tags, if you need them:

| Tag           | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `vu`          | the ID of the virtual user that executed the request                                                                              |
| `iter`        | the iteration number                                                                                                              |
| `ip`          | The IP address of the remote server                                                                                               |
| `ocsp_status` | the [Online Certificate Status Protocol (OCSP)](/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp) HTTPS status |

### User-defined tags
 
User-defined tags let you categorize k6 entities based on logic.
You can tag the following entities:

- requests
- checks
- thresholds
- custom metrics

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

## Groups

Groups are optional.

They let you “group” a large load script by functions.
You can also nest groups, allowing BDD-style testing.

All metrics emitted in a group have the tag `group` with a value of all wrapping group names separated by `::` (two colons).
There is also a root group with the name '' (empty string).
If you have a single group named `cool requests`, the actual value of the `group` is `::cool requests`.

For example, you could use groups to organize multiple requests by page loads or user actions.

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

- For each `group()` function, k6 emits a [group_duration metric](/using-k6/metrics), which contains the total time to execute the group function.

- When a taggable resource&mdash;a check, request, or custom metric&mdash;runs within a group, k6 sets the tag `group` with the current group name.
For more info, refer to the [Tags section](/using-k6/tags-and-groups#tags).

Both options, the `group_duration` metric and `group tagging`, could help you analyze and visualize complex test results. Check out how they work in your [k6 result output](/integrations#result-store-and-visualization).

### Discouraged: one group per request

Wrapping each request within a group might add unnecessary boilerplate.

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

If your code looks like the preceding snippet, consider the following strategies to write cleaner code:

- For dynamic URLs, use the [URL grouping feature](/using-k6/http-requests#url-grouping).
- To provide a meaningful name to your request, set the value of [tags.name](/using-k6/http-requests#http-request-tags).
- To reuse common logic or organize your code better, group logic in functions or create a [local Javascript module](/using-k6/modules#local-filesystem-modules) and import it into the test script.
- To model advanced user patterns, check out [Scenarios](/using-k6/scenarios).

## Test-wide tags

Besides attaching tags to requests, checks, and custom metrics, you can set test-wide tags across all metrics.
There are two ways you can set these tags:
- In the CLI, using one or more `--tag NAME=VALUE` flags
- In the script itself:

  <CodeGroup labels={["test-wide-tags.js"]} lineNumbers={[true]}>

  ```javascript
  export const options = {
    tags: {
      name: 'value',
    },
  };
  ```

  </CodeGroup>

### Tags in results output

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

To see how tags affect your test-result output, refer to the [k6 results output syntax](/results-visualization/json).
 
## Tags and Groups in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) you can see groups in the [result tabs](/cloud/analyzing-results/overview#result-tabs).

When using Groups, you can view [Checks](/using-k6/checks) and [HTTP Requests](/using-k6/http-requests) by group.
You can also switch between the group and list layout by changing the **view as** selection in the top right.

![k6 Cloud URL Grouping](./images/Tags-and-Groups/cloud-insights-http-tab.png)

To filter results by tag, you can use the [analysis tab](/cloud/analyzing-results/analysis-tab).
