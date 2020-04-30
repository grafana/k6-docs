---
title: "Hardware-sizing for large-scale k6 tests"
excerpt: "How to run large-scale k6 tests without distributed-execution"
---

This document explains how to launch a large-scale k6 test on a single machine without the need of distributed execution. 

The common misconception of many load-testers is that distributed-execution (ability to launch a load test on multiple machines) is required to generate large load. This is not the case with k6.

k6 is different from many other load-testing tools in a way it handles hardware resources. A single k6 process will efficiently use all CPU cores on a load-generator machine.
Single instance of k6 is often enough to generate load of 30.000-40.000 simultaneus users (VUs). This amount of VUs can generate upwards of 300.000 requests per second (RPS). 

Unless you need more than 100.000-300.000 requests per second (6-12M requests per minute), a single instance of k6 will likely be sufficient for your needs.

Below we will explore what hardware is needed for generating different levels of load.


## OS fine-tuning for maximum performance

For the purpose of this demonstration, we are using a Linix (Ubuntu Server) machine. The instructions will be the same for any Linux distribution. 

The following configuration changes are required to allow the k6 instance to use the full network capacity of the server.
Detailed information about these settings can be found in our [OS Fine tuning article](/misc/fine-tuning-os).

<div class="code-group" data-props='{}'>

```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```

</div>

For quick testing, you can paste these commands in the root terminal window. To make these changes permanent, refer to the instructions of your Linux distribution.

## Hardware considerations

### Network
Network throughput of the machine is an important consideration when running large tests. 
Many AWS EC2 machines come with 1Gbit/s connection which may limit the amount of load k6 can generate.

When running the test, you can use `iftop` in the terminal to view in real time the amount of network traffic generated.
If the traffic is constant at 1Gbit/s, your test is probably limited by the network card. Consider upgrading to a different EC2 instance.

### CPU
Unlike many other load testing tools, k6 is heavily multithreaded. It will effectively use all available CPU cores.

The amount of CPU you need depends on your test files (sometimes called test script). 
Regardless of the test file, you can assume that large tests require significant amount of CPU power. 
We recommend that you size the machine to have at least 20% idle cycles (up to 80% used by k6, 20% idle). 
If k6 uses 100% to generate load, it won't have enough CPU to measure the responses correctly. 
This may cause the result metrics to have much larger response time than in reality.

### Memory
k6 likes memory, but [it isn't as greedy as other load testing tools](https://k6.io/blog/comparing-best-open-source-load-testing-tools#memory-usage). 
Memory consumption heavily depend on your test scenarios. To estimate the memory requirement of your test, 
run the test on your laptop with 100VUs and multiply the consumed memory by the target number of VUs. 

Simple tests will use ~1-5MB per VU. (1000VUs = 1-5GB). 
Tests that are using file-uploads can consume tens of megabytes per VU.

## General advice for running large tests.

### Make your test code resilient

When running large stress tests, your script can't assume anything about the HTTP response. 
Often performance tests are written with a "happy path" in mind.
For example, a "happy path" check like the one below is something that we see in k6 often.

<div class="code-group" data-props='{"lineNumbers": [false]}'>

```javascript
let checkRes = check(res, {
    "Homepage body size is 11026 bytes": (r) => r.body.length === 11026,
});
```

</div>

Code like this runs fine when the system under test (SUT) is not overloaded and returns proper responses.
When the system starts to fail, the above check won't work as expected. 

The issue here is that the check assumes that there's  always a body in a response. The `r.body` may not exist if server is failing.
In such case the check itself won't work as expected and error similar to the one below will be returned: 

<div class="code-group" data-props='{}'>

```
ERRO[0625] TypeError: Cannot read property 'length' of undefined
```

</div> 

To fix this issue your checks must be resilient to any response type. This change will fix the above problem.

<div class="code-group" data-props='{"labels": ["fragile check"]}'>

```javascript
let checkRes = check(res, {
    "Homepage body size is 11026 bytes": (r) => r.status === 200 && r.body && r.body.length === 11026
});
```

</div>

### Monitor the load-generator server

If you are running a test for the first time, it's a good idea to keep an eye on the available resources while the test is running.
The easiest way to do so is to ssh to the server with 3 sessions:
1. To run k6 
2. To monitor CPU and memory
3. To monitor the network

For monitoring CPU and memory we recommend [htop](https://en.wikipedia.org/wiki/Htop). 
For monitoring network, we recommend [iftop](https://en.wikipedia.org/wiki/Iftop)

Here's a screenshot of 3 terminal sessions showing k6, iftop and htop.
![k6 iftop htop](./images/large-scale-testing-3-terminals.png)


## Additional k6 flags to achieve better performance

### --compatibility-mode=base

If you are pushing the limits of the hardware, this is the most impactful k6 setting you can enable.

This setting disables the internal babel transpilation from ES6 to ES5 and inclusion of corejs library.

<div class="doc-blockquote" data-props='{}'>

> ### Some background
> k6 at its core executes ECMAScript 5.1 code. Most k6 script examples and documentation is written in ECMAScript 6+. 
> When k6 gets ES6+ code as input, it transpiles it to ES5.1 using babel and loads corejs to enable commonly used APIs.
> This works very well for 99% of use cases, but it adds significant overheard with large tests.

</div>

To get the best performance out of k6, it's best to transpile the scripts outside of k6 using webpack.

In this repository we have prepared an efficient transpilation scheme that produces performant ES5.1 code for k6. 

Use it like this:

<div class="code-group">

```bash
git clone https://github.com/loadimpact/k6-hardware-benchmark/
cd k6-hardware-benchmark
yarn install
yarn run to-es5 someplace/yourscript.js
# your ES5 script is in someplace/yourscript.es5.js
```
</div>


Once your code is transpiled, run it like this:

<div class="code-group">

```bash
k6 run -o cloud --compatibility-mode=base someplace/yourscript.es5.js
```
</div>

k6 will use about 50% of memory in comparison to running the original script. It will also reduce the CPU load. 

### discardResponseBodies

You can tell k6 to not process the body of the response by setting `discardResponseBodies` in the options object like this:

<div class="code-group">

```js
export let options = {
	discardResponseBodies: true,
};
```
</div>

k6 by default loads the response body of the request into memory. This causes much higher memory consumption, and often is completely unnecessary.

### --no-thresholds --no-summary 

If you are running a cloud test with local execution (`k6 run -o cloud`), you may want to disable the terminal summary 
and local threshold calculation because thresholds and summary will be displayed in the cloud. 
This will save you some memory and CPU cycles.

Here are all the mentioned flags, all in one:

<div class="code-group">

```bash
k6 run -o cloud --vus=20000 --duration=10m --compatibility-mode=base --no-thresholds --no-summary scripts/website.es5.js
```

</div>

### Remove unnecessary checks, groups and custom metrics

If everything else has failed and you are trying to squeeze more performance out of the hardware, 
you can consider optimizing the code of the load test itself.

*Checks and groups*
k6 records the result of every individual check and group separately. If you are using many checks and groups, you may consider removing them to boost performance.

*Custom metrics*
Similar to checks, values for custom metrics (Trend, Counter, Gauge and Rate) are recorded separately. Consider minimizing the usage of custom metrics.

*Thresholds with abortOnFail*
If you have configured [abortOnFail thresholds](https://k6.io/docs/using-k6/thresholds#aborting-a-test-when-a-threshold-is-crossed), k6 needs to evaluate the result constantly to verify that the threshold wasn't crossed. Consider removing this setting.



## File upload testing
Special considerations must be taken when testing file-uploads. 

##### Network throughput
The network throughput of the load-generator machine, as well as the SUT will likely be the bottleneck. 

##### Memory
k6 needs significant amount of memory when uploading files, as every VU is independent and has its own memory.

##### Data transfer costs
k6 can upload a large amount data in a very short period of time. Make sure you understand the data transfer costs before commencing a large scale test.

[Outbound Data Transfer is expensive in AWS EC2](https://www.cloudmanagementinsider.com/data-transfer-costs-everything-you-need-to-know/). The price ranges between $0.08 to $0.20 per GB depending on the region. 
If you use the cheapest region the cost is about $0.08 per GB. Uploading 1TB therefore costs about $80. Long running test can cost several hundreds of dollars in data transfer alone.

##### EC2 costs
The AWS EC2 instances are relatively cheap. Even the largest instance we have used in this benchmark (m5.24xlarge) costs only $4.6 per hour. Make sure to turn off the load-gen servers once you are done with your testing. Forgotten EC2 server will cost $3312 per month.  
Tip: it's often possible to launch "spot instances" of the same hardware for 10-20% of the cost. 

## Errors

If you run into errors during the execution, it's good to understand if they were caused by the load-generator or by the failing SUT. 

### read: connection reset by peer

Error similar to this one is caused by the target system resetting the TCP connection. This happens when the Load balancer or the server itself isn't able to handle the traffic.

<div class="code-group">

```text
WARN[0013] Request Failed       error="Get http://test.k6.io: read tcp 172.31.72.209:35288->63.32.205.136:80: read: connection reset by peer"
```

</div>

### context deadline exceeded

Error like this happens when k6 was able to send a request, but the target system didn't respond in time. The default timeout in k6 is 60 seconds. If your system doesn't produce the response in this timeframe, this error will appear.

<div class="code-group">

```
WARN[0064] Request Failed    error="Get http://test.k6.io: context deadline exceeded"
```

</div>

### dial tcp 52.18.24.222:80: i/o timeout

This is a similar error to the one above, but in this case k6 wasn't even able to make a request. The target system isn't able to establish a connection.


<div class="code-group">

```
WARN[0057] Request Failed     error="Get http://pawel.staging.loadimpact.com/static/logo.svg?url=v3: dial tcp 52.18.24.222:80: i/o timeout"
```

</div>

### socket: too many open files

This error means that the load-generator machine isn't able to open TCP sockets because it reached the limit of open file descriptors.
Make sure that your limit is set sufficiently high `ulimit -n 250000` should be enough for anyone :tm:

<div class="code-group">

```
WARN[0034] Request Failed     error="Get http://99.81.83.131/static/logo.svg?ip=6: dial tcp 99.81.83.131:80: socket: too many open files"
```

</div>


Note: you should decide what level of errors is acceptable. At large scale some errors are always present.
If you make 50M requests with 100 failures, this is generally a good result (0.00002% errors).

# Benchmarking k6 on AWS hardware

## Real-life test of a website.

Setup:
- All tests were executed on AWS EC2 instances
- The "discardResponseBodies" recommendation was NOT used. (results would be better with this setting).
- Scripts used for testing are available in the `/scripts` directory. The results are reproducible
- k6 v0.26.2 was used 
- Note: the target system (test.k6.io) was running on a large cluster to boost performance. 
- NOTE: the target system (test.k6.io) is a slow-ish PHP website, not optimized for performance - a static website would be much quicker.

The "website.js" test file uses a wide range of k6 features to make the test emulate a real usage of k6. This is not a test rigged for performance - quite the opposite.
This test uses plenty of custom metrics, checks, parametrization, batches, thresholds and groups. It's a heavy test that should represent well the "real life" use case.

### AWS m5.large server

The `m5.large` instance has 8GB of RAM and 2 CPU cores. 

The following command was used to execute the test
<div class="code-group">

```
k6 run -o cloud --vus=6000 --duration=10m --compatibility-mode=base --no-thresholds --no-summary -e TEST_NAME="AWS EC2 m5.large" scripts/website.es5.js
```

</div>


Results
- Maximum VUS reached: 6000
- Memory used: 6.09 GB  (out of 8.0)
- CPU load (avg): 1.49 (out of 2.0). 
- Peak RPS: ~6000 (note, this test was not optimized for RPS).
- 2x `sleep(5)` in each iteration.
 
https://app.k6.io/runs/720172

### AWS m5.4xlarge
The `m5.4xlarge` instance has 64GB of RAM and 16 CPU cores.
https://app.k6.io/runs/720179
<div class="code-group">

```
k6 run -o cloud --vus=20000 --duration=10m --compatibility-mode=base --no-thresholds --no-summary -e TEST_NAME="AWS EC2 m5.4xlarge website test" scripts/website.es5.js
```

</div>

Results
- Maximum VUS reached: 20.000
- Memory used: 20.1 GB  (out of 61.4)
- CPU load (avg): 8.5 (out of 16.0). 
- Peak RPS: ~20.000 (note, this test was not optimized for RPS).
- 2x `sleep(5)` in each iteration.


### AWS m5.24xlarge
The m5.24xlarge has 384GB of RAM and 96 CPU cores.
NOTE: sleep has been reduced to 1s instead of 5s to produce more requests.
<div class="code-group">

```
k6 run -o cloud --vus=30000 --duration=5m --compatibility-mode=base --no-thresholds --no-summary -e TEST_NAME="AWS EC2 m5.24xlarge website test" scripts/website.es5.js
```

</div>

Results
- Maximum VUS reached: 20.000
- Memory used: XXX GB  (out of 370 available)
- CPU load (avg): XXX (out of 96.0). 
- Peak RPS: ~61.500.
- `sleep(1)` in each iteration.

## Testing for RPS.

As stated at the beginning, k6 can produce a lot of requests very quickly, especially if the target system responds quickly.
Unfortunately our `test.k6.io` target system is rather slow PHP app. Nevertheless using 30k VUs we have reached 188.000 RPS. 
Much higher numbers are possible for faster systems.

### AWS m5.24xlarge
<div class="code-group">

```
k6 run -o cloud --vus=30000 --duration=1m --compatibility-mode=base --no-thresholds --no-summary -e TEST_NAME="AWS EC2 m5.24xlarge RPS test" scripts/RPS-optimized.es5.js
```

</div>


Results
- Maximum VUS reached: 30.000
- Memory used: 24 GB  (out of 370 available)
- CPU load (avg): 80 (out of 96.0). 
- Peak RPS: ~188.500.

https://app.k6.io/runs/720216

## Testing for data transfer

k6 can utilize the available network bandwidth when uploading files, but it needs plenty of memory to do so. 

Please read the warning about the cost of data transfer in AWS before commencing a large scale test.

### AWS m5.24xlarge

We have executed this test for only 1 minute to minimize the data-transfer costs. In 1 minute, k6 managed to transfer 36 GB of data with 1000 VUs. 
<div class="code-group">

```
k6 run -o cloud --vus=1000 --duration=1m --compatibility-mode=base --no-thresholds --no-summary -e TEST_NAME="AWS EC2 m5.24xlarge file upload" scripts/file-upload.es5.js
```

</div>


Results
- Maximum VUS reached: 1.000
- Memory used: 81 GB  (out of 370 available)
- CPU load (avg): 9 (out of 96.0). 
- Network throughput reached **4.7Gbit/s**
- Data transferred: 36GB.

Note: each VU in k6 is completely independent, and therefore it doesn't hare any memory with other VUs. 
1000VUs uploading 26MB file need as much as 81GB of RAM since each VU holds the copy of the file in memory. 

https://app.k6.io/runs/720228


## Summary

k6 is able to fully utilize CPU, memory and Network bandwidth available on any hardware we have tested it on. 
Single instance of k6 can run 30k+ VUs and produce 100k+ RPS. For the vast majority of systems, load coming from a single k6 process will be more than enough.
At the time of writing this article, distributed execution isn't implemented in k6, but this is not something that 