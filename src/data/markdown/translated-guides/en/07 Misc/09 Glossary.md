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

<dl>
 
<dt id="application-performance-monitoring">Application performance monitoring</dt>
<dd>*(Or APM)*. The practice of monitoring the performance, availability, and reliability of a system. When running load tests, Grafana is an example of a compatible APM service, as users can use Grafana to monitor the load test from the side of the system under test.
<p>Read more: [k6 cloud has built-in support to export to a few APM services](https://k6.io/docs/cloud/integrations/cloud-apm/).</p></dd>

<dt id="concurrency">Concurrency</dt>
<dd>When multiple computations happen at the same time.
In the context of k6, virtual users can make concurrent requests as a test runs. In k6 cloud, you can also run multiple tests concurrently.</dd>

<dt id="correlation">Correlation</dt>
<dd>The process of taking [dynamic data](#dynamic-data) received from the system under test then reusing the data in a subsequent request. Testers commonly use correlation to retrieve and reuse session IDs or tokens for a [virtual user](#virtual-user)'s iteration lifetime.
<p>Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/), [Correlation in testing APIs](https://k6.io/docs/testing-guides/api-load-testing/#correlation-and-data-parameterization)</p></dd>

<dt id="checks">Checks</dt>
<dd>Conditions that validate the correctness of a service.
In k6 scripts, checks are a function that validates a response to a test request.
<p>Read more: [Checks reference](/using-k6/checks)</p></dd>

<dt id="duration">Duration</dt>
<dd>The length of time that a test runs. When duration is set as an option, VU code runs for as many iterations as possible in the length of time specified (with possible finishing time given as a [graceful stop](#graceful-stop).
<p>Read more: [Duration option reference](https://k6.io/docs/using-k6/k6-options/reference/#duration)</p></dd>

<dt id="dynamic-data">Dynamic data</dt>
<dd>Data that might, or will, change between test runs. Common examples are order IDs, session tokens, or timestamps.
<p>Read more: [Correlation and dynamic data example](https://k6.io/docs/examples/correlation-and-dynamic-data/)</p></dd>

<dt id="endurance-testing">Endurance testing</dt>
<dd>A synonym for [soak testing](#soak-test).</dd>

<dt id="executor">Executor</dt>
<dd>An property of a [scenario](#scenario) that configures VU behavior. You can use executors to configure whether to designate iterations as shared between VUs or to run per VU, or to configure or whether the VU concurrency is constant or changing</dd>

<dt id="goja">Goja</dt>
<dd>A JavaScript runtime, written in pure Go, that emphasizes standard compliance and performance. k6 uses Goja to enable test scripting without compromising speed, efficiency or reliability, compromises that would have been necessary with NodeJS
<p>Read more: [Goja repository on GitHub](https://github.com/dop251/goja).</p></dd>

<dt id="graceful-stop">Graceful stop</dt>
<dd>A period that lets VUs finish an iteration at the end of a load test. Graceful stops prevent abrupt halts in execution, and graceful ramp downs prevent unrealistic drops to zero VUs.
<p>Read more: The [Graceful stop reference](https://k6.io/docs/using-k6/scenarios/graceful-stop/)</p></dd>

<dt id="horizontal-scalability">Horizontal scalability</dt>
<dd>The degree to which one can improve the performance of a system by adding more nodes (servers or computers for instance).</dd>

<dt id="http-archive-(har-file)">HTTP archive (HAR file)</dt>
<dd>A file containing logs of a browser interactions with the system under test. All included transactions are stored as JSON-formatted text. You can use these archives to generate test scripts using (for example, with the har-to-k6 Converter).
<p>Read more: [HAR 1.2 Specification](http://www.softwareishard.com/blog/har-12-spec/), [HAR converter](https://k6.io/docs/test-authoring/recording-a-session/har-converter/)</p></dd>

<dt id="iteration">Iteration</dt>
<dd>A single run in the execution of the `default function`, or scenario `exec` function.
You can either calculate iterations across all [virtual users](#virtual-users) (as done by the [Shared iterations](/using-k6/scenarios/executors/shared-iterations) executor), or per virtual user (as the [Per-VU Iterations](/using-k6/scenarios/executors/per-vu-iterations)).
<p>Read more: The [test life cycle](https://k6.io/docs/using-k6/test-life-cycle/) document breaks down each stage of a k6 script, including iterations in VU code.</p></dd>

<dt id="k6-cloud">k6 Cloud</dt>
<dd>The proper name for the entire cloud product, comprising both k6 Cloud Execution and k6 Cloud Test Results.
<p>Read more: [k6 Cloud docs](https://k6.io/docs/cloud)</p></dd>

<dt id="k6-options">k6 options</dt>
<dd>Values that configure a k6 test run. You can set options with command-line flags, environment variables, and in the script.
<p>Read more: [k6 Options](/using-ky/k6-options)</p></dd>

<dt id="load-test">Load test</dt>
<dd>A test that assesses the performance of the system under test in terms of concurrent users or requests per second.
<p>Read more: [Load Testing](/test-types/load-testing)</p></dd>

<dt id="load-zone">Load zone</dt>
<dd>The geographical instance from which a test runs.
<p>Read more: [Private load zones](/cloud/cloud-faq/private-load-zones/)</p></dd>

<dt id="metric">Metric</dt>
<dd>Anything measurable that a test emits. Users use metrics to assess the performance of the system under test in terms of concurrent users or requests per second.
<p>Read more: [Metrics](/using-k6/metrics)</p></dd>

<dt id="metric-sample">Metric sample</dt>
<dd>A metric's value (and, in time-series data, its timestamp)</dd>

<dt id="parameterization">Parameterization</dt>
<dd>The process of turning test values into reusable parameters, e.g. through variables and shared arrays.
<p>Read more: [Data parameterization examples](https://k6.io/docs/examples/data-parameterization/)</p></dd>

<dt id="reliability">Reliability</dt>
<dd>The degree to which a system can produce correct results consecutively, even when under pressure.</dd>

<dt id="requests-per-second">Requests per second</dt>
<dd>The rate at which a test sends requests to the system under test.</dd>

<dt id="saturation">Saturation</dt>
<dd>A condition when a system's reaches full resource utilization and can handle no additional request.</dd>

<dt id="scalability">Scalability</dt>
<dd>The degree to which system under test’s performance or capacity may be increased by adding additional resources. See [Vertical scalability](#vertical-scalability) and [Horizontal scalability](#horizontal-scalability).</dd>

<dt id="scenario">Scenario</dt>
<dd>A special option that models plausible events that an application could experience. To model high traffic, a scenario might have virtual users making concurrent requests over multiple script iterations. Configure scenario behavior with [executors](#executors)
<p>Read more: [Scenarios reference](/using-k6/scenarios)</p></dd>

<dt id="service-level-agreement">Service-level agreement</dt>
<dd>*(Or SLA)*. An agreement between a service provider and another party, often a user of the service, promising that the availability of the service will meet a certain level during a certain period.</dd>

<dt id="service-level-indicator">Service-level indicator</dt>
<dd>*(Or SLI)*. A metric that measures whether a service meets its [service-level objective](#service-level-objective). In performance monitoring, and SLI could be the number of successful requests against the service during a specified period.</dd>

<dt id="service-level-objective">Service-level objective</dt>
<dd>*(Or SLO)*. An actual target, either internal or part of the [service-level agreement](#service-level-agreement), for the availability of the service. This is often expressed as a percentage (99,2%, for instance). If the service meets or exceeds this target, it's within its "error budget"</dd>

<dt id="smoke-test">Smoke test</dt>
<dd>A test that verifies whether the system under test can handle a minimal amount of load without any issues. Testers commonly use smoke tests to make sure that everything works as intended under optimal conditions. After the smoke test, they can advance to any of the other performance test types.
<p>Read more: [Smoke Testing](/test-types/smoke-testing)</p></dd>

<dt id="soak-test">Soak test</dt>
<dd>A test that tries to uncover performance and reliability issues stemming from a system being under pressure for an extended duration.
<p>Read more: [Soak Testing](/test-types/soak-testing)</p></dd>

<dt id="stability">Stability</dt>
<dd>A system under test’s ability to withstand failures and errors.</dd>

<dt id="stress-test">Stress test</dt>
<dd>A type of test used to identify the limits of what the system under test can handle in terms of load.
<p>Read more: [Stress Testing](/test-types/stress-testing)</p></dd>

<dt id="system-under-test">System under test</dt>
<dd>The software that the load test tests. This could be an API, a website, infrastructure, or any combination of these.</dd>

<dt id="test-run">Test run</dt>
<dd>An individual execution of a test script over all configured iterations.
<p>Read more: [Running k6](/getting-started/running-k6)</p></dd>

<dt id="test-script">Test script</dt>
<dd>The actual code that k6 executes to create a test run, along with all (or at least most) configuration needed to run the code. A test script defines how the test behaves, and what requests to make.
<p>Read more: [Single Request example](/examples/single-request).</p></dd>

<dt id="threshold">Threshold</dt>
<dd>A minimum value that indicates something significant about a system.
In k6, thresholds are pass/fail criteria that specify the performance expectations of the system under test.

 Testers often use thresholds to codify [SLOs](#service-level-objectives)
<p>Read more: [Threshold reference](k6.io/docs/using-k6/thresholds)</p></dd>

<dt id="throughput">Throughput</dt>
<dd>The rate of successful message delivery. In k6, throughput is measured in requests per second.</dd>

<dt id="vertical-scalability">Vertical scalability</dt>
<dd>The degree to which a system under test can improve performance or increase capacity by adding more hardware resources to a node (RAM, cores, bandwidth, etc.).</dd>

<dt id="virtual-users">Virtual users</dt>
<dd>Or VUs. The simulated users that perform separate and concurrent iterations of your test script.
<p>Read more: [VU option reference](/using-k6/k6-options/reference#vus), [Tutorial to calculate the number of Virtual Users with Google Analytics](https://k6.io/blog/monthly-visits-concurrent-users).</p></dd>
 
</dl>
