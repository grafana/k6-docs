---
title: "Load testing websites"
excerpt: "This guide provides some recommendations to help you load testing a website or web app with k6."
---

This guide describes some recommendations to help you load testing a website or web app.

A load test of a website simulates many concurrent users mimicking one or several real user journeys that generally involve complex actions in a logical flow.  This guide can help you creating these user scenarios, getting started, and avoid common pitfalls.

## Should I load test my website?

You should if you are concerned about the <b>availability and scalability of your website</b>.

The performance golden rule states:

> 80-90% of the end-user response time is spent on the frontend.

But this is not necessarily accurate when the number of users visiting your website increases. In this scenario, the frontend work  will always be the same , but the backend time might grow exponentially with the rise of concurrent users if your system struggles with the increased concurrency.

![](./Frontend-Backend-LoadTesting.png)

In the <a href="https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/">performance golden rule article</a> Steve Souders pointed out that:

> If you’re worried about availability and scalability, focus on the backend.

Load testing simulates many concurrent users visiting your website to help you analyze how the performance of your backend behaves.

## What should I check load testing a website?

The goal of load testing is to test how your system behaves under a particular load. A performance test will focus on testing the <b>performance of the requests to your backend</b>. The two most basic aspects to analyze are the <b>server response time</b> and the number of <b>returned errors</b>.

A performance test is not responsible for testing the User Interface, and it will not check visual aspects of UI elements like the position, size, form, etc.


In fact, [k6 does not run a browser engine](/#what-k6-does-not), and it won’t render a webpage as a browser.


```js
// The following request will ONLY load the HTML index page.
// Other assets that a browser would load when accessing this webpage will NOT be loaded.
http.get(‘https://google.com’)
```

Therefore, you cannot use k6 to measure the rendering time or other Browser Real User Metrics.

In the context of load testing, browser metrics are in most cases less useful. Each browser runs independently, and the number of concurrent users visiting your website will not impact these metrics.

## What should I start load testing?

To begin, we recommend that you consider performance testing to be an iterative and continuous process. You start small, test frequently and iterate, iterate, iterate.

The first thing you have to decide is what to load test first.

On one side, you should evaluate which are the performance aspects that are most valuable to your business and has the most significant risks.

On the other side, you have to identify what your users will do regularly. You could look at your analytics tools to find the most frequent user journeys.

With this information, it’s time to analyze the frequency of usage, business value, performance risks, and any other critical performance aspect of your organization to decide what to load test first.

As a rule of thumb, <a href="https://k6.io/our-beliefs#simple-testing-is-better-than-no-testing">Simple testing is better than no testing</a>:

> Start small and simple, make sure you get something out of the testing first, then expand the test suite and add more complexity until you feel that you’ve reached the point where more effort spent on realism will not give enough return on your invested time.


Once you adopt performance testing in your development lifecycle, your performance test suite will grow over time. You will add and update performance tests based on the evolution of your application, new performance areas, bugs, and the maturity of your team and processes, amongst other factors.

To sum up, start small, test frequently and iterate, iterate, iterate.

## Should I load test my website in production or pre-production?

We recommend to <a href="https://k6.io/our-beliefs#load-test-in-a-pre-production-environment">Load test in a pre-production environment</a> that mimics the production environment as closely as possible.

Testing regularly in a pre-production environment allows assessing the performance of your website over time and catch performance regressions before they reach production.

Load testing in pre-production allows breaking your website without worrying about the interruption of your service.  Load testing in production is risky, but if your processes and team are mature, you could run your load tests in production as part of your <a href="https://principlesofchaos.org/">chaos experiments</a>. Sometimes it is the best way to get a picture of the real world.

## Which type of performance tests should I run against my website?

The best results come when you run your tests in a systematic way, where you can compare data between test runs, and you change a minimal number of variables between tests. For this reason, we recommend the following testing pattern:

### Baseline tests

A test with a small number of Virtual Users meant to produce response times for a system experiencing favorable conditions. You want a low enough number not to cause any stress on your system.

This test typically runs for 5-10 minutes, and it will establish the baseline for future comparisons.
You could use the information on the analysis of these test results to create [thresholds](/using-k6/thresholds) in your future tests.

### Stress tests

A test that steps through different levels of load and will highlight where performance problems start to happen.
You should expect to iterate this test multiple times as you enter a test-> analyze-> make changes-> repeat pattern.


### Load tests

After you experience a stable stress test result, this test will become part of your load tests and you should regularly run them to confirm the system can meet your performance goals.

You could also define your load tests based on the observation of your normal and peak traffic levels. You should use data on how many users you have normally and any business goals you may have for concurrency.

Use the formula:

> VUs = (Peak Hourly Sessions * Average Session Duration in Seconds) / 3600

You should run your test long enough for all VUs to complete 2-5 complete iterations of your test script. If your user journey takes 5 minutes to complete, 10+ minutes would be a reasonable test length.

### Other tests as required

You may have other traffic patterns you want to test, for example, from different load zones or different ramping profiles. Continue testing here as needed.

### Continuous and Regression Testing

Many users schedule performance tests or run them as part of a CI pipeline to monitor for performance regressions. Since you’ve created your test scripts, most of the work is already done! Read more in our [Automated Performance Testing guide](/testing-guides/automated-performance-testing).

## Best practices load testing websites

### Start recording your user journey

Load tests should mimic user journeys as closely as possible.  These user journeys, aka user scenarios, generally involve complex actions in a logical flow (dozens or hundreds of requests).

The process of creating this type of load test could be tedious. But the recording of a user session could facilitate the job of starting the test creation for you.

Check out the [Session Recording guide](/using-k6/session-recording-har-support) to learn more about how to auto-generate your load test from a user session.

### Do not include third-party requests


You may have various external requests happening for a normal visitor on your site — for example, Analytics tools, Social Networks, Widgets, etc.

While these requests do impact the user experience on the frontend, they have no impact on the performance of your system on your backend. We highly recommend removing all third party requests from your test script for the following reasons:
- Third-party requests have no impact on your backend performance.
- Third parties may throttle requests, skewing your results.
- Third parties add a lot of noise to your test result data which makes understanding results harder.
- It may be against the TOS with the third party to run a test against their system.


### Do not include your CDN assets

You should consider your CDN as a third-party provider and do not include CDN requests in your load tests because of the reasons explained previously. Additionally, load testing a CDN may cost you money.

But there are also valid cases to test your CDN in case you want to understand something about your CDN provider.

### Calculate the VU number

You could define your load tests based on the observation of your normal and peak traffic levels, and use this formula to determine the number of VUs to specify in your load tests:

> VUs = (hourly sessions \* average session duration in seconds)/3600
>
> - hourly sessions = Number of sessions per hour
> - average session duration = Average time between the first and last request of each user

Refer to [Determining Concurrent Users in Your Load Tests](https://k6.io/blog/monthly-visits-concurrent-users) to learn how to calculate the formula using Google Analytics.

### Tag different types of resources

By default, the standard metrics of a load testing tool -- for example, the response time metric will aggregate the values of all the website requests. But you might want to see the results of these metrics filtered by the type of resources:

- 95th percentile response time of all the images.
- 99th percentile response time of all the API requests.

Different types of resources could behave very differently and could make <b>meaningless the value of the aggregated metrics</b>.


If you might want to filter your metrics based on different types of requests, consider using the [tagging feature](/using-k6/tags-and-groups#tags).


```js
http.get("http://myweb.com/images/logo.png", { tags: { assets: "image" } });
```

### Group the different webpages

[Groups](/using-k6/tags-and-groups#groups) help you organize your load test around a common logic.
When a load test simulates a user scenario visiting multiple pages, it is a good practice to set up a group for each webpage to organize your load test and facilitate the visualization of your test results.

```js
group("visit homepage", function() {
  // load homepage resources
});
group("login page", function() {
  // load login page and perform login
});
```

## See also

- [Session Recording guide](/using-k6/session-recording-har-support)
- [Data Correlation in your test script](/examples/correlation-and-dynamic-data)
- [Parameterizing from a JSON or CSV file](/examples/data-parameterization)
- [Determining Concurrent Users in Your Load Tests](https://k6.io/blog/monthly-visits-concurrent-users)
