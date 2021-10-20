---
title: 'Performance Insights'
excerpt: 'Performance Insights are automated algorithms designed to help highlight performance issues automatically'
---

## Background

k6 Cloud's Performance Insights are algorithms built into k6 Cloud Test Results. Our algorithms are automatically executed as part of test result processing. This happens when you run a cloud test `k6 cloud myScript.js` or when you stream a local execution to the cloud `k6 run myScript.js -o cloud`.

> ### Using Performance Insights
>
> In order to utilize Performance Insights, all you need to do is run a test. The algorithms automatically analyze
> the raw metrics and data. If we find something, we will let you know in the Performance Overview section at the top of your test

## Throughput Limit

This alert is raised when a throughput limit has been detected. The number of active in-flight requests continue to grow as the number of Virtual Users are increasing, while the request rate (finished requests) has flatlined. This is indicative that the system under test is overloaded, thus resulting in higher response times. We recommend that you correlate the performance bottleneck with data from an APM and/or server monitoring tool. After making changes, you should run your tests again at the same Virtual User level, to verify if your changes have improved performance on the system under test.

## Increased HTTP failure rate

This alert is raised when a period of elevated HTTP errors has been detected (10% higher than in the beginning of the test). There could be a number of reasons for this, e.g. web server configuration (timeouts, rate limiting etc.) or internal errors caused by saturation of a resource (CPU, memory, disk I/O or database connections). It typically means the target system is close to its performance limit.

**Note:** Failed responses are often returned much faster than successful responses. Consequently, an increased HTTP error rate may produce misleading request rate and response time metrics.

## High HTTP failure rate

The total number of HTTP(s) errors is higher than 15% during the first 100 completed script iterations.

Errors that occur early on are typically not considered to be performance related. Our algorithms also have not detected an increase in the error rate as load has increased.
With that in mind, there are a number of non-performance related reasons for errors, including, but not limited to:

- You're making invalid requests:
  - Invalid URLs, e.g. with a typo in it or a hostname that is not in the public DNS system
  - Missing required headers, e.g. authentication/authorization headers or user-agent
  - Sending the wrong body data
- You're trying to test a system that's behind a firewall
- You're hitting a rate limit

**Note:** Failed responses are often returned much faster than successful responses.

## Not Enough Training Data

This alert is raised because our Smart Results algorithms need at least 100 complete VU iterations of training data plus an additional 15 seconds to produce meaningful output. Your test did not complete the 100 VU iterations necessary for the training data. We recommend increasing the test duration to get the full benefits of Performance Insights.

## Duration Too Short

Similarly to `Not Enough Training Data`, this alert is raised because our system does not have enough training data to produce meaningful results. More than 100 complete VU iterations were detected but duration needs to be extended in order to analyze data.

## Test Health and Informational Performance Insights

Test Health Performance Insights are alerts that intend to highlight test or script related issues. These issues, if not addressed, can either skew your results or make result analysis harder to parse through. These alerts are often quickly solved through changes in the test script or test configuration.

**Important**: The `Third Party Content` and `Too Many URLs` alerts are more informational alerts. Depending on what you are testing, it may be appropriate to disregard these alerts. High CPU or Memory usage **should never** be ignored.

## Third Party Content

**This is a best practice alert, we strongly recommend you remove third party requests from your test**

This alert is raised when we detect many different domains in a test. This is typically caused by your test script containing requests to 3rd party resources such as CDNs, social media scripts, analytics tools, etc. It's recommended to remove third party requests as it may violate the terms of service of that third party, that third party may throttle your requests skewing the percentiles of your results, or you may have no ability to impact performance of that third party.

_Special Notes:_

- You may have a valid reason to test your CDN. Most CDNs charge based on usage so your tests could result in additional costs from your CDN.
- Your system under test may utilize multiple domains, in which case you can ignore this alert.

## Too Many URLs

**This is a best practice alert, we strongly recommend you aggregate dynamic URLs as it will make analysis easier**

This alert is raised when we detect more than 500 unique URLs in your test results. This is commonly caused by a URL that contains a query parameter or other ID that is unique per iteration. e.g. tokens, session IDs, etc.

In the following example, our query parameter would produce large number of URL metrics:

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

_Note:_ In some cases, the unique URL may be generated by a third party resource. As mentioned in the <a href="#third-party-content">Third Party Content alert</a>, it is a best practice to not include third party resources in your test scripts.

More on [URL Grouping](/using-k6/http-requests#url-grouping)

## Too Many Groups

**This is a best practice alert, we recommend reviewing how you use the [Group name](/javascript-api/k6/group-name-fn) in your test script.**

This alert is raised when we <b>detect a high number of groups</b> in your test script. The most common reason for this alert is an incorrect usage of the [Group name](/javascript-api/k6/group-name-fn) using it for aggregating different HTTP requests, or within a loop statement. When aggregating URLs, please use the name tag.

Groups are meant to organize and provide an overview of your result tests allowing you a BDD-style of testing. By allowing this organization, you can quickly find specific parts of your test. For example, the point where users are on a certain page or taking specific actions.

<CodeGroup labels={["Using groups to organize your test"]}>

```javascript
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

</CodeGroup>

If you want to group multiple HTTP requests, we suggest you use the [URL grouping](/using-k6/http-requests#url-grouping) feature of k6 to aggregate data into a single URL metric.

## Too Many Metrics

**This is a best practice alert, we strongly recommend reviewing how you specify and use [metrics](/using-k6/metrics/).**

This alert is raised when we <b>detect a high number of metrics</b> in your test script. Considering k6 can generate two types of metrics (built-in and custom), you should check if your script contains too many unique URL or generates custom metrics in a loop.

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


## High Load Generator CPU Usage

**This is a Test Health Alert. You should address this to ensure accurate results**

This alert is raised when we detect high utilization of the load generator CPU during a test. Over utilization of the load generator can skew your test results producing data that varies from test to test and unpredictably. Virtual Users will naturally try to execute as quickly as possible. The exact cause of over utilization can vary, but is likely due to one of the following reasons:

- Lack of sleep times in your scripts
  - Sleep times help with pacing and emulating real user behaviour
- High RPS per VU
  - When testing API endpoints you may configure your test to aggressively request an endpoint
- Large number of requests in a single request batch
  - Requests made in a request batch will be made in parallel up to the default or defined limits
- Large amounts of data are returned in responses resulting in high memory utilization
  - When the memory of the load generator reaches near total consumption, the garbage collection efforts of the Load Generator can cause increase CPU utilization
- A JavaScript exception is being thrown early in VU execution. This results in an endless restart loop until all CPU cycles are consumed

Possible fixes:

- Increase sleep times where appropriate
- Increase the number of VUs to produce less RPS per VU (thus the same total load)
- Utilize multiple load zones to spread VUs out across multiple regions

## High Load Generator Memory Usage

**This is a Test Health Alert. You should address this to ensure accurate results**

This alert is raised when we detect high utilization of load generator memory during a test. When memory is highly utilized in a test, it can result in some unexpected behaviour or failures. It may also cause high CPU utilization as garage collection efforts consume more and more of the CPU cycles.

Possible fixes:

- Utilize the test option `discardResponseBodies` to throw away the response body by Default
  - Use `responseType:` to capture the responseBodies you may require
  
## Disabling Specific Performance Insights

It is possible to prevent one or more insights from showing up when executing load tests. This can be done by using `ext.loadimpct.insights` object in the `options`:


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

When `disabled` array is provided, all insights in it will be skipped when displaying result analysis. In contrast, you can provide a list of **enabled** insights which excludes all other insights from analysis.

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

In the above example only one insight will potentially be shown (given the script executes with a high HTTP failure rate).

It is also possible to enable/disable multiple insights by their category (also called "set"). To achieve this, specify the `enabledSets`/`disabledSets` array in the `insights` object.

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

For all insights and their identifiers see the table below:

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
| High Load Generator CPU Usage    | `health_high_loadgen_cpu_usage`          | `health`        |
| High Load Generator Memory Usage | `health_high_loadgen_mem_usage`          | `health`        |
