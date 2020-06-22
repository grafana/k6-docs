---
title: 'Tags and Groups'
excerpt: ''
---

The analysis of your load results is a required step to find performance issues; a load test
usually targets a service involving different subsystems and resources, making it hard to find
the issue/s degrading your performance.

k6 provides two scripting APIs to help you during the analysis and easily visualize, sort and
filter your test results.

- Groups: organize your load script around common logic.
- Tags: categorize your checks, thresholds, custom metrics and requests with tags for in-depth filtering.

## Groups

Groups are optional, and it allows you to “group” your load script. Groups can be nested,
allowing you the BDD-style of testing.

<div class="code-group" data-props='{"labels": ["groups.js"], "lineNumbers": [true]}'>

```js
import { group } from 'k6';

export default function () {
  group('user flow: returning user', function () {
    group('visit homepage', function () {
      // load homepage resources
    });
    group('login', function () {
      // perform login
    });
  });
}
```

</div>

Your test results will be grouped based on your group names for easy visualization. Each
execution of the supplied `group()` function also emits a `group_duration`
[metric](/using-k6/metrics) that contains the total time it took to execute that group
function. This, combined with the metric tags described below, enables very flexible performance
monitoring of different groups in your test suite.

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
| `method`      | the HTTP method name (e.g. `GET`, `POST`, etc.)                                                                                                                                   |
| `url`         | the HTTP request URL                                                                                                                                                              |
| `name`        | the HTTP [request name](/using-k6/http-requests#url-grouping)                                                                                                                     |
| `group`       | the full [group](#groups) path                                                                                                                                                    |
| `check`       | the [Check](/using-k6/checks) name                                                                                                                                                |
| `error`       | a string with a non-HTTP error message (e.g. network or DNS error)                                                                                                                |
| `error_code`  | added in k6 v0.24.0, this is a number that is unique for different error types; a list of current error codes can be found at the [Error Codes](/javascript-api/error-codes) page |
| `tls_version` | the [TLS](/using-k6/protocols/ssl-tls) version                                                                                                                                    |

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

<div class="code-group" data-props='{"labels": ["tagging-example.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { check } from 'k6';

let myTrend = new Trend('my_trend');

export default function () {
  // Add tag to request metric data
  let res = http.get('http://httpbin.org/', {
    tags: {
      my_tag: "I'm a tag",
    },
  });

  // Add tag to check
  check(
    res,
    { 'status is 200': (r) => r.status === 200 },
    { my_tag: "I'm a tag" },
  );

  // Add tag to custom metric
  myTrend.add(res.timings.connecting, { my_tag: "I'm a tag" });
}
```

</div>

## Test wide tags

Besides attaching tags on requests, checks and custom metrics you can set test wide tags that
will be set across all metrics. You can either set the tags on the CLI using one or more
`--tag NAME=VALUE` flags or in the script:

<div class="code-group" data-props='{"labels": ["test-wide-tags.js"], "lineNumbers": [true]}'>

```js
export let options = {
  tags: {
    name: 'value',
  },
};
```

</div>

## Tags in results output

<div class="code-group" data-props='{"labels": ["output.js"], "lineNumbers": [true]}'>

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
      "url ": "https://httpbin.org/get "
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

</div>

Read more about the [k6 results output syntax](/getting-started/results-output/json) to
see how tags affect your test result output.

## Tags and Groups in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) you can see groups
in the [result tabs](/cloud/analyzing-results/overview#result-tabs).

When using Groups, [Checks](/using-k6/checks) and [HTTP Requests](/using-k6/http-requests)
can be viewed by group, as shown below. You can switch between the group and list layout by changing the "view as"
selection in the top right.

![Cloud Insights Grouping](/images/cloud-insights-http-tab.png)

Additionally you can filter the results by tags in the [analysis tab](/cloud/analyzing-results/analysis-tab)
as shown below:

![filter](/images/analysis-tab-tags.png)
