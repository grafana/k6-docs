---
title: Glossary
excerpt: 'A list of technical terms commonly used when discussing k6, with definitions.'
---

What we talk about when we talk about k6.

In discussion about k6, some terms have a precise, technical meaning.
If a certain term in these docs confuses you, consult this list for a definition.

<Glossary>

- [Application performance monitoring](#application-performance-monitoring)
- [Concurrent sessions](#concurrent-sessions)
- [Checks](#checks)
- [Data correlation](#data-correlation)
- [Data parameterization](#data-parameterization)
- [Dynamic data](#dynamic-data)
- [Endurance testing](#endurance-testing)
- [Goja](#goja)
- [Graceful stop](#graceful-stop)
- [HTTP archive](#http-archive)
- [Iteration](#iteration)
- [k6 Cloud](#k6-cloud)
- [k6 options](#k6-options)
- [Load test](#load-test)
- [Load zone](#load-zone)
- [Metric](#metric)
- [Metric sample](#metric-sample)
- [Reliability](#reliability)
- [Requests per second](#requests-per-second)
- [Saturation](#saturation)
- [Scenario](#scenario)
- [Scenario executor](#scenario-executor)
- [Smoke test](#smoke-test)
- [Soak test](#soak-test)
- [Stability](#stability)
- [Stress test](#stress-test)
- [System under test](#system-under-test)
- [Test run](#test-run)
- [Test concurrency](#test-concurrency)
- [Test duration](#test-duration)
- [Test script](#test-script)
- [Threshold](#threshold)
- [Throughput](#throughput)
- [Virtual users](#virtual-users)

</Glossary>

### Application performance monitoring

*(Or APM)*. The practice of monitoring the performance, availability, and reliability of a system.

 You can export k6 OSS and k6 Cloud results to an APM to analyze system metrics alongside k6 metrics.

Read more: [k6 cloud has built-in support to export to a few APM services](https://k6.io/docs/cloud/integrations/cloud-apm/).

### Concurrent sessions

The number of simultaneous VU requests in a test run.

### Checks

Conditions that validate the correctness of a service.
In k6 scripts, a check validates any true/false condition in the test.

Read more: [Checks reference](/using-k6/checks)

### Data correlation

The process of taking [dynamic data](#dynamic-data) received from the system under test and reusing the data in a subsequent request.

Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/), [Correlation in testing APIs](https://k6.io/docs/testing-guides/api-load-testing/#correlation-and-data-parameterization)

### Data parameterization

The process of turning test values into reusable parameters, e.g. through variables and shared arrays.

Read more: [Data parameterization examples](https://k6.io/docs/examples/data-parameterization/)

### Dynamic data

Data that might change or will change during test runs or across test runs. Common examples are order IDs, session tokens, or timestamps.

Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/)

### Endurance testing

A synonym for [soak testing](#soak-test).

### Goja

A JavaScript runtime written in Go. k6 uses Goja to enable test scripting in Javascript.

Read more: [Goja repository on GitHub](https://github.com/dop251/goja).

### Graceful stop

A period that lets VUs finish an iteration at the end of a load test. Graceful stops prevent abrupt halts in execution.

Read more: The [Graceful stop reference](https://k6.io/docs/using-k6/scenarios/graceful-stop/)

### HTTP archive

*(Or HAR file)*. A file containing logs of browser interactions with the system under test. All included transactions are stored as JSON-formatted text. You can use these archives to generate test scripts (for example, with the har-to-k6 Converter).

Read more: [HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/), [HAR converter](https://k6.io/docs/test-authoring/recording-a-session/har-converter/)

### Iteration

A single run in the execution of the `default function`, or scenario `exec` function.
Iterations can be shared between VUs, or per VU.

Read more: The [test life cycle](https://k6.io/docs/using-k6/test-life-cycle/) document breaks down each stage of a k6 script, including iterations in VU code.

### k6 Cloud

The proper name for the entire cloud product, comprising both k6 Cloud Execution and k6 Cloud Test Results.

Read more: [k6 Cloud docs](https://k6.io/docs/cloud)

### k6 options

Values that configure a k6 test run. You can set options with command-line flags, environment variables, and in the script.

Read more: [k6 Options](/using-k6/k6-options)

### Load test

A test that assesses the performance of the system under test in terms of concurrent users or requests per second.

Read more: [Load Testing](/test-types/load-testing)

### Load zone

The geographical instance from which a test runs.

Read more: [Private load zones](/cloud/cloud-faq/private-load-zones/), [Declare load zones from the CLI](https://k6.io/docs/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#load-zones)

### Metric

A measure of how the system performs during a test run. `http_req_duration` is an example of a built-in k6 metric. Besides built-ins, you can also create custom metrics.

Read more: [Metrics](/using-k6/metrics)

### Metric sample

A single value for metric in a test run. For example, the value of `http_req_duration` from a single VU request.

### Reliability

The probability that a system under test performs as intended.

### Requests per second

The rate at which a test sends requests to the system under test.

### Saturation

A condition when a system's reaches full resource utilization and can handle no additional request.

### Scenario

An object in a test script that makes in-depth configurations to how VUs and iterations are scheduled. With scenarios, your test runs can model diverse traffic patterns.

Read more: [Scenarios reference](/using-k6/scenarios)

### Scenario executor

An property of a [scenario](#scenario) that configures VU behavior. You can use executors to configure whether to designate iterations as shared between VUs or to run per VU, or to configure or whether the VU concurrency is constant or changing.

### Smoke test

A regular load test configured for minimum load. Smoke tests verify that the script has no errors and that the system under test can handle a minimal amount of load.

Read more: [Smoke Testing](/test-types/smoke-testing)

### Soak test

A test that tries to uncover performance and reliability issues stemming from a system being under pressure for an extended duration.

Read more: [Soak Testing](/test-types/soak-testing)

### Stability

A system under test’s ability to withstand failures and errors.

### Stress test

A test that assess the availability and stability of the system under heavy load.

Read more: [Stress Testing](/test-types/stress-testing)

### System under test

The software that the load test tests. This could be an API, a website, infrastructure, or any combination of these.

### Test run

An individual execution of a test script over all configured iterations.

Read more: [Running k6](/getting-started/running-k6)

### Test concurrency

In k6 Cloud, the number of tests running at the same time.

### Test duration

The length of time that a test runs. When duration is set as an option, VU code runs for as many iterations as possible in the length of time specified.

Read more: [Duration option reference](https://k6.io/docs/using-k6/k6-options/reference/#duration)

### Test script

The actual code that defines how the test behaves and what requests it makes, along with all (or at least most) configuration needed to run the test.

Read more: [Single Request example](/examples/single-request).

### Threshold

A minimum value that indicates something significant about a system.
In k6, thresholds are pass/fail criteria that specify the performance expectations of the system under test.

 Testers often use thresholds to codify [SLOs](#service-level-objectives)

Read more: [Threshold reference](k6.io/docs/using-k6/thresholds)

### Throughput

The rate of successful message delivery. In k6, throughput is measured in requests per second.

### Virtual users

Or VUs. The simulated users that perform separate and concurrent iterations of your test script.

Read more: [VU option reference](/using-k6/k6-options/reference#vus), [Tutorial to calculate the number of Virtual Users with Google Analytics](https://k6.io/blog/monthly-visits-concurrent-users).

