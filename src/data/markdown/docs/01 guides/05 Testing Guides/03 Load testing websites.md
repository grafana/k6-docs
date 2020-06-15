---
title: "Load testing websites"
head_title: 'How to Load Test a Website: The k6 Guide'
excerpt: "Do you know how many users your site can handle? This guide answers the WHY and WHEN you should load test your website and gives you the best practices for load testing websites or web apps with k6. Let’s get started."
---

Bad user experience impacts business. This is the reason you might want to know how many concurrent users your website can handle appropriately.

Load testing helps you simulate those users to asses your system performance and know if your website or web app meets your goals.

This guide provides guidance and recommendations to get started, creating user scenarios, and avoiding common pitfalls to load test a website.

## Factors that affect website performance

On a website, performance is a crucial part of the user experience. It is often measured by the response time to visualize or interact with some information. The two main actors affecting the user experience response time are:

 - Frontend
 - Backend

Frontend performance focuses on browser metrics like rendering time, interactive time, loading time, among others.

Backend performance, on the other hand, focuses mostly on the server response time and the amount of returned errors.

Which one is more important? There is no one true answer to this question. In general terms, the [performance golden rule](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/) states:

> 80-90% of the end-user response time is spent on the frontend.


But this is not necessarily accurate.

With an increasing amount of visits to your website, the frontend response time remains roughly the same. Still, when your system struggles with the increased concurrency, the **backend time might grow exponentially with the rise of concurrent users**.

The following chart illustrates this situation:

![Frontend time vs Backend time with increasing amount of website visitors](./Frontend-Backend-LoadTesting.png)


## When to load test a website?

In short, whenever you are concerned about the **availability and scalability of your website**.

If you have a very low number of users, backend performance won't likely be an issue. Spend your time optimizing the frontend.

But as the number of users grows, you should start spending more time improving and testing the performance of your backend. In the [performance golden rule](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/), Steve Souders pointed out that:

> If you’re worried about availability and scalability, focus on the backend.

### Browser metrics and load testing

When testing how your system behaves with some concurrent users, browser metrics are, in most cases, less useful. 

Because each browser runs independently, the number of concurrent users in a load test will not affect browser metrics like rendering time.


## Load testing a website

A load test focuses on testing the <b>performance of the requests to your backend</b>. The two most fundamental aspects to analyze are the <b>server response time</b> and the number of <b>returned errors</b>.

For example, a load test simulating hundreds of concurrent users could validate that:

- Your server doesn't respond with errors.
- The response time for 95% of your users should be below 400ms.
- The response time of your images must always be below 600ms.

Below, some common recommendations that you could consider when load testing a website:

### Decide what to test first

We recommend you to consider performance testing an iterative and continuous process.

You start small by testing, evaluating, and iterating frequently.

> Start small and simple, make sure you get something out of the testing first, then expand the test suite and add more complexity until you feel that you’ve reached the point where more effort spent on realism will not give enough return on your invested time.
>
>
> [Simple testing is better than no testing](https://k6.io/our-beliefs#simple-testing-is-better-than-no-testing)

The first thing is to decide what to load test. On the one hand, you could evaluate which are the performance aspects that are most valuable to your business and has the most significant risks. On the other hand, you could identify what your users do regularly. Use your analytics tools to find the most frequent user journeys.

With this information, it’s time to analyze the frequency of usage, business value, performance risks, and any other critical performance aspect of your organization to help you deciding what to load test first.

Next, you should decide what [types of load tests](/test-types/introduction) to run. Check out the following articles to learn more:

- [Smoke test](/test-types/smoke-testing)
- [Load test](/test-types/load-testing)
- [Stress  test](/test-types/stress-testing)
- [Spike  test](/test-types/stress-testing#spike-testing)
- [Soak test](/test-types/soak-testing)

### Calculate the number of concurrent users

You could define your load tests based on the observation of your normal and peak traffic levels, and use this formula to determine the number of VUs to specify in your load tests:

> VUs = (hourly sessions \* average session duration in seconds)/3600
>
> - hourly sessions = Number of sessions per hour
> - average session duration = Average time between the first and last request of each user

Refer to [Determining Concurrent Users in Your Load Tests](https://k6.io/blog/monthly-visits-concurrent-users) to learn how to calculate the formula using Google Analytics.


### Load test your website in pre-production.

We recommend to <a href="https://k6.io/our-beliefs#load-test-in-a-pre-production-environment">Load test in a pre-production environment</a> that mimics the production environment as closely as possible.

Testing regularly in a pre-production environment allows assessing the performance of your website over time and catch performance regressions before they reach production.

Load testing a website in pre-production allows breaking your systems without worrying about the interruption of your service.  Load testing in production is risky, but if your processes and team are mature, you could run your load tests in production as part of your [chaos experiments](https://principlesofchaos.org/). Sometimes it is the best way to get a picture of the real world.


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

### Parsing HTML content

When testing web sites it's common that you have to interact with HTML to submit forms, extract data, check for existence of elements or text etc.

For that reason k6 has the [parseHTML](/javascript-api/k6-html/parsehtml-src) and the [Selection](/javascript-api/k6-html/selection) API that contains more or less all of the [jQuery API](http://api.jquery.com/) that makes sense in the context of k6.

<div class="code-group" data-props='{"labels": ["Parsing HTML content"]}'>

```js
import {parseHTML} from "k6/html";
import http from "k6/http";

export default function() {
  const res = http.get("https://k6.io");
  const doc = parseHTML(res.body);  // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
};
```

</div>

For submitting a form, check out [Response.submitForm([params])](/javascript-api/k6-http/response/response-submitform-params).

### Tag different types of resources

By default, the standard metrics of a load testing tool -- for example, the response time metric will aggregate the values of all the website requests. But you might want to see the results of these metrics filtered by the type of resources:

- 95th percentile response time of all the images.
- 99th percentile response time of all the API requests.

Different types of resources could behave very differently and could make <b>meaningless the value of the aggregated metrics</b>.


If you might want to filter your metrics based on different types of requests, consider using the [tagging feature](/using-k6/tags-and-groups#tags).


<div class="code-group" data-props='{"labels": []}'>

```javascript
http.get("http://myweb.com/images/logo.png", { tags: { assets: "image" } });
```

</div>


### Group the different webpages

[Groups](/using-k6/tags-and-groups#groups) help you organize your load test around a common logic.
When a load test simulates a user scenario visiting multiple pages, it is a good practice to set up a group for each webpage to organize your load test and facilitate the visualization of your test results.

<div class="code-group" data-props='{"labels": []}'>

```javascript
group("visit homepage", function() {
  // load homepage resources
});
group("login page", function() {
  // load login page and perform login
});
```

</div>



## See also

- [Test types](/test-types/introduction)
- [k6 does not run in a browser](#what-k6-does-not)
- [Session recording guide](/using-k6/session-recording-har-support)
- [Determining concurrent users in your load tests](https://k6.io/blog/monthly-visits-concurrent-users)
- [Data correlation in your test script](/examples/correlation-and-dynamic-data)
- Interacting with HTML content: [parseHTML](/javascript-api/k6-html/parsehtml-src) and [Selection.find](/javascript-api/k6-html/selection/selection-find-selector)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "When to load test a website?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "<p>In short, whenever you are concerned about the <b>availability and scalability of your website</b>.</p>
<p>If you have a very low number of users, backend performance won't likely be an issue. Spend your time optimizing the frontend.</p>
<p>But as the number of users grows, you should start spending more time improving and testing the performance of your backend.</p>"
    }
  }]
}
</script>