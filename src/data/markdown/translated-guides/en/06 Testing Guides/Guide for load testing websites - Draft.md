---
title: 'Load testing websites'
head_title: 'How to Load Test a Website: The k6 Guide'
excerpt: 'Do you know how many users your site can handle? This guide answers the WHY and WHEN you should load test your website and gives you the best practices for load testing websites or web apps with k6. Let’s get started.'
---

Bad user experience impacts business. This is the reason you might want to know how many concurrent users your website can handle appropriately.

Load testing helps you simulate those users to asses your system performance and know if your website or web app meets your goals.

This guide provides guidance and recommendations to get started, creating user scenarios, and avoiding common pitfalls to load test a website.

## Performance vs. load testing: what's the difference?

A common mistake in the industry is to use the terms *performance testing* and *load testing* interchangeably. It's more accurate to say that load testing is a sub-practice of performance testing.

Performance testing verifies how well a system works as a whole, including aspects such as scalability, elasticity, availability, reliability, resiliency, and latency. Load testing is one type of performance testing, and it is an approach that can be used to test many of aspects of application performance. However, not all performance testing involves load testing.

Load testing specifically focuses on verifying and validating the performance of an application while it has a significant volume of tasks to process. Load testing can be done manually, but most teams write automated load testing scripts to programmatically simulate real users accessing the application. You can also think of load testing as one method of testing application performance.

## What to test

On a website, performance is a crucial part of the user experience. It is often measured by the response time to visualize or interact with some information. The two main actors affecting the user experience response time are:

- Frontend performance
- Backend performance

### Frontend performance

Frontend performance testing verifies application performance on the interface level, measuring round-trip metrics that consider how and when page elements appear on the screen. It is concerned with the end-user experience of an application, usually involving a browser.

Frontend performance testing excels at identifying issues on a micro level but does not expose issues in the underlying architecture of a system.

Because it primarily measures a single user's experience of the system, frontend performance testing tends to be easier to carry out on a small scale.
Frontend performance testing has metrics that are distinct from backend performance testing. Frontend performance tests for things like:
- Whether the pages of the application are optimized to render quickly on a user's screen
- How long it takes a user to interact with the UI elements of the application.

Some concerns when doing this type of performance testing are its dependency on fully integrated environments and the cost of scaling. You can test frontend performance only once the application code and infrastructure have been integrated with a user interface. Tools to automate frontend testing are also inherently more resource-intensive, so they can be costly to run at scale and are not suitable for high load tests.

#### Why isn't frontend performance testing enough?

Since frontend performance testing already measures end-user experience, why do we even need backend performance testing?

Frontend testing tools are executed on the client side and are limited in scope. They do not provide enough information about backend components for fine-tuning beyond the user interface.

This limitation can lead to false confidence in overall application performance when the amount of traffic against an application increases. While the frontend component of response time remains more or less constant, the backend component of response time increases exponentially with the number of concurrent users:

![A chart aggregating front and backend response times. As concurrency increases, backend response time becomes much longer.](./images/Frontend-Backend-LoadTesting.png)

Testing only frontend performance ignores a large part of the application, one more susceptible to increased failures and performance bottlenecks at higher levels of load.

### Backend performance

Backend performance testing targets the underlying application servers to verify the scalability, elasticity, availability, reliability, and responsiveness of a system as a whole.

- *Scalability*: Can the system adjust to steadily increasing levels of demand?
- *Elasticity*: Can the system conserve resources during periods of lower demand?
- *Availability*: What is the uptime of each of the components in the system?
- *Reliability*: Does the system respond consistently in different environmental conditions?
- *Resiliency*: Can the system gracefully withstand unexpected events?
- *Latency*: How quickly does the system process and respond to requests?

Backend testing is broader in scope than frontend performance testing. API testing can be used to target specific components or integrated components, meaning that application teams have more flexibility and higher chances of finding performance issues earlier. Backend testing is less resource-intensive than frontend performance testing and is thus more suitable for generating high load.

#### Why isn't backend performance testing enough?

Some concerns when doing this type of testing are its inability to test "the first mile" of user experience and breadth. Backend testing involves messaging at the protocol level rather than interacting with page elements. It verifies the foundation of an application rather than the highest layer of it that a user ultimately sees. Depending on the complexity of the application architecture, backend testing may also be more susceptible to scope creep.

### Which one should you test?

It depends! Ideally, both.

Testing both frontend and backend performance leads to the best overall performance and user experience for your application. Ignoring one or the other exposes you to performance bottlenecks that significantly decrease a user's satisfaction with your application.

However, if your testing is smaller in scope, you can choose to focus on either frontend or backend with the goal of eventually building a test suite that encompasses both.

## Load testing approaches

Where does that leave you with regards to load testing? The decision of whether to test the frontend, backend, or both will also affect the type of load testing you should carry out.

### Protocol-based load testing

Protocol-based load testing verifies the backend performance of an application by simulating the requests underlying user actions. For websites, this commonly involves HTTP requests that bypass the user interface of your application and are sent directly to a server or application component.

For example, a protocol-based load testing script might request all the resources on a webpage from the application servers, but those resources are merely downloaded. The response times reported by a purely protocol-based script do not include frontend metrics such as the time taken for images to render on a browser. The load is generated by simulating many requests sent to application servers.

### Browser-based load testing

Browser-based load testing verifies the frontend performance of an application by simulating real users using a browser to access your website.

For example, a browser-based load testing script might include instructions to navigate to a page, click on a button, and type out text on a form. Those user actions then trigger underlying requests on the protocol layer, but only user actions are scripted in browser-based testing.

Unlike protocol-based load testing, browser-based load testing scripts generate load by starting multiple instances of browsers and interacting with your application the way real users would.

### Hybrid load testing

Hybrid load testing is a combination of protocol-based and browser-based load testing. While you can use two tools or two scripts to execute different types of load tests (one protocol-based and one browser-based), having both types of tests executed by the same script and the same tool is ideal. Aggregating results between different tools can be difficult at best and inconsistent at worst.

A best practice in hybrid load testing is to generate most of the load using the protocol-level test, and then to run a smaller number of the browser-level testing scripts. This approach:
- reduces the number of load generators needed, since protocol-level testing requires fewer machines to generate the same load
- measures backend and frontend performance in the same test execution
- provides a single source of aggregated output at the end
- reduces complexity in the creation and maintenance of scripts

## Scripting against a web app


### Should it be realistic?

## Load test execution for websites

### Types of load tests

[00 Introduction](../05%20Test%20Types/00%20Introduction.md)

### Environments

#### The case for testing in pre-production

#### The case for testing in production

### Load generation

#### Cloud

#### On-premises


## Observability