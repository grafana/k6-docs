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
- [Virtual user](#virtual-user)

</Glossary>

<DescriptionList>

Application performance monitoring
: *(Or APM)*. The practice of monitoring the performance, availability, and reliability of a system. You can export k6 OSS and k6 Cloud results to an APM to analyze system metrics alongside k6 metrics.<br/><br/>[k6 OSS APM integrations](/getting-started/results-output/#external-outputs), [k6 Cloud APM integrations](/cloud/integrations/cloud-apm/)

Concurrent sessions
: The number of simultaneous VU requests in a test run.

Checks
: Checks are true/false conditions that evaluate the content of some value in the JavaScript runtime.<br/><br/>[Checks reference](/using-k6/checks)

Data correlation
: The process of taking [dynamic data](#dynamic-data) received from the system under test and reusing the data in a subsequent request.<br/><br/>[Correlation and dynamic data example](/examples/correlation-and-dynamic-data/), [Correlation in testing APIs](/testing-guides/api-load-testing/#correlation-and-data-parameterization)

Data parameterization
: The process of turning test values into reusable parameters, e.g. through variables and shared arrays.<br/><br/>[Data parameterization examples](/examples/data-parameterization/)

Dynamic data
: Data that might change or will change during test runs or across test runs. Common examples are order IDs, session tokens, or timestamps.<br/><br/>[Correlation and dynamic data example](/examples/correlation-and-dynamic-data/)

Endurance testing
: A synonym for [soak testing](#soak-test).

Goja
: A JavaScript engine written in Go. k6 binaries are embedded with Goja, enabling test scripting in JavaScript.<br/><br/>[Goja repository](https://github.com/dop251/goja)

Graceful stop
: A period that lets VUs finish an iteration at the end of a load test. Graceful stops prevent abrupt halts in execution.<br/><br/>[Graceful stop reference](/using-k6/scenarios/graceful-stop/)

HTTP archive
: *(Or HAR file)*. A file containing logs of browser interactions with the system under test. All included transactions are stored as JSON-formatted text. You can use these archives to generate test scripts (for example, with the har-to-k6 Converter).<br/><br/>[HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/), [HAR converter](/test-authoring/recording-a-session/har-converter/)

Iteration
: A single run in the execution of the `default function`, or scenario `exec` function. You can set iterations across all VUs, or per VU.<br/><br/>The [test life cycle](/using-k6/test-life-cycle/) document breaks down each stage of a k6 script, including iterations in VU code.

k6 Cloud
: The proper name for the entire cloud product, comprising both k6 Cloud Execution and k6 Cloud Test Results.<br/><br/>[k6 Cloud docs](/cloud)

k6 options
: Values that configure a k6 test run. You can set options with command-line flags, environment variables, and in the script.<br/><br/>[k6 Options](/using-k6/k6-options)

Load test
: A test that assesses the performance of the system under test in terms of concurrent users or requests per second.<br/><br/>[Load Testing](/test-types/load-testing)

Load zone
: The geographical instance from which a test runs.<br/><br/>[Private load zones](/cloud/creating-and-running-a-test/private-load-zones/), [Declare load zones from the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#load-zones)

Metric
: A measure of how the system performs during a test run. `http_req_duration` is an example of a built-in k6 metric. Besides built-ins, you can also create custom metrics.<br/><br/>[Metrics](/using-k6/metrics)

Metric sample
: A single value for a metric in a test run. For example, the value of `http_req_duration` from a single VU request.

Reliability
: The probability that a system under test performs as intended.

Requests per second
: The rate at which a test sends requests to the system under test.

Saturation
: A condition when a system's reaches full resource utilization and can handle no additional request.

Scenario
: An object in a test script that makes in-depth configurations to how VUs and iterations are scheduled. With scenarios, your test runs can model diverse traffic patterns.<br/><br/>[Scenarios reference](/using-k6/scenarios)

Scenario executor
: An property of a [scenario](#scenario) that configures VU behavior.
: You can use executors to configure whether to designate iterations as shared between VUs or to run per VU, or to configure or whether the VU concurrency is constant or changing.<br/><br/>[Executor reference](/using-k6/scenarios/executors/)

Smoke test
: A regular load test configured for minimum load. Smoke tests verify that the script has no errors and that the system under test can handle a minimal amount of load.<br/><br/>[Smoke Testing](/test-types/smoke-testing)

Soak test
: A test that tries to uncover performance and reliability issues stemming from a system being under pressure for an extended duration.<br/><br/>[Soak Testing](/test-types/soak-testing)

Stability
: A system under test’s ability to withstand failures and errors.

Stress test
: A test that assess the availability and stability of the system under heavy load.<br/><br/>[Stress Testing](/test-types/stress-testing)

System under test
: The software that the load test tests. This could be an API, a website, infrastructure, or any combination of these.

Test run
: An individual execution of a test script over all configured iterations.<br/><br/>[Running k6](/getting-started/running-k6)

Test concurrency
: In k6 Cloud, the number of tests running at the same time.

Test duration
: The length of time that a test runs. When duration is set as an option, VU code runs for as many iterations as possible in the length of time specified.<br/><br/>[Duration option reference](/using-k6/k6-options/reference/#duration)

Test script
: The actual code that defines how the test behaves and what requests it makes, along with all (or at least most) configuration needed to run the test.<br/><br/>[Single Request example](/examples/single-request).

Threshold
: A pass/fail criteria that evaluates whether a metric reaches a certain value. Testers often use thresholds to codify SLOs.<br/><br/>[Threshold reference](k6.io/docs/using-k6/thresholds)

Throughput
: The rate of successful message delivery. In k6, throughput is measured in requests per second.

Virtual user
: *(Or VU)*. The simulated users that run separate and concurrent iterations of your test script.<br/><br/>[The VU option](/using-k6/k6-options/reference#vus)

</DescriptionList>