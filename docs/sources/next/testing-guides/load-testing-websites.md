---
title: 'Load testing websites'
head_title: 'How to Load Test a Website: The k6 Guide'
description: 'Do you know how many users your site can handle? This guide answers the WHY and WHEN you should load test your website and gives you the best practices for load testing websites or web apps with k6. Let’s get started.'
weight: 03
noindex: true
---

# Load testing websites

This doc explains some key concepts about load testing websites, including:

- The difference between backend and frontend performance testing
- When to choose between protocol-based, browser-based, or hybrid scripts
- Recommended practices about how to load test websites

All load tests try to simulate real user traffic to prevent failures, improve reliability, and release new code with confidence.
But your approach to load testing must adapt to the type of application you want to test.

In this guide, learn about strategies to test websites, including specific recommendations for complex scenario scripting and test execution.

## Load testing approaches

When you approach the load test, first consider the following perspectives:

- Backend vs. frontend performance
- Protocol-based, browser-based, or hybrid load testing
- Component testing vs. end-to-end testing

## Backend vs. frontend performance

Performance has a significant influence on the user experience of a website.

For example, when users want to visualize or interact with some information, they expect the website to react quickly.

To measure performance, testers often look at response times, which are affected by two main factors:

- Frontend performance
- Backend performance

### Frontend performance

Frontend performance testing verifies application performance on the interface level, measuring round-trip metrics that consider how and when page elements appear on the screen. It's concerned with the end-user experience of an application, usually involving a browser.

![Snapshots over time of webpage elements rendering on a browser](/media/docs/k6-oss/frontend-rendering.png 'Snapshots over time of webpage elements rendering on a browser')

Frontend performance testing excels at identifying issues on a micro level but does not expose issues in the underlying architecture of a system.

Because it primarily measures a single user's experience of the system, frontend performance testing tends to be easier to run on a small scale.
Frontend performance testing has metrics that are distinct from backend performance testing. Frontend performance tests for things like:

- Whether the pages of the application are optimized to render quickly on a user's screen
- How long it takes a user to interact with the UI elements of the application.

Some concerns when doing this type of performance testing are its dependency on fully integrated environments and the cost of scaling. You can test frontend performance only once the application code and infrastructure have been integrated with a user interface. Tools to automate frontend testing are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.

### Backend performance

Backend performance testing targets the underlying application servers to see how they behave under production-like conditions. When it comes to websites, while frontend performance involves how assets included in the page are rendered, backend performance focuses on how those assets are processed by the application servers, served to users, and downloaded by browsers.

![Backend components](/media/docs/k6-oss/backend-performance.png 'Backend components of an application')

Backend testing is broader in scope than frontend performance testing. API testing can be used to target specific components or integrated components, meaning that application teams have more flexibility and higher chances of finding performance issues earlier. Backend testing is less resource-intensive than frontend performance testing and is thus more suitable for generating high load.

### Which one should you test?

It depends! Ideally, both.

Frontend testing tools are executed on the client side and are limited in scope: they do not provide enough information about backend components for fine-tuning beyond the user interface.

This limitation can lead to false confidence in overall application performance when the amount of traffic against an application increases. While the frontend component of response time remains more or less constant, the backend component of response time increases exponentially with the number of concurrent users:

![Backend performance often contributes significantly to overall user experience](/media/docs/k6-oss/frontend-backend-load-testing.png 'Backend performance often contributes significantly to overall user experience')

Testing _only_ frontend performance ignores a large part of the application, one more susceptible to increased failures and performance bottlenecks at higher levels of load.

Testing _only_ backend performance, on the other hand, ignores "the first mile" of user experience and breadth. Backend testing involves messaging at the protocol level rather than interacting with page elements the way a real user would. It verifies the foundation of an application rather than the highest layer of it that a user ultimately sees.

Testing both frontend and backend performance leads to the best overall performance and user experience for your application. Ignoring one or the other exposes you to performance bottlenecks that significantly decrease a user's satisfaction with your application.

However, if your testing is smaller in scope, you can choose to focus on either frontend or backend with the goal of eventually building a test suite that encompasses both.

## Component testing vs. end-to-end testing

When you're testing a web app, you may wonder whether how you structure your test scripts. Consider the following two methods.

### Component testing

One way you could load test a web app is to load test its components. Maybe you know there are issues with a specific functionality due to previous production issues, or maybe you'd like to target components that are business-critical to reduce risk exposure.

In these cases, the type of test you write may:

- be protocol-based
- call only those API endpoints that are relevant
- have smaller or no sleep/think time
- be focused on eventually stress testing a component or service or finding its breaking point

Testing in this way is more flexible. With protocol testing, you can specify the endpoints or servers you'd like to hit, and narrow your test's target that way. You can test specific functionalities while skipping others that come chronologically before it in a standard user flow. You can more finely control the type of traffic that is generated. If you're recreating a specific mix of requests, you can script those requests and reproduce them in a repeatable manner.

Doing component testing for load may not always require that your script behave like an end user. In fact, it may be necessary to artificially inflate traffic to more quickly reproduce issues, or to deflate traffic to reduce the noise in the logs. By the nature of this type of testing, scripts don't contain the full flow of a request that you would expect to see in production, so realism is not a priority.

### End-to-end testing

You could also do end-to-end testing against a web app. End-to-end testing seeks to replicate real user behaviour and track its effects across the entire stack. When doing end-to-end testing, you might:

- do protocol-level, browser-level, or hybrid load testing
- replicate the actions in a typical user flow
- think about the performance of the entire workflow as well as how long a request took to be processed by each component
- write scripts that access the application the same way users would, such as by browsing to the homepage before finding their way to other parts of the website

This type of load testing is broader in scope than component testing, but shallower in terms of depth. With end-to-end testing, you get a better idea of the full user experience of the application as a whole. However, it can also be more complex to troubleshoot, as you have more components to monitor and more places to look for issues that are found.

End-to-end testing is based on real user behavior, so it's often important that end-to-end test scripts also be realistic.

## Protocol-based, browser-based, or hybrid load testing

The decision of whether to test the frontend, backend, or both will also affect the type of load testing you should carry out and the kind of scripts you should write.

### Protocol-based load testing

Protocol-based load testing verifies the backend performance of an application by simulating the requests underlying user actions. For websites, this commonly involves HTTP requests that bypass the user interface of your application and are sent directly to a server or application component.

For example, a protocol-based load testing script might request all the resources on a webpage from the application servers, but those resources are merely downloaded. The response times reported by a purely protocol-based script do not include frontend metrics such as the time taken for images to render on a browser. The load is generated by simulating many requests sent to application servers.

While protocol-based load testing may seem to lend itself better to component testing, you can also do end-to-end website testing with protocol-level scripts.

#### Sample protocol-based test script

The following is an example of a protocol-based load testing script in k6 that fetches the homepage, along with resources embedded into the page.

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export function Homepage() {
  const params = {
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en;q=0.9',
  };

  // 01. Go to the homepage
  let responses = http.batch([
    ['GET', 'https://mywebsite.com/', params],
    ['GET', 'https://mywebsite.com/style.min.css', params],
    ['GET', 'https://website.com/header.png', params],
    ['GET', 'https://website.com/polyfill.min.js', params],
  ]);
  check(responses, {
    'Homepage loaded': (r) => JSON.stringify(r).includes('Welcome to my site'),
  });

  sleep(4);

  // 02. View products
  responses = http.batch([
    ['GET', 'https://mywebsite.com/products', params],
    ['GET', 'https://mywebsite.com/style.css', params],
    ['GET', 'https://website.com/product1.jpg', params],
    ['GET', 'https://website.com/product2.jpg', params],
    ['GET', 'https://website.com/displaylist.js', params],
  ]);
  check(responses, {
    'Products loaded': (r) => JSON.stringify(r).includes('Add to Cart'),
  });

  sleep(1);
}
```

[Recording browser traffic](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-browser-recorder) helps you prototype to test websites on the protocol level.

### Browser-based load testing

Browser-based load testing verifies the frontend performance of an application by simulating real users using a browser to access your website.

For example, a browser-based load testing script might include instructions to navigate to a page, click on a button, and type out text on a form. Those user actions then trigger underlying requests on the protocol layer, but only user actions are scripted in browser-based testing.

Unlike protocol-based load testing, browser-based load testing scripts generate load by starting multiple instances of browsers and interacting with your application the way real users would. Testing at the browser level can also be the only option for testing Single-Page Applications where a lot of the application logic is executed by client-side scripts.

Scripting on the browser level usually requires the use of different tools from the ones used to test at the protocol level.
However, k6 now has an experimental module called [k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/) that allows the creation of browser-based test scripts alongside protocol-based ones.

#### Sample browser-based test script

The following is an example of a browser-based load testing script in k6 using the browser module on a dummy website. Instead of making an HTTP request, the script views the homepage, then looks for and clicks on a link to the product page.

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/experimental/browser';
import { sleep } from 'k6';

export default async function () {
  const page = browser.newPage();

  // 01. Go to the homepage
  try {
    await page.goto('https://mywebsite.com');

    page.waitForSelector('p[class="woocommerce-result-count"]"]');
    page.screenshot({ path: 'screenshots/01_homepage.png' });

    sleep(4);

    // 02. View products
    const element = page.locator(
      'a[class="woocommerce-LoopProduct-link woocommerce-loop-product__link"]'
    );
    await element.click();
    page.waitForSelector('button[name="add-to-cart"]');
    page.screenshot({ path: 'screenshots/02_view-product.png' });

    sleep(1);
  } finally {
    page.close();
  }
}
```

{{< /code >}}

#### Tips for writing browser-level scripts

The following steps can help you get started with a browser-level test script.

**Script user actions, not requests.** Determine what a user might do for a particular task, and script interactions with elements on the browser level. For example, script what buttons the user clicks on.

**Identify unique selectors.** Once you have identified which page elements a user interacts with, use the Element Inspector for DevTools in your browser to find a unique, static, and simple way to identify each element. The script needs selectors to find the right element to interact with.

**Use elements to verify responses.** After every action, use [locators](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator) to search for elements on the page that you would expect to find. This verification helps ensure that the script has reached the expected page.

**Take screenshots for every action while debugging.** One of the advantages of browser-based testing is the ability to take screenshots. After every user interaction the script simulates, use [page.screenshot](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page) to save a visual image of what the script encountered for later troubleshooting.

### Hybrid load testing

Hybrid load testing is a combination of protocol-based and browser-based load testing. While you can use two tools or two scripts to execute different types of load tests (one protocol-based and one browser-based), having both types of tests executed by the same script and the same tool is ideal. Aggregating results between different tools can be difficult at best and inconsistent at worst.

![Hybrid of frontend and backend performance testing](/media/docs/k6-oss/hybrid-testing.png 'In hybrid load testing, both the frontend and backend are tested')

A best practice in hybrid load testing is to generate most of the load using the protocol-level test, and then to run a smaller number of the browser-level testing scripts. This approach:

- reduces the number of load generators needed, since protocol-level testing requires fewer machines to generate the same load
- measures backend and frontend performance in the same test execution
- provides a single source of aggregated output at the end
- reduces complexity in the creation and maintenance of scripts

## Scripting considerations

When you script a test for a website, consider these recommendations.

### Consider factors that affect script realism

**Record your user journey.** Using the browser recorder can facilitate initial test script creation by capturing all the embedded resources on webpages. Check out the [Session Recording guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/) to learn more about how to auto-generate your load test from a user session.

**Correlate data.** Recordings often don't take into account dynamic values that are generated anew each time a request is made. Go through the recorded requests and determine whether you need to [extract values from previous responses](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data) and use parameters in subsequent requests. This practice ensures your VUs behave more like real users would.

**Include or exclude static resources.** Determine whether you should include or exclude static resources on pages such as images, JavaScript, etc. Consider including them if you want to measure overall user experience. Consider excluding them if you are using a Content Delivery Network (CDN) that is under a separate Service Level Agreement (SLA).

**Exclude third-party requests.** Don't load test servers that you don't own. Many applications make calls to third-party providers for authentication, social sharing, and marketing analytics. Disable these requests unless you have permission to include them in your tests.

**Use concurrent requests.** To mimic the way modern browsers download some requests in parallel, use [batching](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/batch).

**Determine cache and cookie behaviour.** k6 automatically resets cookies between iterations, but you can also [change this behavior](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference/#no-cookies-reset) if maintaining cookies would be more realistic.

**Use dynamic think time and pacing.** Consider adding varying [delays](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep) so you don't artificially stagger a script with completely uniform delays.

**Use test data.** Real users typically don't search for or submit the same data repeatedly. Consider adding a [test data file](https://grafana.com/docs/k6/<K6_VERSION>/examples/data-parameterization) for the script to iterate through.

**Model test parameters and load profile after production.** In k6, you can use [test options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) to determine the exact shape and profile of your load test script. Select the appropriate [executors](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors) for the job.

### Create a reusable framework

**Use tags and groups.** Organizing requests by [tagging and grouping them](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) helps you consolidate like metrics and makes your test scripts more understandable by others.

**Use scenarios.** When combining protocol-based and browser-based tests, use [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios) to independently control their test parameters and [executors](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors).

**Modularize scripts.** Use [modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules) to separate and organize functions for protocol-level testing and browser-level testing, and then use a test runner script to execute them. This approach means different scripts can be versioned and changed without affecting each other.

**Integrate your tests into your CI pipeline.** Adopting a "tests as code" approach enables you to tie your load tests more closely into your project's existing CI/CD processes, helping you get the most value out of every test.

### Test with thresholds in mind

**Create thresholds for both types of testing.** Some browser-level and protocol-level metrics cannot be combined because they don't measure the same thing. Set [thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) for relevant metrics from both the browser-level script and the protocol-level one.

### When possible, use hybrid load testing

**Use protocol-based scripts to generate majority of the load.** When writing the test scenario, use the protocol-based requests to simulate most of the traffic and use fewer VUs for the browser-based requests. Relying on the protocol-level traffic helps keep resource utilization on load generators down.

## Execution considerations

When you run tests, consider the test environment and the load generator location.

### Run your tests in the appropriate environment

Testing in pre-production environments and in production environments both add value.

**Testing in pre-production environments** (staging, test, system integration testing, user acceptance testing, and production replica environments) enables you to identify performance defects early, which can save a lot of time and effort (and reputation) later on. Running in test environments also means you can often afford to be more aggressive with your tests. However, it's also more critical to get your load profiles right, and the test results you get may not necessarily apply to production.

**Testing in production** yields the most accurate results, but it's also more risky. Often, testing production is the only feasible alternative. You can reduce the risk of impact to real customers while testing in production by using lower levels of load when running load tests during peak hours, schedule tests for off-peak hours, choosing load test types that are less risky, using techniques like [synthetic monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/) that generate less traffic, using real user monitoring tools to get snapshots of user performance at load, and ensuring that your observability stack is working at peak efficiency.

### Run tests where your customers are

The location of the load generator(s), where the traffic is coming _from_, can also have an impact on your test results. The question is: where are your end users located?

**On-premises load testing** can be ideal when testing early on in the development a website, or when there are machines that can be repurposed as load generators. However, testing entirely from within a corporate network may also yield false positives, in that response times reported are significantly lower than if the same application servers were accessed from across the country.

**Load testing on the cloud** is an essential part of the testing strategy for many public-facing websites. Using load generators on the cloud gives you access to test in different states and geographical countries, creating a mix of load generators proportional to your users' locations. Cloud load generators are easier to provision and cheaper to maintain in the long run than on-premise ones. Load testing on the cloud can help you include the effects of network latency in your tests and yield results that are more realistic.

## Recommendations

Here are some recommendations to help you plan, script, and execute your load tests for websites.

If you want to test the last-mile user experience of your website:

- focus on **frontend performance**,
- write **browser-based test scripts**,
- and consider doing more realistic **end-to-end** tests of the user flow.

If you want to test the underlying infrastructure of your website:

- focus on **backend performance**,
- write **protocol-based test scripts**,
- and consider starting with **component testing** and then gradually increasing the scope.

If your website is meant for internal or has limited access:

- Use **on-premise load generators** located within the network that most of your users access the website from.

If your website is external and public-facing:

- Use **cloud load generators** in the load zones where your users reside.

Test in **pre-production environments** when you can, but also consider **testing in production** in a limited capacity.

Load testing websites can be complex due to the number of viable testing approaches available, the scope for performance testing, and the potential effects of releasing undertested code. By following the recommendations we've put forward here, you can tailor your testing more closely to your objectives.

## Read more

- [Browser testing with k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/)
- [Load test types](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/)
- [Session recording guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/)
- [Determining concurrent users in your load tests](https://k6.io/blog/monthly-visits-concurrent-users)
- [Data correlation in your test script](https://grafana.com/docs/k6/<K6_VERSION>/examples/correlation-and-dynamic-data)
