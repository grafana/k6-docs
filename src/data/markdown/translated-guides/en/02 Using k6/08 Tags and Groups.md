---
title: 'Tags and Groups'
excerpt: 'k6 provides the Tags and Groups APIs to help you during the analysis and easily visualize, sort and
filter your test results.'
---

A load test usually targets a service with different subsystems and resources.
This can make it hard to pinpoint the issues that are degrading performance.

k6 provides two scripting APIs to help you visualize, sort, and filter your test results.

- *Tags* categorize your checks, thresholds, custom metrics, and requests for in-depth filtering.
- *Groups* apply tags to the script's functions.

Besides these granular tags, you can also use options to set test-wide tags.
You can use these tags to compare results from multiple tests.

In addition to filtering results, you can also [use tags to limit the operations that your thresholds analyze](/using-k6/thresholds/#thresholds-on-tags).

## Tags

Tags are a powerful way to categorize your k6 entities and filter test results.

k6 provides two types of tags:

- *System tags* are tags that k6 automatically assigns.
- *User-defined* tags are tags that you add when you write your script.

## System tags

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

To disable some of the above tags, you can use the [`systemTags` option](/using-k6/k6-options/reference/#system-tags).
Keep in mind that some data collectors (e.g. `cloud`) may require certain tags.
You can also enable some additional system tags if you need them:

| Tag           | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `vu`          | the ID of the virtual user that executed the request                                                                              |
| `iter`        | the iteration number                                                                                                              |
| `ip`          | The IP address of the remote server                                                                                               |
| `ocsp_status` | the [Online Certificate Status Protocol (OCSP)](/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp) HTTPS status |

## User-defined tags

You can define your own tags to categorize k6 entities based on your test logic.
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

## Test-wide tags

Besides attaching tags to requests, checks, and custom metrics, you can set test-wide tags across all metrics.
You can set these tags in two ways:

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

## Code-defined tags

In the case, a user-defined tag with advanced logic for handling which tag to set is required then it's possible doing it by defining the tag from the code.

To support advanced tagging workflows, it is also possible to directly set and get them from scripts' code.

[k6/execution.vu.tags](/javascript-api/k6-execution/#vu) object's properties can indeed be directly assigned new key/value pairs to define new tags dynamically. This can prove useful, as demonstrated in the following example, to track a container's group from nested groups, and aggregating nested group's sub-metrics.

```javascript
import http from 'k6/http';
import exec from 'k6/execution';
import { group } from 'k6';

export const options = {
  thresholds: {
    'http_reqs{container_group:main}': ['count==3'],
    'http_req_duration{container_group:main}': ['max<1000'],
  },
};

export default function () {
  exec.vu.tags.containerGroup = 'main';

  group('main', function () {
    http.get('https://test.k6.io');
    group('sub', function () {
      http.get('https://httpbin.test.k6.io/anything');
    });
    http.get('https://test-api.k6.io');
  });

  delete exec.vu.tags.containerGroup;

  http.get('https://httpbin.test.k6.io/delay/3');
}
```

Using the same API, you can also retrieve any already set user-defined or system-defined tag:

```javascript
import exec from 'k6/execution';

export default function () {
  const tag = exec.vu.tags['scenario'];
  console.log(tag); // default
}
```

## Tagging stages

Thanks to some helper functions in the [k6-jslib-utils](/javascript-api/jslib/utils) project, if an executor supports the `stages` option, then a tag can be added with the current ongoing stage. Similar to the other ways for tagging, the tag will be added to all the samples collected during the iteration.

The first way for tagging the executed operations is invoking the `tagWithCurrentStageIndex` function for setting a `stage` tag for identifying the stage that has executed them:

```javascript
import http from 'k6/http';
import exec from 'k6/execution';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

export const options = {
  stages: [
    { target: 5, duration: '5s' },
    { target: 10, duration: '10s' },
  ],
};

export default function () {
  tagWithCurrentStageIndex();

  // all the requests will have a `stage` tag
  // with its value equal to the the index of the stage
  http.get('https://test.k6.io'); // e.g. {stage: "1"}
}
```

Additionally, a profiling function `tagWithCurrentStageProfile` can add a tag with a computed profile of the current running stage:

```javascript
import http from 'k6/http';
import exec from 'k6/execution';
import { tagWithCurrentStageProfile } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

export const options = {
  stages: [{ target: 10, duration: '10s' }],
};

export default function () {
  tagWithCurrentStageProfile();

  // all the requests are tagged with a `stage` tag
  // with the index of the stage as value
  http.get('https://test.k6.io'); // {stage_profile: ramp-up}
}
```

The profile value based on the current stage can be one of the following options:

| Profile | Description |
| ------- | ----------- |
| `ramp-up`   | The current stage has a target greater than the previous stage's target |
| `steady`    | The current stage has a target equal to the previous stage's target |
| `ramp-down` | The current stage has a target less than the previous stage's target |

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

To see how tags affect your test-result output, refer to the [k6 results output syntax](/results-output/real-time/json).

## Groups

For extra organization, you can use *groups* to organize a load script by functions.
You can also nest groups for BDD-style testing.

All metrics emitted in a [group](/javascript-api/k6/group/) have the tag `group` with a value of all wrapping group names separated by `::` (two colons).
The root group uses the name '' (empty string).
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
- To reuse common logic or organize your code better, group logic in functions, or create a [local JavaScript module](/using-k6/modules#local-filesystem-modules) and import it into the test script.
- To model advanced user patterns, check out [Scenarios](/using-k6/scenarios).

## Tags and Groups in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) you can see groups in the [result tabs](/cloud/analyzing-results/overview#result-tabs).

When using Groups, you can view [Checks](/using-k6/checks) and [HTTP Requests](/using-k6/http-requests) by group.
You can also switch between the group and list layout by changing the **view as** selection in the top right.

![k6 Cloud URL Grouping](./images/Tags-and-Groups/cloud-insights-http-tab.png)

To filter results by tag, you can use the [analysis tab](/cloud/analyzing-results/analysis-tab).
