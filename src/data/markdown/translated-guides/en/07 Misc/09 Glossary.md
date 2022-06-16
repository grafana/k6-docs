---
title: Glossary
excerpt: 'A list of technical terms commonly used when discussing k6, with definitions.'
---

What we talk about when we talk about k6.

In discussion about k6, some terms have a precise, technical meaning.
If a certain term in these docs confuses you, consult this list for a definition.

<Glossary>

- [Application performance monitoring](#application-performance-monitoring)
- [Concurrency](#concurrency)
- [Correlation](#correlation)
- [Checks](#checks)
- [Duration](#duration)
- [Dynamic data](#dynamic-data)
- [Endurance testing](#endurance-testing)
- [Executor](#executor)
- [Goja](#goja)
- [Graceful stop](#graceful-stop)
- [Horizontal scalability](#horizontal-scalability)
- [HTTP archive (HAR file)](#http-archive-(har-file))
- [Iteration](#iteration)
- [k6 Cloud](#k6-cloud)
- [k6 options](#k6-options)
- [Load test](#load-test)
- [Load zone](#load-zone)
- [Metric](#metric)
- [Metric sample](#metric-sample)
- [Parameterization](#parameterization)
- [Reliability](#reliability)
- [Requests per second](#requests-per-second)
- [Saturation](#saturation)
- [Scalability](#scalability)
- [Scenario](#scenario)
- [Service-level agreement](#service-level-agreement)
- [Service-level indicator](#service-level-indicator)
- [Service-level objective](#service-level-objective)
- [Smoke test](#smoke-test)
- [Soak test](#soak-test)
- [Stability](#stability)
- [Stress test](#stress-test)
- [System under test](#system-under-test)
- [Test run](#test-run)
- [Test script](#test-script)
- [Threshold](#threshold)
- [Throughput](#throughput)
- [Vertical scalability](#vertical-scalability)
- [Virtual users](#virtual-users)

</Glossary>

### Application performance monitoring

*(Or APM)*. The practice of monitoring the performance, availability, and reliability of a system. When running load tests, Grafana is an example of a compatible APM, as users can use Grafana to monitor the load test from side of the system under test.

Read more: [k6 cloud has built-in support to export to a few APM services](https://k6.io/docs/cloud/integrations/cloud-apm/).

### Concurrency

When multiple computations happen at the same time.
In the context of k6, virtual users can make concurrent requests as a test runs. In k6 cloud, you can also run multiple tests concurrently.

### Correlation

The process of taking [dynamic data](#dynamic-data) received from the system under test then reusing the data in a subsequent request. Testers commonly use correlation to retrieve and reuse session IDs or tokens for a [virtual user](#virtual-user)'s iteration lifetime.

Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/), [Correlation in testing APIs](https://k6.io/docs/testing-guides/api-load-testing/#correlation-and-data-parameterization)

### Checks

Conditions that validate the correctness of a service.
In k6 scripts, checks are a function that validates a response to a test request.

Read more: [Checks reference](/using-k6/checks)

### Duration

The length of time that a test runs. When duration is set as an option, VU code runs for as many iterations as possible in the length of time specified (with possible finishing time given as a [graceful stop](#graceful-stop).

Read more: [Duration option reference](https://k6.io/docs/using-k6/k6-options/reference/#duration)

### Dynamic data

Data that might, or will, change between test runs. Common examples are order IDs, session tokens, or timestamps.

Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/)

### Endurance testing

A synonym for [soak testing](#soak-test).

### Executor

An property of a [scenario](#scenario) that configures VU behavior. You can use executors to configure whether to designate iterations as shared between VUs or to run per VU, or to configure or whether the VU concurrency is constant or changing

### Goja

A JavaScript runtime, written in pure Go, that emphasizes standard compliance and performance. k6 uses Goja to enable test scripting without compromising speed, efficiency or reliability, compromises that would have been necessary with NodeJS

Read more: [Goja repository on GitHub](https://github.com/dop251/goja).

### Graceful stop

A period that lets VUs finish an iteration at the end of a load test. Graceful stops prevent abrupt halts in execution, and graceful ramp downs prevent unrealistic drops to zero VUs.

Read more: The [Graceful stop reference](https://k6.io/docs/using-k6/scenarios/graceful-stop/)

### Horizontal scalability

The degree to which one can improve the performance of a system by adding more nodes (servers or computers for instance).

### HTTP archive (HAR file)

A file containing logs of a browser interactions with the system under test. All included transactions are stored as JSON-formatted text. You can use these archives to generate test scripts using (for example, with the har-to-k6 Converter).

Read more: [HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/), [HAR converter](https://k6.io/docs/test-authoring/recording-a-session/har-converter/)

### Iteration

A single run in the execution of the `default function`, or scenario `exec` function.
You can either calculate iterations across all [virtual users](#virtual-users) (as done by the [Shared iterations](/using-k6/scenarios/executors/shared-iterations) executor), or per virtual user (as the [Per-VU Iterations](/using-k6/scenarios/executors/per-vu-iterations)).

Read more: The [test life cycle](https://k6.io/docs/using-k6/test-life-cycle/) document breaks down each stage of a k6 script, including iterations in VU code.

### k6 Cloud

The proper name for the entire cloud product, comprising both k6 Cloud Execution and k6 Cloud Test Results.

Read more: [k6 Cloud docs](https://k6.io/docs/cloud)

### k6 options

Values that configure a k6 test run. You can set options with command-line flags, environment variables, and in the script.

Read more: [k6 Options](/using-ky/k6-options)

### Load test

A test that assesses the performance of the system under test in terms of concurrent users or requests per second.

Read more: [Load Testing](/test-types/load-testing)

### Load zone

The geographical instance from which a test runs.

Read more: [Private load zones](/cloud/cloud-faq/private-load-zones/)

### Metric

Anything measurable that a test emits. Users use metrics to assess the performance of the system under test in terms of concurrent users or requests per second.

Read more: [Metrics](/using-k6/metrics)

### Metric sample

A metric's value (and, in time-series data, its timestamp)

### Parameterization

The process of turning test values into reusable parameters, e.g. through variables and shared arrays.

Read more: [Data parameterization examples](https://k6.io/docs/examples/data-parameterization/)

### Reliability

The degree to which a system can produce correct results consecutively, even when under pressure.

### Requests per second

The rate at which a test sends requests to the system under test.

### Saturation

A condition when a system's reaches full resource utilization and can handle no additional request.

### Scalability

The degree to which system under test’s performance or capacity may be increased by adding additional resources. See [Vertical scalability](#vertical-scalability) and [Horizontal scalability](#horizontal-scalability).

### Scenario

A special option that models plausible events that an application could experience. To model high traffic, a scenario might have virtual users making concurrent requests over multiple script iterations. Configure scenario behavior with [executors](#executors)

Read more: [Scenarios reference](/using-k6/scenarios)

### Service-level agreement

*(Or SLA)*. An agreement between a service provider and another party, often a user of the service, promising that the availability of the service will meet a certain level during a certain period.

### Service-level indicator

*(Or SLI)*. A metric that measures whether a service meets its [service-level objective](#service-level-objective). In performance monitoring, and SLI could be the number of successful requests against the service during a specified period.

### Service-level objective

*(Or SLO)*. An actual target, either internal or part of the [service-level agreement](#service-level-agreement), for the availability of the service. This is often expressed as a percentage (99,2%, for instance). If the service meets or exceeds this target, it's within its "error budget"

### Smoke test

A test that verifies whether the system under test can handle a minimal amount of load without any issues. Testers commonly use smoke tests to make sure that everything works as intended under optimal conditions. After the smoke test, they can advance to any of the other performance test types.

Read more: [Smoke Testing](/test-types/smoke-testing)

### Soak test

A test that tries to uncover performance and reliability issues stemming from a system being under pressure for an extended duration.

Read more: [Soak Testing](/test-types/soak-testing)

### Stability

A system under test’s ability to withstand failures and errors.

### Stress test

A type of test used to identify the limits of what the system under test can handle in terms of load.

Read more: [Stress Testing](/test-types/stress-testing)

### System under test

The software that the load test tests. This could be an API, a website, infrastructure, or any combination of these.

### Test run

An individual execution of a test script over all configured iterations.

Read more: [Running k6](/getting-started/running-k6)

### Test script

The actual code that k6 executes to create a test run, along with all (or at least most) configuration needed to run the code. A test script defines how the test behaves, and what requests to make.

Read more: [Single Request example](/examples/single-request).

### Threshold

A minimum value that indicates something significant about a system.
In k6, thresholds are pass/fail criteria that specify the performance expectations of the system under test.

 Testers often use thresholds to codify [SLOs](#service-level-objectives)

Read more: [Threshold reference](k6.io/docs/using-k6/thresholds)

### Throughput

The rate of successful message delivery. In k6, throughput is measured in requests per second.

### Vertical scalability

The degree to which a system under test can improve performance or increase capacity by adding more hardware resources to a node (RAM, cores, bandwidth, etc.).

### Virtual users

Or VUs. The simulated users that perform separate and concurrent iterations of your test script.

Read more: [VU option reference](/using-k6/k6-options/reference#vus), [Tutorial to calculate the number of Virtual Users with Google Analytics](https://k6.io/blog/monthly-visits-concurrent-users).

