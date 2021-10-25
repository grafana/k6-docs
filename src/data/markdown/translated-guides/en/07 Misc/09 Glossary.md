---
title: Glossary
excerpt: 'Find a list of terms commonly used within the k6 project and what we mean when we use them.'
---

When discussing complex topics, it is usually a good idea to define a clear, shared terminology to ensure that we leave as little room as possible for misunderstandings. Below, you'll find a list of terms commonly used within the k6 project and what we mean when we use them.

<Glossary>

- [Correlation](#correlation)
- [Dynamic Data](#dynamic-data)
- [Endurance Testing](#endurance-testing)
- [Goja](#goja)
- [Horizontal Scalability](#horizontal-scalability)
- [HTTP Archive](#http-archive)
- [k6 Cloud](#k6-cloud)
- [Load Test](#load-test)
- [Metric](#metric)
- [Parameterization](#parameterization)
- [Performance Threshold](#performance-threshold)
- [Reliability](#reliability)
- [Requests per Second](#requests-per-second)
- [Saturation](#saturation)
- [Scalability](#scalability)
- [Service-level Agreement](#service-level-agreement)
- [Service-level Indicator](#service-level-indicator)
- [Service-level Objective](#service-level-objective)
- [Smoke test](#smoke-test)
- [Soak test](#soak-test)
- [Stability](#stability)
- [Stress test](#stress-test)
- [System under test](#system-under-test)
- [Test configuration](#test-configuration)
- [Test Run](#test-run)
- [Test Script](#test-script)
- [User Journey](#user-journey)
- [User Scenario](#user-scenario)
- [Vertical Scalability](#vertical-scalability)
- [Virtual Users](#virtual-users)

</Glossary>

### Correlation

**Correlation** is a term used for describing the process of capturing dynamic data, received from the system under test, for reuse in subsequent requests. A common use case for correlation is retrieving and reusing a session id, or token, throughout the whole lifetime of a [virtual user](#virtual-user).

### Dynamic Data

**Dynamic data** is data that might, or will, change between test runs. Common examples are order ids, session tokens or timestamps.

### Endurance Testing

**Endurance testing** is a synonym for [soak testing](#soak-test).

### Goja

**Goja** is a JavaScript runtime, purely written in go, that emphasizes standard compliance and performance. We use goja to allow for test scripting without having to compromise speed, efficiency or reliability, which would have been the case using NodeJS. For more details, see the [Goja repository on GitHub](https://github.com/dop251/goja).

### Horizontal Scalability

**Horizontal Scalability** is a trait describing to what degree a system under test’s performance and capacity may be increased by adding more nodes (servers or computers for instance).

### HTTP Archive

An **HTTP Archive**, or **HAR file**, is a file containing logs of a browser interactions with the system under test. All of the included transactions are stored as JSON-formatted text. These archives may then be used to generate test scripts using, for instance, the [har-to-k6 Converter](https://github.com/k6io/har-to-k6). For more details, see the [HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/).

### Iteration

An iteration is an execution of the `default function`, or scenario `exec` function.

You can either calculate iterations across all [virtual users](#virtual-users) (as done by the [Shared iterations](/using-k6/scenarios/executors/shared-iterations) executor), or per virtual user (as the [Per-VU Iterations](/using-k6/scenarios/executors/per-vu-iterations)).

### k6 Cloud

**k6 Cloud** is the common name for the entire cloud product, which is composed of both k6 Cloud Execution and k6 Cloud Test Results.

### Load Test

A **load test** is a type of test used to assess the performance of the system under test in terms of concurrent users or requests per second. See [Load Testing](/test-types/load-testing).

### Metric

A **metric** is a calculation that, using measurements, serves as an indicator of how the system under test performs under a given condition.

### Parameterization

**Parameterization** refers to the process of building a test in such a way that the values used throughout the test might be changed without having to change the actual test script.

### Performance Threshold

A **performance threshold** describes the limits of what is considered acceptable values for a metric produced by a performance test. In many ways, this is similar to an [SLO](#service-level-objective), although a performance threshold only concerns itself with a single metric.

### Reliability

**Reliability** is a trait used to describe a system under test’s ability to produce reliable results consecutively, even under pressure.

### Requests per Second

**Requests per Second**, or **RPS**, is the rate at which requests are executed against the system under test.

### Saturation

**Saturation** is reached when the system under test is fully utilized and hence, unable to handle any additional requests.

### Scalability

**Scalability** is a trait used to describe to what degree a system under test’s performance or capacity may be increased by adding additional resources. See [Vertical scalability](#vertical-scalability) and [Horizontal scalability](#horizontal-scalability).

### Service-level Agreement

A **service-level agreement**, or **SLA** is an agreement made between the one providing the service and someone, often a user of the service, promising that the availability of the service will meet a certain level during a certain period.

If the service provider fails to deliver on that promise, some kind of penalty is usually applied, like a partial or full refund, or monetary compensation.

### Service-level Indicator

A **service-level indicator**, or **SLI** is the metric we use to measure whether a service meets the [service-level objective (SLO)](#service-level-objective). While doing performance monitoring this could, for instance, be the number of successful requests against the service during a specified period.

### Service-level Objective

A **service-level objective**, or **SLO** is an actual target, either internal or part of the [service-level agreement (SLA)](#service-level-agreement), for the availability of the service. This is often expressed as a percentage (99,2%, for instance). If the service meets or exceeds this target, it's deemed stable.

### Smoke test

A **smoke test** is a type of test used to verify that the system under test can handle a minimal amount of load without any issues. It’s commonly used as a first step, to ensure that everything works as intended under optimal conditions, before advancing to any of the other performance test types. See [Smoke Testing](/test-types/smoke-testing).

### Soak test

A **soak test** is a type of test used to uncover performance and reliability issues stemming from a system being under pressure for an extended period. See [Soak Testing](/test-types/soak-testing).

### Stability

**Stability** is a trait used to describe a system under test’s ability to withstand failures and erroneous behavior under normal usage.

### Stress test

A **stress test** is a type of test used to identify the limits of what the system under test is capable of handling in terms of load. See [Stress Testing](/test-types/stress-testing).

### System under test

**System under test** refers to the actual piece of software that we're currently testing. This could be an API, a website, infrastructure, or any combination of these.

### Test Configuration

The options object of a test script or configuration parameters passed via the CLI. See [Options](/using-k6/options).

### Test Run

An individual execution of a test script. See [Running k6](/getting-started/running-k6).

### Test Script

A **test script** is the actual code you run as part of your test run, as well as any (or at least most) of the configuration needed to run the code. It defines how the test will behave as well as what requests will be made. See the [Single Request example](https://k6.io/docs/examples/single-request).

### User Journey

**User journey** is used to describe a sequence of actions taken by either a real or simulated user.

### User Scenario

**User Scenario** is a synonym for [user journey](#user-journey).

### Vertical Scalability

**Vertical scalability** is a trait describing to what degree a system under test’s performance or capacity may be increased by adding more hardware resources to a node (RAM, cores, bandwidth, etc.).

### Virtual Users

**Virtual Users**, or **VUs** are used to perform separate and concurrent executions of your test script. They can make HTTP(s) and WebSocket requests against a webpage or API.

Virtual Users, although emulated by k6 itself, can be used to mimic the behavior of a real user.

**Virtual Users in context of Web Apps/Websites**

Virtual Users are designed to act and behave like real users/browsers would. That is, they are capable of making multiple network connections in parallel, just like a real user in a browser would. When using a [http.batch](/using-k6/options#batch) request, HTTP requests are sent in parallel. For further information, refer to the article about [load testing websites](/testing-guides/load-testing-websites).

<CodeGroup labels={["Formula for calculating the number of VUs needed"]}>

```plain
VUs = (hourly sessions * average session duration in seconds)/3600
```

</CodeGroup>

Read more about using this formula in the [tutorial to calculate the number of Virtual Users with Google Analytics](https://k6.io/blog/monthly-visits-concurrent-users).

**Virtual Users in context of APIs**

When testing individual API endpoints, you can take advantage of each VU making multiple requests each to produce requests per second(rps) a factor higher than your VU count. e.g. Your test may be stable with each VU making 10 rps each. If you wanted to reach 1000 RPS, you may only need 100 VUs in that case. For more information on testing APIs, please refer to our article [API Load Testing](/testing-guides/api-load-testing).
