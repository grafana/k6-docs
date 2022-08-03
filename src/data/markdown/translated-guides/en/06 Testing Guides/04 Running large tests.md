---
title: 'Running large tests'
excerpt: 'How to run large-scale k6 tests without distributed-execution'
---

This document explains how to launch a large-scale k6 test on a single machine without the need for distributed execution.

The common misconception of many load testers is that [distributed execution](#distributed-execution) (ability to launch a load test on multiple machines) is required to generate large load. This is not the case with k6.

k6 is different from many other load testing tools in the way it handles hardware resources. A single k6 process will efficiently use all CPU cores on a load generator machine.
A single instance of k6 is often enough to generate load of 30,000-40,000 simultaneous users (VUs). This number of VUs can generate upwards of 300,000 requests per second (RPS).

Unless you need more than 100,000-300,000 requests per second (6-12M requests per minute), a single instance of k6 will likely be sufficient for your needs.

Below we will explore what hardware and considerations are needed for generating different levels of load.

## OS fine-tuning

The following OS changes allow k6 to use the **full network capacity** of the machine for maximum performance.

```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```

These commands enable reusing network connections, increase the limit of network connections, and range of local ports.

To apply these changes, you can either paste these commands as a root user before running a k6 test or change the configuration files in your operating system.

For detailed information about these settings, the macOS instructions, and how to make them permanent, check out our ["Fine-tuning OS" article](/misc/fine-tuning-os).

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
If k6 uses 100% to generate load, it won't have enough CPU to measure the responses correctly.
This may cause the result metrics to have a much larger response time than in reality.

### Memory

k6 likes memory, but [it isn't as greedy as other load testing tools](https://k6.io/blog/comparing-best-open-source-load-testing-tools#memory-usage).
Memory consumption heavily depends on your test scenarios. To estimate the memory requirement of your test,
run the test on your development machine with 100VUs and multiply the consumed memory by the target number of VUs.

Simple tests will use ~1-5MB per VU. (1000VUs = 1-5GB).
Tests that are using file uploads can consume tens of megabytes per VU.

## General advice

### Make your test code resilient

When running large stress tests, your script can't assume anything about the HTTP response.
Often performance tests are written with a "happy path" in mind.
For example, a "happy path" check like the one below is something that we see in k6 often.

```javascript
import { check } from 'k6';
import http from 'k6/http';

const res = http.get('https://test.k6.io');
const checkRes = check(res, {
  'Homepage body size is 11026 bytes': (r) => r.body.length === 11026,
});
```

Code like this runs fine when the system under test (SUT) is not overloaded and returns proper responses.
When the system starts to fail, the above check won't work as expected.

The issue here is that the check assumes that there's always a body in a response. The `r.body` may not exist if server is failing.
In such case, the check itself won't work as expected and error similar to the one below will be returned:

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

### Monitor the load generator server

If you are running a test for the first time, it's a good idea to keep an eye on the available resources while the test is running.
The easiest way to do so is to SSH to the server with 3 sessions:

1. To run k6
2. To monitor CPU and memory
3. To monitor the network

For monitoring CPU and memory we recommend [htop](https://en.wikipedia.org/wiki/Htop).
For monitoring network, we recommend [iftop](https://en.wikipedia.org/wiki/Iftop)

Here's a screenshot of 3 terminal sessions showing k6, iftop and htop.
![k6 iftop htop](./images/large-scale-testing-3-terminals.png)

## k6 Options

The k6 settings listed below will unlock additional performance benefits when running large tests.

### --compatibility-mode=base

The most impactful option to improve k6 performance is to use [`--compatibility-mode=base`](/using-k6/k6-options/reference#compatibility-mode) to disable the internal [Babel](https://babeljs.io/) transpilation and run a k6 script written in ES5.1.  


```bash
# compatibility-mode=base disables the Babel transpilation and the inclusion of corejs 
k6 run --compatibility-mode=base yourscript.es5.js
```

> **Background**
> 
> Most k6 script examples and documentation are written in ES6+.
> 
> By default, k6 transpiles ES6+ code to ES5.1 using babel and loads corejs to enable commonly used APIs.
> This works very well for 99% of use cases, but it adds significant overheard with large tests.
> 
> When running a ES5.1 script instead of the original ES6+ script, k6 can use about 50-85% of memory and significantly reduce the CPU load and startup time.

You can use [webpack](https://webpack.js.org/) to transpile the scripts outside of k6. We have prepared a [webpack.config example](https://github.com/grafana/k6-hardware-benchmark/blob/master/webpack.config.js) that transforms ES6+ code to ES5.1 code for k6. 

In the [k6-hardware-benchmark](https://github.com/grafana/k6-hardware-benchmark) repository, you can use it as follows: 

```bash
git clone https://github.com/grafana/k6-hardware-benchmark/
cd k6-hardware-benchmark
yarn install

yarn run to-es5 someplace/yourscript.js
# builds the ES5 script in someplace/yourscript.es5.js

k6 run --compatibility-mode=base someplace/yourscript.es5.js
```

### discardResponseBodies

You can tell k6 to not process the body of the response by setting `discardResponseBodies` in the options object like this:

```javascript
export const options = {
  discardResponseBodies: true,
};
```

k6 by default loads the response body of the request into memory. This causes much higher memory consumption and often is completely unnecessary.
If you need response body for some requests you can set [Params.responseType](/javascript-api/k6-http/params).

### --no-thresholds --no-summary

If you are running a local test and streaming results to the cloud (`k6 run -o cloud`), you may want to disable the terminal summary
and local threshold calculation because thresholds and summary will be displayed in the cloud.
This will save you some memory and CPU cycles.

Here are all the mentioned flags, all in one:

```bash
k6 run scripts/website.es5.js \
  -o cloud \
  --vus=20000 \
  --duration=10m \
  --compatibility-mode=base \
  --no-thresholds \
  --no-summary \
```

### Remove unnecessary checks, groups and custom metrics

If everything else has failed and you are trying to squeeze more performance out of the hardware,
you can consider optimizing the code of the load test itself.

**Checks and groups**

k6 records the result of every individual check and group separately. If you are using many checks and groups, you may consider removing them to boost performance.

**Custom metrics**

Similar to checks, values for custom metrics (Trend, Counter, Gauge and Rate) are recorded separately. Consider minimizing the usage of custom metrics.

**Thresholds with abortOnFail**

If you have configured [abortOnFail thresholds](/using-k6/thresholds#aborting-a-test-when-a-threshold-is-crossed), k6 needs to evaluate the result constantly to verify that the threshold wasn't crossed. Consider removing this setting.

## File upload testing

Special considerations must be taken when testing file uploads.

### Network throughput

The network throughput of the load generator machine, as well as the SUT will likely be the bottleneck.

### Memory

k6 needs a significant amount of memory when uploading files, as every VU is independent and has its own memory.

### Data transfer costs

k6 can upload a large amount of data in a very short period of time. Make sure you understand the data transfer costs before commencing a large scale test.

[Outbound Data Transfer is expensive in AWS EC2](https://www.cloudmanagementinsider.com/data-transfer-costs-everything-you-need-to-know/). The price ranges between $0.08 to $0.20 per GB depending on the region.
If you use the cheapest region the cost is about $0.08 per GB. Uploading 1TB, therefore, costs about $80. Long-running test can cost several hundreds of dollars in data transfer alone.

### EC2 costs

The AWS EC2 instances are relatively cheap. Even the largest instance we have used in this benchmark (m5.24xlarge) costs only $4.6 per hour.
Make sure to turn off the load generator servers once you are done with your testing. Forgotten EC2 server will cost $3312 per month.
Tip: it's often possible to launch "spot instances" of the same hardware for 10-20% of the cost.

## Errors

If you run into errors during the execution, it's good to understand if they were caused by the load generator or by the failing SUT.

### read: connection reset by peer

Error similar to this one is caused by the target system resetting the TCP connection. This happens when the Load balancer or the server itself isn't able to handle the traffic.

```bash
WARN[0013] Request Failed       error="Get http://test.k6.io: read tcp 172.31.72.209:35288->63.32.205.136:80: read: connection reset by peer"
```

### context deadline exceeded

Error like this happens when k6 was able to send a request, but the target system didn't respond in time. The default timeout in k6 is 60 seconds. If your system doesn't produce the response in this time frame, this error will appear.

```bash
WARN[0064] Request Failed    error="Get http://test.k6.io: context deadline exceeded"
```

### dial tcp 52.18.24.222:80: i/o timeout

This is a similar error to the one above, but in this case, k6 wasn't even able to make a request. The target system isn't able to establish a connection.

```bash
WARN[0057] Request Failed     error="Get http://pawel.staging.loadimpact.com/static/logo.svg?url=v3: dial tcp 52.18.24.222:80: i/o timeout"
```

### socket: too many open files

This error means that the load-generator machine isn't able to open TCP sockets because it reached the limit of open file descriptors.
Make sure that your limit is set sufficiently high `ulimit -n 250000` should be enough for anyone :tm:

```bash
WARN[0034] Request Failed     error="Get http://99.81.83.131/static/logo.svg?ip=6: dial tcp 99.81.83.131:80: socket: too many open files"
```

Note: you should decide what level of errors is acceptable. At large scale, some errors are always present.
If you make 50M requests with 100 failures, this is generally a good result (0.00002% errors).

## Benchmarking k6 on AWS

We have executed a few large tests on different EC2 machines to see how much load k6 can generate.
Our general observation is that k6 scales proportionally to the hardware. 2x larger machine can generate 2x more traffic.
The limit to this scalability is in the number of open connections. A single Linux machine can open up to `65 535` sockets per IP.
This means that maximum of 65k requests can be executed simultaneously on a single machine.
The RPS limit depends on the response time of the SUT. If responses are delivered in 100ms, the RPS limit is 650 000.

### Real-life test of a website.

Testing the theoretical limits is fun, but that's not the point of this benchmark.
The point of this benchmark is to give users an indication of how much traffic k6 can generate when executing complicated, real-life tests.
For this purpose, we have written a rather heavy [real-life website test](https://github.com/grafana/k6-hardware-benchmark/blob/master/scripts/website.js) that uses almost all k6 features.

Setup:

- All tests were executed on AWS EC2 instances
- The "discardResponseBodies" recommendation was NOT used. (results would be better with this setting).
- Scripts used for testing are available in the `/scripts` directory. The results are reproducible
- k6 v0.26.2 was used
- Note: the target system (test.k6.io) was running on a large cluster to boost performance.
- Note: the target system (test.k6.io) is a slow-ish PHP website, not optimized for performance - a static website would be much quicker.

The "website.js" test file uses a wide range of k6 features to make the test emulate a real usage of k6. This is not a test rigged for performance - quite the opposite.
This test uses plenty of custom metrics, checks, parametrization, batches, thresholds and groups. It's a heavy test that should represent well the "real life" use case.

**> AWS m5.large EC2 server**

The `m5.large` instance has 8GB of RAM and 2 CPU cores.

The following command was used to execute the test

```bash
k6 run scripts/website.es5.js \
 -o cloud \
 --vus=6000 \
 --duration=10m \
 --compatibility-mode=base \
 --no-thresholds \
 --no-summary
```

Results

- Maximum VUS reached: 6000
- Memory used: 6.09 GB (out of 8.0)
- CPU load (avg): 1.49 (out of 2.0).
- Peak RPS: ~6000 (note, this test was not optimized for RPS).
- 2x `sleep(5)` in each iteration.

**> AWS m5.4xlarge**

The `m5.4xlarge` instance has 64GB of RAM and 16 CPU cores.

```bash
k6 run scripts/website.es5.js \
   -o cloud  \
   --vus=20000 \
   --duration=10m \
   --compatibility-mode=base  \
   --no-thresholds  \
   --no-summary

```

Results

- Maximum VUS reached: 20.000
- Memory used: 20.1 GB (out of 61.4)
- CPU load (avg): 8.5 (out of 16.0).
- Peak RPS: ~20.000 (note, this test was not optimized for RPS).
- 2x `sleep(5)` in each iteration.

**> AWS m5.24xlarge**

The m5.24xlarge has 384GB of RAM and 96 CPU cores.
NOTE: sleep has been reduced to 1s instead of 5s to produce more requests.

```bash
k6 run scripts/website.es5.js  \
   -o cloud  \
   --vus=30000 \
   --duration=5m \
   --compatibility-mode=base  \
   --no-thresholds  \
   --no-summary
```

Results

- Maximum VUS reached: 30.000
- Memory used: ~120 GB (out of 370 available)
- CPU load (avg): ~45 (out of 96.0).
- Peak RPS: ~61.500.
- `sleep(1)` in each iteration.

### Testing for RPS

As stated at the beginning, k6 can produce a lot of requests very quickly, especially if the target system responds quickly.
To test the RPS limit of our app we have written an [RPS-optimized test](https://github.com/grafana/k6-hardware-benchmark/blob/master/scripts/RPS-optimized.js). Unfortunately, our `test.k6.io` target system is a rather slow PHP app. Nevertheless using 30k VUs we have reached 188.000 RPS.
Much higher numbers are possible for faster systems.

**> AWS m5.24xlarge**

```bash
k6 run scripts/RPS-optimized.es5.js \
   -o cloud  \
   --vus=30000  \
   --duration=1m  \
   --compatibility-mode=base  \
   --no-thresholds \
   --no-summary
```

Results

- Maximum VUS reached: 30.000
- Memory used: 24 GB (out of 370 available)
- CPU load (avg): 80 (out of 96.0).
- Peak RPS: ~188.500.

### Testing for data transfer

k6 can utilize the available network bandwidth when uploading files, but it needs plenty of memory to do so.

Please read the warning about the cost of data transfer in AWS before commencing a large scale test.

**> AWS m5.24xlarge**

To test the network throughput we have written a [file uploading script](https://github.com/grafana/k6-hardware-benchmark/blob/master/scripts/file-upload.js). We have executed this test for only 1 minute to minimize the data transfer costs. In 1 minute, k6 managed to transfer 36 GB of data with 1000 VUs.

```bash
k6 run scripts/file-upload.es5.js \
-o cloud \
--vus=1000 \
--duration=1m \
--compatibility-mode=base \
--no-thresholds \
--no-summary
```

Results

- Maximum VUS reached: 1.000
- Memory used: 81 GB (out of 370 available)
- CPU load (avg): 9 (out of 96.0).
- Network throughput reached **4.7Gbit/s**
- Data transferred: 36GB.

Note: each VU in k6 is completely independent, and therefore it doesn't share any memory with other VUs.
1000VUs uploading 26MB file need as much as 81GB of RAM since each VU holds the copy of the file in memory.

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

- k6 does not provide a `test coordinator` or `master instance` to coordinate the distributed execution of the test. Alternatively, you can use the [k6 REST API](/misc/k6-rest-api) and [--paused](/using-k6/k6-options/reference#paused) to synchronize the multiple k6 instances' execution.
- Each k6 instance evaluates [Thresholds](/using-k6/thresholds) independently - excluding the results of the other k6 instances. If you want to disable the threshold execution, use [--no-thresholds](/using-k6/k6-options/reference#no-thresholds).
- k6 reports the metrics individually for each instance. Depending on how you store the load test results, you'll have to aggregate some metrics to calculate them correctly.

With the limitations mentioned above, we built a [Kubernetes operator](https://github.com/k6io/operator) to distribute the load of a k6 test across a **k8s cluster**. Check out [this tutorial](https://k6.io/blog/running-distributed-tests-on-k8s/) for further instructions.

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
