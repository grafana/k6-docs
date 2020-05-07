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
With that in mind, there are a number of non-performance related reasons for errors, which includes, but is not limited to:

- You're making invalid requests:
  - Invalid URLs, eg. with a typo in it or a hostname that is not in the public DNS system.
  - Missing required headers, eg. authentication/authorization headers or user-agent.
  - Sending the wrong body data.
- You're trying to test a system that's behind a firewall.
- You're hitting a rate limit.

**Note:** Failed responses are often returned much faster than successful responses.

## Not Enough Training Data

This alert is raised because our Smart Results algorithms need at least 100 complete VU iterations of training data plus an additional 15 seconds to produce meaningful output. Your test did not complete the 100 VU iterations necessary for the training data. We recommend increasing the test duration to get the full benefits of Performance Insights.

## Test Health and Informational Performance Insights

Test Health Performance Insights are alerts that intend to highlight test or script related issues. These issues, if not addressed, can either skew your results or make result analysis harder to parse through. These alerts are often quickly solved through changes in the test script or test configuration.

**Important**: The `Third Party Content` and `Too Many URLs` alerts are more informational alerts. Depending on what you are testing, it may be appropriate to disregard these alerts. High CPU or Memory usage **should never** be ignored.

## Third Party Content

**This is an best practice alert, we strongly recommend you remove third party requests from your test**

This alert is raised when we detect many different domains in a test. This is typically caused by your test script containing requests to 3rd party resources such as CDNs, social media scripts, analytic tools, etc. It's recommended to remove third party requests as it may violate the terms of service of that third party, that third party may throttle your requests skewing the percentiles of your results, or you may have no ability to impact performance of that third party.

_Special Notes:_

- You may have a valid reason to test your CDN. Most CDNs charge based on usage so your tests could result in additional costs from your CDN.
- Your system under test may utilize multiple domains, in which case you can ignore this alert.

## Too Many URLs

**This is an best practice alert, we strongly recommend you aggregate dynamic URLs as it will make analysis easier**

This alert is raised when we detect more than 500 unique URLs in your test results. This is commonly caused by a URL that contains a query parameter or other ID that is unique per iteration. e.g. tokens, session IDs, etc.

In the following example, our query parameter would produce large number of URL metrics:

<div class="code-group" data-props='{"labels": ["Using a name tag to aggregate URLs"]}'>

```javascript
for (var id = 1; id <= 600; id++) {
  http.get(`http://test.k6.io/?ts=${id}`);
}
// But you can group all these URL metrics together
// in our result analysis using the name tag,
// making it easier for you to interpret the data.
// Note that you must use the name tag for grouping.

for (var id = 1; id <= 600; id++) {
  http.get(`http://test.k6.io/?ts=${id}`, {
    tags: { name: 'test.k6.io?ts' },
  });
}
```

</div>

_Note:_ In some cases, the unique URL may be generated by a third party resource. As mentioned in the <a href="#third-party-content">Third Party Content alert</a>, it is a best practice to not include third party resources in your test scripts.

More on [URL Grouping](/using-k6/http-requests#url-grouping)

## Too Many Groups

**This is an best practice alert, we recommend reviewing how you use the [Group name](/javascript-api/k6/group-name-fn) in your test script.**

This alert is raised when we <b>detect a high number of groups</b> in your test script. The most common reason for this alert is an incorrect usage of the [Group name](/javascript-api/k6/group-name-fn) using it for aggregating different HTTP requests, or within a loop statement. When aggregating URLs, please use the name tag.

Groups are meant to organize and provide an overview of your result tests allowing you a BDD-style of testing. By allowing this organization, you can quickly find specific parts of your test. For example, the point where users are on a certain page or taking specific actions.

<div class="code-group" data-props='{"labels": ["Using groups to organize your test"]}'>

```javascript
import { group } from 'k6';

export default function() {
  group('user flow: returning user', function() {
    group('visit homepage', function() {
      // load homepage resources
    });
    group('login', function() {
      // perform login
    });
  });
}
```

</div>

If you want to group multiple HTTP requests, we suggest you use the [URL grouping](/using-k6/http-requests#url-grouping) feature of k6 to aggregate data into a single URL metric.

## High Load Generator CPU Usage

**This is a Test Health Alert. You should address this to ensure accurate results**

This alert is raised when we detect high utilization of the load generator CPU during a test. Over utilization of the load generator can skew your test results producing data that varies from test to test and unpredictably. Virtual Users will naturally try to execute as quickly as possible. The exact cause of over utilization can vary, but is likely due to one of the following reasons:

- Lack of sleep times in your scripts
  - Sleep times help with pacing and emulating real user behaviour
- High RPS per VU
  - When testing API endpoints you may configure your test to aggressively request an endpoint.
- Large number of requests in a single request batch
  - Requests made in a request batch will be made in parallel up to the default or defined limits
- Large amounts of data are returned in responses resulting in high memory utilization
  - When the memory of the load generator reaches near total consumption, the garbage collection efforts of the Load Generator can cause increase CPU utilization.
- A JavaScript exception is being thrown early in VU execution. This results in an endless restart loop until all CPU cycles are consumed.

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
