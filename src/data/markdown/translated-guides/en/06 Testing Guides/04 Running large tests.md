---
title: 'Running large tests'
excerpt: 'How to run large-scale k6 tests without distributed-execution'
---

This document explains how to launch a large-scale k6 test on a single machine without the need for distributed execution. In most cases, the process involves the following:
- Changing operating system settings to increase the default network and user limits.
- Monitoring the load generator machine to ensure adequate resource usage.
- Efficient test design, with attention to scripting, k6 options, and file uploads.
- Monitoring the test run to detect errors logged by k6, which could indicate limitations of the load generator machine or the [system under test](/misc/glossary/#system-under-test) (SUT).

A common misconception of many load testers is that [distributed execution](#distributed-execution) (the ability to launch a load test from multiple machines) is required to generate a large load. This is not the case with k6.

k6 is different from many other load testing tools in the way it handles hardware resources. A single k6 process will efficiently use all CPU cores on a load generator machine. Depending on the available resources, and taking into consideration some of the advice below, a single instance of k6 is able to run 30,000-40,000 simultaneous users (VUs). In some cases this number of VUs can generate up to 300,000 HTTP requests per second (RPS).

Unless you need more than 100,000-300,000 requests per second (6-12M requests per minute), a single instance of k6 will likely be sufficient for your needs.

Below we will explore what hardware and considerations are needed for generating different levels of load.

## OS fine-tuning

Modern operating systems are configured with a fairly low limit of the number of concurrent network connections an application can create. This is a safe default since most programs don't need to open thousands of concurrent TCP connections like k6. However, if we want to use the full network capacity and achieve maximum performance, we need to change some of these default settings.

On a GNU/Linux machine, run the following commands as the `root` user:

```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```

These commands enable reusing network connections, increase the limit of network connections, and range of local ports.

The `sysctl` commands apply immediately for the entire system, and will reset to their default values if you restart the network service or reboot the machine. The `ulimit` command applies only for the current shell session, and you'll need to run it again for it to be set in another shell instance.

For detailed information about these settings, how to make them permanent, and instructions for macOS, check out our ["Fine tuning OS" article](/misc/fine-tuning-os).

## Hardware considerations

### Network

Network throughput of the machine is an important consideration when running large tests.
Many AWS EC2 machines come with 1Gbit/s connection which may limit the amount of load k6 can generate.

When running the test, you can use `iftop` in the terminal to view in real-time the amount of network traffic generated.
If the traffic is constant at 1Gbit/s, your test is probably limited by the network card. Consider upgrading to a different EC2 instance.

### CPU

Unlike many other load testing tools, k6 is heavily multi-threaded. It will effectively use all available CPU cores.

The amount of CPU you need depends on your test files (sometimes called test script).
Regardless of the test file, you can assume that large tests require a significant amount of CPU power.
We recommend that you size the machine to have at least 20% idle cycles (up to 80% used by k6, 20% idle).
If k6 uses 100% of the CPU to generate load, the test will experience throttling limits, and this may
cause the result metrics to have a much larger response time than in reality.

### Memory

k6 likes memory, but [it isn't as greedy as other load testing tools](https://k6.io/blog/comparing-best-open-source-load-testing-tools#memory-usage).
Memory consumption heavily depends on your test scenarios. To estimate the memory requirement of your test,
run the test on your development machine with 100VUs and multiply the consumed memory by the target number of VUs.

Simple tests will use ~1-5MB per VU. (1000VUs = 1-5GB).
Tests that are using file uploads, or load large JS modules, can consume tens of megabytes per VU.
Keep in mind that each VU has a copy of all JS modules your test uses.
If you need to share memory between VUs, consider using [SharedArray](/javascript-api/k6-data/sharedarray/), or an external data store, such as [Redis](/javascript-api/k6-experimental/redis/).

## General advice

### Resilient error handling

When running large stress tests, your script can't assume anything about the HTTP response.
Often performance tests are written with a "happy path" in mind.
For example, a "happy path" check like the one below is something that we often see in k6 scripts.

```javascript
import { check } from 'k6';
import http from 'k6/http';

const res = http.get('https://test.k6.io');
const checkRes = check(res, {
  'Homepage body size is 11026 bytes': (r) => r.body.length === 11026,
});
```

Code like this runs fine when the [SUT](/misc/glossary/#system-under-test) is not overloaded and returns proper responses.
When the system starts to fail, the above check won't work as expected.

The issue here is that the check assumes that there's always a body in a response. The `r.body` may not exist if the server is failing.
In such case, the check itself won't work as expected and an error similar to the one below will be returned:

```bash
ERRO[0625] TypeError: Cannot read property 'length' of undefined
```

To fix this issue your checks must be resilient to any response type. This change will fix the above problem.

<CodeGroup labels={["resilient check"]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

const res = http.get('https://test.k6.io');
const checkRes = check(res, {
  'Homepage body size is 11026 bytes': (r) => r.body && r.body.length === 11026,
});
```

</CodeGroup>

### Monitor the load generator machine

If you are running a test for the first time, it's a good idea to keep an eye on the available resources while the test is running.
The easiest way to do so is to start at least 2 terminals one the machine: one to run k6, and others to monitor the CPU, memory and network usage.

We recommend the following command-line tools for monitoring resources:

- CPU and memory: [htop](https://en.wikipedia.org/wiki/Htop) or [nmon](https://nmon.sourceforge.net/).

- Network: [iftop](https://en.wikipedia.org/wiki/Iftop) or [nmon](https://nmon.sourceforge.net/).

If you prefer graphical applications, you can use your OS's system monitoring tool (e.g. GNOME System
Monitor or Plasma System Monitor), or use a standalone tool like [SysMonTask](https://github.com/KrispyCamel4u/SysMonTask).

Here's a screenshot of 3 terminal sessions showing k6, iftop and htop.
![k6 iftop htop](./images/large-scale-testing-3-terminals.png)

As general guidelines, look for the following:
- CPU utilization doesn't exceed 90%. If all CPU cores are 100% utilized during the test run, you might notice performance degradation in your test results.
- Network utilization is at an acceptable level. Depending on your test, you might expect to fully saturate the network bandwidth, or this might be a signal that your test is bound by the available bandwidth. In other scenarios, you might want to minimize network usage to keep costs down.
- Memory utilization doesn't exceed 90%. If you're close to exhausting available physical RAM, the system might start swapping memory to disk, which will affect performance and system stability. In extreme cases, running out of memory on Linux will cause the system to end the k6 process.

## k6 Options

The k6 settings listed below will unlock additional performance benefits when running large tests.

### discardResponseBodies

k6 by default loads the response body of the request into memory. This causes much higher memory consumption and is often not necessary.
You can tell k6 to not process the body of all responses by setting `discardResponseBodies` in the options object like this:

```javascript
export const options = {
  discardResponseBodies: true,
};
```

If you need the response body for some requests you can override this with [Params.responseType](/javascript-api/k6-http/params).


### --no-thresholds --no-summary

If you are running a local test and streaming results to the k6 Cloud (`k6 run -o cloud`), you may want to disable the terminal summary
and local threshold calculation, because k6 Cloud will display the summary and calculate the thresholds.

Without these options, the operations will be duplicated by both the local machine and the k6 Cloud servers.
This will save you some memory and CPU cycles.

Here are all the mentioned flags, all in one:

```bash
k6 run scripts/website.js \
  -o cloud \
  --vus=20000 \
  --duration=10m \
  --no-thresholds \
  --no-summary
```

## Test script optimizations

If you are trying to squeeze more performance out of the hardware, you can consider optimizing the code of the test script itself.

### Checks and groups

k6 records the result of every individual check and group separately. If you are using many checks and groups, you may consider removing them to boost performance.

### Custom metrics

Similar to checks, values for custom metrics (Trend, Counter, Gauge and Rate) are recorded separately. Consider minimizing the usage of custom metrics.

### Thresholds with abortOnFail

If you have configured [abortOnFail thresholds](/using-k6/thresholds#aborting-a-test-when-a-threshold-is-crossed), k6 needs to evaluate the result constantly to verify that the threshold wasn't crossed. Consider removing this setting.

### URL grouping

k6 v0.41.0 introduced a change to support metric time-series. A side-effect of this is that every unique URL will create a new time-series object, which may consume more RAM than expected.

The solution to this is to use the [URL grouping](/using-k6/http-requests/#url-grouping) feature.

### JavaScript optimizations

Finally, if all of the above suggestions are insufficient, there might be some JavaScript optimizations you can do. This includes general improvements to minimize script complexity: avoid deeply nested `for` loops, don't keep references to large objects in memory if it can be avoided, keep external JS dependencies to a minimum, perform tree shaking of the k6 script if you have a build pipeline, etc.

Refer to this article about [garbage collection](https://javascript.info/garbage-collection) in the V8 runtime. While the JavaScript VM k6 uses is very different and runs on Go, the general principles are applicable. Keep in mind that memory leaks are still possible in k6 scripts, and might lead to much quicker RAM exhaustion if not fixed.


## File upload testing

Special considerations must be taken when testing file uploads.

### Network throughput

The network throughput of the load generator machine, as well as the SUT will likely be the bottleneck.

### Memory

k6 needs a significant amount of memory when uploading files, as every VU is independent and has its own memory.

### Costs

#### Data transfer

k6 can upload a large amount of data in a very short period of time. Make sure you understand the data transfer costs before commencing a large scale test.

[Outbound Data Transfer is expensive in AWS EC2](https://www.cloudmanagementinsider.com/data-transfer-costs-everything-you-need-to-know/). The price ranges between $0.08 to $0.20 per GB depending on the region.
If you use the cheapest region the cost is about $0.08 per GB. Uploading 1TB, therefore, costs about $80. A long-running test can cost several hundreds of dollars in data transfer alone.

If your infrastructure is already hosted on AWS, consider running your load generator machine within the same AWS region and availability zone. In some cases, this traffic will be much cheaper or even free. For additional data cost-saving tips, check this [article on how to reduce data transfer costs on AWS](https://www.stormit.cloud/blog/aws-data-transfer-pricing-how-to-reduce-costs/). Our examples are made with AWS in mind. However, the same suggestions also apply to other cloud providers.

#### Virtual server

The AWS EC2 instances are relatively cheap. Even the largest instance we have used in this benchmark (m5.24xlarge) costs only $4.6 per hour.
Make sure you turn off the load generator servers once you are done with your testing. A forgotten EC2 server might cost thousands of dollars per month.
Tip: it's often possible to launch "spot instances" of the same hardware for 10-20% of the cost.

## Errors

If you run into errors during the execution, it's good to understand if they were caused by the load generator or by the failing SUT.

### read: connection reset by peer

This is caused by the target system resetting the TCP connection. It happens when the Load Balancer or the server itself isn't able to handle the traffic.

```bash
WARN[0013] Request Failed       error="Get http://test.k6.io: read tcp 172.31.72.209:35288->63.32.205.136:80: read: connection reset by peer"
```

### context deadline exceeded

This happens when k6 was able to send a request, but the target system didn't respond in time. The default timeout in k6 is 60 seconds. If your system doesn't produce the response in this time frame, this error will appear.

```bash
WARN[0064] Request Failed    error="Get http://test.k6.io: context deadline exceeded"
```

### dial tcp 52.18.24.222:80: i/o timeout

This is a similar error to the one above, but in this case, k6 wasn't even able to make an HTTP request. The target system isn't able to establish a TCP connection.

```bash
WARN[0057] Request Failed     error="Get http://test.k6.io/: dial tcp 52.18.24.222:80: i/o timeout"
```

### socket: too many open files

This error means that the load-generator machine isn't able to open TCP sockets because it reached the limit of open file descriptors.
Make sure that your limit is set sufficiently high. See our ["Fine tuning OS" article](/misc/fine-tuning-os/#viewing-limits-configuration).

```bash
WARN[0034] Request Failed     error="Get http://test.k6.io/: dial tcp 99.81.83.131:80: socket: too many open files"
```

Note: you should decide what level of errors is acceptable. At large scale, some errors are always present.
If you make 50M requests with 100 failures, this is generally a good result (0.00002% errors).

## Benchmarking k6

We have executed a few large tests on different EC2 machines to see how much load k6 can generate. Our general observation is that k6 scales proportionally to the hardware. A machine with 2x more resources can generate roughly 2x more traffic. The limit to this scalability is in the number of open connections. A single Linux machine can open up to 65,535 sockets per IP address (see [RFC 6056](https://www.rfc-editor.org/rfc/rfc6056#section-2) for details). This means that a maximum of 65k requests can be sent simultaneously on a single machine. This is a theoretical limit, that will depend on the [configured ephemeral port range](https://en.wikipedia.org/wiki/Ephemeral_port), whether HTTP/2 is in use, which uses request multiplexing and can achieve higher throughput, and other factors. Primarily, though, the RPS limit will depend on the response time of the SUT. If responses are delivered in 100ms, the theoretical RPS limit is 650,000 for HTTP/1 requests to a single remote address.

We maintain a [repository](https://github.com/grafana/k6-hardware-benchmark) with some scripts used to benchmark k6 and create reports. These tests are run for every new k6 version, and you can see the results in the [`results/` directory](https://github.com/grafana/k6-hardware-benchmark/tree/master/results).


## Distributed execution

In load testing, distributed execution refers to running a load test distributed across multiple machines.

Users often look for the distributed execution mode to run large-scale tests. Although we have shown that a single k6 instance can generate enormous load, distributed execution is necessary to:

- Simulate load from multiple locations simultaneously.
- Scale the load of your test beyond what a single machine can handle.

In k6, you can split the load of a test across multiple k6 instances using the [execution-segment](/using-k6/k6-options/reference#execution-segment) option. For example:

<CodeGroup labels={["Two machines", "Three machines", "Four machines"]}>

```bash
## split the load of my-script.js across two machines
k6 run --execution-segment "0:1/2"   --execution-segment-sequence "0,1/2,1" my-script.js
k6 run --execution-segment "1/2:1"   --execution-segment-sequence "0,1/2,1" my-script.js
```

```bash
## split the load of my-script.js across three machines
k6 run --execution-segment "0:1/3"   --execution-segment-sequence "0,1/3,2/3,1" my-script.js
k6 run --execution-segment "1/3:2/3" --execution-segment-sequence "0,1/3,2/3,1" my-script.js
k6 run --execution-segment "2/3:1"   --execution-segment-sequence "0,1/3,2/3,1" my-script.js
```

```bash
## split the load of my-script.js across four machines
k6 run --execution-segment "0:1/4"     --execution-segment-sequence "0,1/4,2/4,3/4,1" my-script.js
k6 run --execution-segment "1/4:2/4"   --execution-segment-sequence "0,1/4,2/4,3/4,1" my-script.js
k6 run --execution-segment "2/4:3/4"   --execution-segment-sequence "0,1/4,2/4,3/4,1" my-script.js
k6 run --execution-segment "3/4:1"     --execution-segment-sequence "0,1/4,2/4,3/4,1" my-script.js
```

</CodeGroup>

However - at this moment - the distributed execution mode of k6 is not entirely functional. The current limitations are:

- k6 does not provide the functionality of a "primary" instance to coordinate the distributed execution of the test. Alternatively, you can use the [k6 REST API](/misc/k6-rest-api) and [--paused](/using-k6/k6-options/reference#paused) to synchronize the multiple k6 instances' execution.
- Each k6 instance evaluates [Thresholds](/using-k6/thresholds) independently - excluding the results of the other k6 instances. If you want to disable the threshold execution, use [--no-thresholds](/using-k6/k6-options/reference#no-thresholds).
- k6 reports the metrics individually for each instance. Depending on how you store the load test results, you'll have to aggregate some metrics to calculate them correctly.

With the limitations mentioned above, we built a [Kubernetes operator](https://github.com/grafana/k6-operator) to distribute the load of a k6 test across a **Kubernetes cluster**. For further instructions, check out [the running distributed k6 tests on Kubernetes tutorial](https://k6.io/blog/running-distributed-tests-on-k8s/).

> The k6 goal is to support a native open-source solution for distributed execution. If you want to follow the progress, subscribe to the [distributed execution issue](https://github.com/grafana/k6/issues/140) on GitHub.

## Large-scale tests in k6 Cloud

[k6 Cloud](https://k6.io/cloud) - our commercial offering - provides an instant solution for running large-scale tests, amongst other [benefits](/cloud#how-can-it-help-me).

If you aren't sure which solution, OSS or Cloud, is a better fit for your project, we recommend reading this [white paper](https://k6.io/what-to-consider-when-building-or-buying-a-load-testing-solution) to learn more about the risks and features to consider when building a scalable solution.


## Read more

- [Fine tuning OS](/misc/fine-tuning-os)
- [JavaScript Compatibility Mode](/using-k6/javascript-compatibility-mode)
- [A biased comparison of the best open source load testing tools](https://k6.io/blog/comparing-best-open-source-load-testing-tools)
- [k6 Cloud Pricing - soak and large-scale tests](https://k6.io/pricing#larger-tests)
- [White paper: what to consider when building or buying a load testing solution](https://k6.io/what-to-consider-when-building-or-buying-a-load-testing-solution)
