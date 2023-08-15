---
title: 'Performance Insights'
excerpt: 'Performance Insights are automated algorithms that help highlight and diagnose performance issues.'
canonicalUrl: https://grafana.com/docs/grafana-cloud/k6/analyze-results/get-performance-insights/ 
---

Whenever you run a test in k6 Cloud, *Performance Insights* algorithms automatically process the raw metrics and data.

If k6 finds an issue, it will notify you at the end of the test and recommend mitigations.

k6 categorizes performance insights into three sets:
- *HTTP load* insights help diagnose issues with your system under test.
- *Best practices* insights help diagnose issues with your test script.
- *Health alert* insights help discover issues with your load generator.

<Glossary>

- [Throughput limit](#throughput-limit)
- [Increased HTTP failure rate](#increased-http-failure-rate)
- [Not enough training data](#not-enough-training-data)
- [Duration too short](#duration-too-short)
- [Third-party content](#third-party-content)
- [Too many URLs](#too-many-urls)
- [Too many groups](#too-many-groups)
- [Too many metrics](#too-many-metrics)
- [Too many time series](#too-many-time-series)
- [Outdated k6 Release Used](#outdated-k6-release-used)
- [Invalid metric names](#invalid-metric-names)
- [High load generator CPU usage](#high-load-generator-cpu-usage)
- [High load generator memory usage](#high-load-generator-memory-usage)

</Glossary>

You can [disable Performance Insights](#disabling-performance-insights) alerts, either for a single insight or a set of insights.

## HTTP load alerts

HTTP load alerts happen when your test results have a high number of active requests or HTTP errors.

### Throughput limit

*Identifier*: `http_load_throughput_limit`
- **Happens when**:
  k6 detects a throughput limit.
  The number of active in-flight requests continues to grow as the number of Virtual Users increases, while the request rate (finished requests) stays flat.
- **What it might indicate**:
  The system under test is overloaded, thus resulting in higher response times.
- **Recommendations**:
  Correlate the performance bottleneck with data from an APM or server monitoring tool.
  After you make your changes, rerun your tests at the same VU level so you can verify whether your changes have improved performance.

### Increased HTTP failure rate

*Identifier*: `http_load_increased_http_failure_rate`
- **Happens when**:
   k6 detects a period of elevated HTTP errors(10% higher than the beginning of the test).
- **What it might indicate**:
   - Web server configuration issues (timeouts, rate limiting, etc.)
   - Internal errors caused by saturation of a resource (CPU, memory, disk I/O or database connections).
     Saturation typically means the target system is close to its performance limit.

<Blockquote mod="note" title="Failed responses are often returned much faster than successful responses.">

Consequently, an increased HTTP failure rate may produce misleading metrics for request rates and response times.

</Blockquote>

### High HTTP failure rate

*Identifier*: `http_load_high_http_failure_rate`
- **Happens when**:
  The total number of HTTP(s) errors is higher than 15% during the first 100 completed script iterations.
- **What it might indicate**:
  Errors that occur early in a test are often not performance-related.
  Instead, your script might be making invalid requests:
  - Invalid URLs, e.g. with typos or hostnames outside the public DNS system
  - Missing required headers, e.g., for authentication, authorization, or user-agents
  - Sending the wrong body data

  The system under test also might be intentionally limiting requests:
  - It may be behind a firewall.
  - It may have a rate limit that your test is reaching.
- **Recommendations**: Check that your script is valid and that it can properly access the system.
  - Run a single iteration of the script locally to troubleshoot the failing requests running a load test.
  - In the script, verify that the failing requests are formulated correctly and return the expected response.
  - Verify that any user accounts have sufficient permissions to access the application.
  - Verify that the application is publicly accessible.

<Blockquote mod="note" title="Failed responses are often returned much faster than successful responses.">

Consequently, a high HTTP failure rate may produce misleading metrics for request rates and response times.

</Blockquote>


### Not enough training data

*Identifier*: `best_practice_not_enough_training_data`
- **Happens when**:
  Your test did not complete the 100 VU iterations necessary for the training data.
  To be meaningful, Performance Insights need at least 100 complete VU iterations of training data plus an additional 15 seconds.
- **Recommendations**:
  Increase the test duration or number of iterations.

### Duration too short

*Identifier*: `best_practice_duration_too_short`
- **Happens when**:
k6 detects more than 100 complete VU iterations, but the duration needs to be extended to properly analyze data.
Similar to `Not Enough Training Data`, this alert is raised because our system does not have enough training data to produce meaningful results.
- **Recommendations**:
  Increase the test duration or number of iterations.


## Best practice alerts

Best practices alerts happen when your test script generates either too much or too little data to be useful.

These issues can either skew your results or make results harder to analyze and parse.
These alerts are often quickly solved with changes in the test script or test configuration.

### Third-party content

*Identifier*: `best_practice_third_party_content`
- **Happens when**:
  k6 detects many different domains in a test.
- **What it might indicate**:
  Your test script contains requests to 3rd party resources such as CDNs, social media scripts, analytics tools, etc.
- **Recommendations**:
  Remove third-party requests:
  - The requests may violate the third party's ToS.
  - The third party may throttle your requests, skewing the percentiles of your results.
  - You may have no ability to affect that third party's performance.

<Blockquote mod="note" title="You may have valid reasons to ignore this alert.">

- Your system under test may use multiple domains, in which case you can ignore this alert.
- You also may have a valid reason to test your CDN. However, most CDNs charge based on usage, so your tests could generate additional costs from your CDN.

</Blockquote>

### Too many URLs

*Identifier*: `best_practice_too_many_urls`
- **Happens when**:
  k6 detects more than 500 unique URLs in your test results.
-   **What it might indicate**:
   URL may contain a query parameter or other ID that is unique per iteration. e.g., tokens, session IDs, etc.
  In the following example, our query parameter would produce a large number of URL metrics:

  <CodeGroup labels={["Using a name tag to aggregate URLs"]}>

  ```javascript
  import http from 'k6/http';

  for (let id = 1; id <= 600; id++) {
    http.get(`http://test.k6.io/?ts=${id}`);
  }
  // But you can group all these URL metrics together
  // in our result analysis using the name tag,
  // making it easier for you to interpret the data.
  // Note that you must use the name tag for grouping.

  for (let id = 1; id <= 600; id++) {
    http.get(`http://test.k6.io/?ts=${id}`, {
      tags: { name: 'test.k6.io?ts' },
    });
  }
  ```

  </CodeGroup>

- **Recommendations**:
  Aggregate dynamic URLs as it will make analysis easier.
  To see how, refer to [URL Grouping](/using-k6/http-requests#url-grouping).

<Blockquote mod="note" title="In some cases, the unique URL may be generated by a third party">

As mentioned in the [Third Party Content](#third-party-content) alert, best practices recommend excluding third-party resources in your test scripts.

</Blockquote>

### Too many groups

*Identifier*: `best_practice_too_many_groups`
- **Happens when**:
  k6 detects a high number of groups in your test script.
- **What it might indicate**:
  This alert commonly happens when a test uses a [Group name](/javascript-api/k6/group) to aggregate different HTTP requests or puts the group name in a loop statement.
- **Recommendations**:
  - Use the `name` tag to aggregate URLs.
  - Add [Group names](/javascript-api/k6/group) in your test script.
  - If you want to group multiple HTTP requests, use [URL grouping](/using-k6/http-requests#url-grouping) to aggregate data in a single URL metric.

### Too many metrics

*Identifier*: `best_practice_too_many_metrics`
- **Happens when**:
  k6 detects a high number of metrics in your test script.
- **Recommendations**:
  Considering k6 can generate two types of metrics (built-in and custom), there are two things to check:
  - Whether your script contains too many unique URLs.
  - Whether it generates custom metrics in a loop.

Having too many metrics in a single test is considered an anti-pattern because it makes result analysis difficult.

The following example shows how custom metrics can be misused:

<CodeGroup labels={["Using custom metrics to count successful requests"]}>

```javascript
import { Counter } from 'k6/metrics';
import http from 'k6/http';

const successCounts = [];
for (let id = 1; id <= 1000; id++) {
  successCounts.push(new Counter(`successCount_${id}`));
}
for (let id = 1; id <= 1000; id++) {
  const response = http.get(`http://test.k6.io/?ts=${id}`);
  successCounts[id].add(response.status === 200);
}
// k6 can count responses by status codes on its own.
// Additionally, URLs should be grouped as it's shown
// in Too Many URLs alert example.
```

</CodeGroup>

### Too many time series

*Identifier*: `best_practice_too_many_time_series`
- **Happens when**:
  k6 detects a high number of time series in your test script.
- **What it might indicate**:
  This alert commonly happens when a test has an excessive number of unique values for `tags`.
- **Recommendations**:
  - Use [URL grouping](/using-k6/http-requests#url-grouping) to aggregate data in a single URL metric.
  - Use fewer tag values when using [custom tags](/using-k6/http-requests/#http-request-tags).
  - If you followed all previous recommendations and still get this alert, use [`drop_metrics` and `drop_tags`](/cloud/creating-and-running-a-test/cloud-scripting-extras/cloud-options) to reduce the cardinality of time series.

### Outdated k6 release used

*Identifier*: `best_practice_outdated_k6_release_used`
- **Happens when**:
  you use a legacy version of k6 that is significantly older than the latest stable version.
- **Recommendations**:
  - [Install the latest release of k6](/get-started/installation), or upgrade your existing packages.
  - Update the k6 binary that your CI/CD pipeline uses to run tests.
  - If you're part of an organization or team, collectively decide on a version of k6 to use going forward for consistency and ease of comparison.

### Invalid metric names

_Identifier_: `best_practice_invalid_metric_names`

- **Happens when**:
  you tag your custom metrics with invalid names.
- **Recommendations**:
  - Ensure your custom metric names comply with OpenTelemetry and Prometheus limitations. Such as:
    - Only contain valid symbols of ASCII letters, numbers, or `_`.
    - Metric names must not start with a number.

## Health alerts

Health alerts happen when the load generator has high resource utilization.

<Blockquote mod="Attention" title="Pay attention to health alerts">

An overutilized load generator can skew test results.

</Blockquote>

### High load generator CPU usage

*Identifier*: `health_high_loadgen_cpu_usage`
- **Happens when**:
  k6 detects high utilization of the load-generator CPU during a test.
  Overutilization of the load generator can skew your test results, producing data that varies unpredictably from test to test.
  Virtual Users will naturally try to execute as quickly as possible.
- **What it might indicate**:
  The exact cause of overutilization varies, but the following reasons are most likely:
  - Lack of sleep times in your scripts. Sleep times help pace and emulate real user behavior.
  - High RPS per VU. When testing API endpoints, you may configure your test to aggressively request an endpoint.
  - Large numbers of requests in a single request batch. Requests made in a request batch are parallelized up to the default or defined limits.
  - Large amounts of data are returned in responses, resulting in high memory utilization.
  - When the memory of the load generator reaches near total consumption, the garbage-collection efforts of the load generator can increase CPU utilization.
  - A JavaScript exception is being thrown early in VU execution, resulting in an endless restart loop until all CPU cycles are consumed.
- **Recommendations**:
  - Increase sleep times where appropriate.
  - Increase the number of VUs to produce less RPS per VU (thus the same total load)-
  - Use multiple load zones to spread VUs across multiple regions.


### High load generator memory usage

*Identifier*: `health_high_loadgen_mem_usage`
- **Happens when**:
  k6 detects high utilization of load-generator memory during a test.
  When memory utilization is high, the results might have unexpected behavior or failures.
  High memory utilization may also cause high CPU utilization, as garbage-collection efforts consume more and more CPU cycles.
- **Recommendations**:
  - Use the test option `discardResponseBodies` to throw away the response body by default
  - Use `responseType:` to capture the response bodies you may require

## Disabling performance insights

You can disable one or more insights from showing up when executing load tests.
This can be done by using `ext.loadimpact.insights` object in the `options`:


```javascript
export const options = {
  ext: {
    loadimpact: {
      insights: {
        disabled: ['http_load_throughput_limit', 'health_high_loadgen_cpu_usage'],
      },
    },
  },
};
```

When the `disabled` array is provided, k6 omits all results from the result analysis. In contrast, you can provide a list of **enabled** insights,  excluding all other insights from analysis.

```javascript
export const options = {
  ext: {
    loadimpact: {
      insights: {
        enabled: ['http_load_high_http_failure_rate'],
      },
    },
  },
};
```

In the preceding example, only one insight will be shown (given that the script executes with a high HTTP failure rate).

You can also enable or disable multiple insights by their category (also called "set"). To achieve this, specify the `enabledSets` or `disabledSets` array in the `insights` object.

```javascript
export const options = {
  ext: {
    loadimpact: {
      insights: {
        enabledSets: ['http_load'],
      },
    },
  },
};
```

Or alternatively:

```javascript
export const options = {
  ext: {
    loadimpact: {
      insights: {
        disabledSets: ['best_practice', 'health'],
      },
    },
  },
};
```

For all insights and their identifiers, refer to the table below:

| Name                             | Identifier                               | Set Identifier  |
|----------------------------------|------------------------------------------|-----------------|
| Throughput Limit                 | `http_load_throughput_limit`             | `http_load`     |
| Increased HTTP failure rate      | `http_load_increased_http_failure_rate`  | `http_load`     |
| High HTTP failure rate           | `http_load_high_http_failure_rate`       | `http_load`     |
| Not Enough Training Data         | `best_practice_not_enough_training_data` | `best_practice` |
| Duration Too Short               | `best_practice_duration_too_short`       | `best_practice` |
| Third Party Content              | `best_practice_third_party_content`      | `best_practice` |
| Too Many URLs                    | `best_practice_too_many_urls`            | `best_practice` |
| Too Many Groups                  | `best_practice_too_many_groups`          | `best_practice` |
| Too Many Metrics                 | `best_practice_too_many_metrics`         | `best_practice` |
| Too Many Time Series             | `best_practice_too_many_time_series`     | `best_practice` |
| Outdated k6 Release Used         | `best_practice_outdated_k6_release_used` | `best_practice` |
| Invalid Metric Names             | `best_practice_invalid_metric_names    ` | `best_practice` |
| High Load Generator CPU Usage    | `health_high_loadgen_cpu_usage`          | `health`        |
| High Load Generator Memory Usage | `health_high_loadgen_mem_usage`          | `health`        |

