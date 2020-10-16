---
title: 'What are VUs (Virtual Users)?'
excerpt: 'Definition of what Virtual Users are in context of k6 cloud service.'
---

## Background

k6 cloud's definition of Virtual Users(VUs) along with supplemental information to cover common questions about VUs.

Virtual Users(VUs) are the entities in k6 cloud service that execute your test script and make HTTP(s) or websocket requests. VUs are concurrent and will continuously iterate through the default function until they ramp down or the test ends. Any number of VUs will create a number of sessions a factor larger than their total count, depending on test and script length.

For example, if you ran a test with 10 VUs for 10 minutes and the default function took each VU 30 seconds to complete, you would see roughly 200 completions/total sessions generated from this test. This is approximate and will vary based on your ramping configuration.

## Virtual Users in context of Web Apps/Websites

Virtual Users are designed to act and behave like real users/browsers would. That is, they are capable of making multiple network connections in parallel, just like a real user in a browser would. When using a `http.batch()` request, HTTP requests are sent in parallel. Further, you can even control the specifics of this behavior through the [batch](/using-k6/options#batch) and [batchPerHost](/using-k6/options#batchPerHost) options. The default is 10 connections in parallel and per host. For further information, refer to the article about [load testing websites](/testing-guides/load-testing-websites).

<!--
This should become a note?
When using our [Chrome Extension](/cloud/creating-and-running-a-test/recording-a-test-script) or [converting a HAR file](/cloud/creating-and-running-a-test/converters), all requests made within 500 ms of one another will be placed into a `http.batch()`.

-->

## Virtual Users in context of APIs

When testing individual API endpoints, you can take advantage of each VU making multiple requests each to produce requests per second(rps) a factor higher than your VU count. e.g. Your test may be stable with each VU making 10 rps each. If you wanted to reach 1000 RPS, you may only need 100 VUs in that case. This will vary based on what you are testing and the amount of data returned. For more information on testing APIs, please refer to our article [API Load Testing](/testing-guides/api-load-testing)

Virtual Users are using multiple parallel network connections, they will be opening multiple concurrent network connections and transferring resources in parallel. This results in faster page loads, more stress on the target server, and more realistic result data set. **Not all load testing tools operate in this more complex and realistic fashion**

## Calculating the number of Virtual Users needed

Calculating the number of virtual users can be done by using this formula:

<CodeGroup labels={["Formula for calculating the number of VUs needed"]}>

```text
VUs = (hourly sessions * average session duration in seconds)/3600
```

</CodeGroup>

You may want to use this formula multiple times, with different data such as sessions in your busiest/peak hour, a normal hour, etc. When setting up your test, if your user journey (default function) mimics an average user session, the number of VUs determined by the formula would produce the amount of sessions you entered if you ran your test for an hour.
