---
title: Glossary
excerpt: 'Find a list of terms commonly used within the k6 project and what we mean when we use them.'
---

<Glossary>
- [Concurrency](#Concurrency)
- [Correlation](#Correlation)
- [Checks](#Checks)
- [Duration](#Duration)
- [Dynamic data](#Dynamic data)
- [Endurance testing](#Endurance testing)
- [Executor](#Executor)
- [Goja](#Goja)
- [Graceful stop](#Graceful stop)
- [Horizontal scalability](#Horizontal scalability)
- [HTTP archive (HAR file)](#HTTP archive (HAR file))
- [Iteration](#Iteration)
- [k6 Cloud](#k6 Cloud)
- [k6 Options](#k6 Options)
- [Load test](#Load test)
- [Load zone](#Load zone)
- [Metric](#Metric)
- [Metric sample](#Metric sample)
- [Parameterization](#Parameterization)
- [Reliability](#Reliability)
- [Requests per second](#Requests per second)
- [Saturation](#Saturation)
- [Scalability](#Scalability)
- [Scenario](#Scenario)
- [Service-level agreement](#Service-level agreement)
- [Service-level indicator (SLI)](#Service-level indicator (SLI))
- [Service-level objective (SLO)](#Service-level objective (SLO))
- [Smoke test](#Smoke test)
- [Soak test](#Soak test)
- [undefined](#undefined)
- [Stress test](#Stress test)
- [System under test](#System under test)
- [Test run](#Test run)
- [Test script](#Test script)
- [Threshold](#Threshold)
- [Vertical scalability](#Vertical scalability)
- [Virtual users (VU)](#Virtual users (VU))

</Glossary>

<dl> <dt id="Concurrency"><b> Concurrency</b></dt>
<dd> When multiple computations happen at the same time.
In the context of k6, virtual users can make concurrent requests as a test runs. In k6 cloud, you can also run multiple tests concurrently. </dd> 
<dt id="Correlation"><b> Correlation</b></dt>
<dd> The process of capturing dynamic data received from the system under test and reusing the data in subsequent requests. A common use case for correlation is retrieving and reusing a session id, or token, throughout the whole lifetime of a [virtual user](#virtual-user). </dd> 
<dt id="Checks"><b> Checks</b></dt>
<dd> Conditions that validate the correctness of a service.
In k6 scripts, checks are a function that validates a response to a test request. </dd> 
<dt id="Duration"><b> Duration</b></dt>
<dd> The length of time that a test runs. When duration is set as an option, VU code runs for the length of time specified. </dd> 
<dt id="Dynamic data"><b> Dynamic data</b></dt>
<dd> Data that might, or will, change between test runs. Common examples are order ids, session tokens or timestamps. </dd> 
<dt id="Endurance testing"><b> Endurance testing</b></dt>
<dd> A synonym for [soak testing](#soak-test). </dd> 
<dt id="Executor"><b> Executor</b></dt>
<dd> An attribute that configures VU behavior in a scenario. </dd> 
<dt id="Goja"><b> Goja</b></dt>
<dd> A JavaScript runtime, purely written in go, that emphasizes standard compliance and performance. We use goja to allow for test scripting without having to compromise speed, efficiency or reliability, which would have been the case using NodeJS. For more details, see the [Goja repository on GitHub](https://github.com/dop251/goja). </dd> 
<dt id="Graceful stop"><b> Graceful stop</b></dt>
<dd> A period that lets VUs finish an iteration at the end of a load test. Graceful stops prevent abrupt halts in execution, and graceful ramp downs unrealistic drops to zero VUs. </dd> 
<dt id="Horizontal scalability"><b> Horizontal scalability</b></dt>
<dd> The degree to which one can improve the performance of a system by adding more nodes (servers or computers for instance). </dd> 
<dt id="HTTP archive (HAR file)"><b> HTTP archive (HAR file)</b></dt>
<dd> A file containing logs of a browser interactions with the system under test. All of the included transactions are stored as JSON-formatted text. These archives may then be used to generate test scripts using, for instance, the [har-to-k6 Converter](https://github.com/k6io/har-to-k6).

For more details, see the [HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/). </dd> 
<dt id="Iteration"><b> Iteration</b></dt>
<dd> An iteration is an execution of the `default function`, or scenario `exec` function.
You can either calculate iterations across all [virtual users](#virtual-users) (as done by the [Shared iterations](/using-k6/scenarios/executors/shared-iterations) executor), or per virtual user (as the [Per-VU Iterations](/using-k6/scenarios/executors/per-vu-iterations)). </dd> 
<dt id="k6 Cloud"><b> k6 Cloud</b></dt>
<dd> **k6 Cloud** is the common name for the entire cloud product, which is composed of both k6 Cloud Execution and k6 Cloud Test Results. </dd> 
<dt id="k6 Options"><b> k6 Options</b></dt>
<dd> Values that configure a k6 test run. Can be set with command-line flags, environment variables, and in the script. </dd> 
<dt id="Load test"><b> Load test</b></dt>
<dd> A test that assesses the performance of the system under test in terms of concurrent users or requests per second. </dd> 
<dt id="Load zone"><b> Load zone</b></dt>
<dd> The geographical instance from which a test runs. </dd> 
<dt id="Metric"><b> Metric</b></dt>
<dd> Anything measurable that a test emits. Users use metrics to assess the performance of the system under test in terms of concurrent users or requests per second. </dd> 
<dt id="Metric sample"><b> Metric sample</b></dt>
<dd> A metric's value (and, in time-series data, its timestamp) </dd> 
<dt id="Parameterization"><b> Parameterization</b></dt>
<dd> The process of turning test values into reusable parameters, e.g. through variables and shared arrays. </dd> 
<dt id="Reliability"><b> Reliability</b></dt>
<dd> The degree to which a system can produce reliable results consecutively, even under pressure. </dd> 
<dt id="Requests per second"><b> Requests per second</b></dt>
<dd> the rate at which requests are executed against the system under test. </dd> 
<dt id="Saturation"><b> Saturation</b></dt>
<dd> A condition when a system's reaches full resource utilization, and can handle no additional request. </dd> 
<dt id="Scalability"><b> Scalability</b></dt>
<dd> The degree to which system under test’s performance or capacity may be increased by adding additional resources. See [Vertical scalability](#vertical-scalability) and [Horizontal scalability](#horizontal-scalability). </dd> 
<dt id="Scenario"><b> Scenario</b></dt>
<dd> A special option that models plausible events that an application could experience. To model high traffic, a scenario might have virtual users making concurrent requests over multiple script iterations. </dd> 
<dt id="Service-level agreement"><b> Service-level agreement</b></dt>
<dd> an agreement made between the one providing the service and someone, often a user of the service, promising that the availability of the service will meet a certain level during a certain period. </dd> 
<dt id="Service-level indicator (SLI)"><b> Service-level indicator (SLI)</b></dt>
<dd> the metric we use to measure whether a service meets the [service-level objective (SLO)](#service-level-objective). While doing performance monitoring this could, for instance, be the number of successful requests against the service during a specified period. </dd> 
<dt id="Service-level objective (SLO)"><b> Service-level objective (SLO)</b></dt>
<dd> An actual target, either internal or part of the [service-level agreement (SLA)](#service-level-agreement), for the availability of the service. This is often expressed as a percentage (99,2%, for instance). If the service meets or exceeds this target, it's deemed stable. </dd> 
<dt id="Smoke test"><b> Smoke test</b></dt>
<dd> A type of test used to verify that the system under test can handle a minimal amount of load without any issues. It’s commonly used as a first step, to ensure that everything works as intended under optimal conditions, before advancing to any of the other performance test types. </dd> 
<dt id="Soak test"><b> Soak test</b></dt>
<dd> A type of test used to uncover performance and reliability issues stemming from a system being under pressure for an extended period. </dd> 
<dt id="undefined"><b> undefined</b></dt>
<dd> A system under test’s ability to withstand failures and errors. </dd> 
<dt id="Stress test"><b> Stress test</b></dt>
<dd> A type of test used to identify the limits of what the system under test is capable of handling in terms of load. </dd> 
<dt id="System under test"><b> System under test</b></dt>
<dd> The software that the load test tests. This could be an API, a website, infrastructure, or any combination of these. </dd> 
<dt id="Test run"><b> Test run</b></dt>
<dd> An individual execution of a test script. </dd> 
<dt id="Test script"><b> Test script</b></dt>
<dd> The actual code you run as part of your test run, as well as any (or at least most) of the configuration needed to run the code. It defines how the test will behave as well as what requests will be made. See the [Single Request example](/examples/single-request). </dd> 
<dt id="Threshold"><b> Threshold</b></dt>
<dd> A minimum value that indicates something significant about a system.
In k6, thresholds are pass/fail criteria that specify the performance expectations of the system under test. </dd> 
<dt id="Vertical scalability"><b> Vertical scalability</b></dt>
<dd> A trait describing to what degree a system under test’s performance or capacity may be increased by adding more hardware resources to a node (RAM, cores, bandwidth, etc.). </dd> 
<dt id="Virtual users (VU)"><b> Virtual users (VU)</b></dt>
<dd> The simulated users that perform separate and concurrent iterations of your test script. </dd> 
</dl>
