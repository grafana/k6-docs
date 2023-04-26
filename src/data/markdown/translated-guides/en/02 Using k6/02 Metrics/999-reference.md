---
title: Metrics reference
slug: '/using-k6/metrics/reference'
excerpt: Built-in k6 metrics for each protocol
---

Every k6 test emits built-in and custom metrics.
Each supported protocol also has its own metrics.

## Built-in metrics

The _built-in_ metrics output to `stdout` when you run the simplest possible k6 test:

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test-api.k6.io/');
}
```

</CodeGroup>

Running the preceding script outputs something like this:

<CodeGroup labels={["output"]} lineNumbers={[false]}>

```bash
$ k6 run script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: http_get.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m03.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m03.8s/10m0s  1/1 iters, 1 per VU

     data_received..................: 22 kB 5.7 kB/s
     data_sent......................: 742 B 198 B/s
     http_req_blocked...............: avg=1.05s    min=1.05s    med=1.05s    max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_req_connecting............: avg=334.26ms min=334.26ms med=334.26ms max=334.26ms p(90)=334.26ms p(95)=334.26ms
     http_req_duration..............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
       { expected_response:true }...: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_req_failed................: 0.00% ✓ 0        ✗ 1
     http_req_receiving.............: avg=112.41µs min=112.41µs med=112.41µs max=112.41µs p(90)=112.41µs p(95)=112.41µs
     http_req_sending...............: avg=294.48µs min=294.48µs med=294.48µs max=294.48µs p(90)=294.48µs p(95)=294.48µs
     http_req_tls_handshaking.......: avg=700.6ms  min=700.6ms  med=700.6ms  max=700.6ms  p(90)=700.6ms  p(95)=700.6ms
     http_req_waiting...............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_reqs......................: 1     0.266167/s
     iteration_duration.............: avg=3.75s    min=3.75s    med=3.75s    max=3.75s    p(90)=3.75s    p(95)=3.75s
     iterations.....................: 1     0.266167/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

</CodeGroup>

In that output, all the metrics that start with `http`, `iteration`, and `vu` are _built-in_ metrics, which get written to stdout at the end of a test.

k6 always collects the following built-in metrics:

| Metric Name        | Type    | Description                                                                                                                                                                                                                                                   |
|--------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vus                | Gauge   | Current number of active virtual users                                                                                                                                                                                                                        |
| vus_max            | Gauge   | Max possible number of virtual users (VU resources are pre-allocated, ensuring performance will not be affected when scaling up the load level)                                                                                                              |
| iterations         | Counter | The aggregate number of times the VUs executed the JS script (the `default` function).                                                                                                                                                                        |
| iteration_duration | Trend   | The time it took to complete one full iteration, including time spent in `setup` and `teardown`. To calculate the duration of the iteration's function for the specific scenario, [try this workaround](/using-k6/workaround-to-calculate-iteration_duration) |
| dropped_iterations | Counter | The number of iterations that weren't started due to lack of VUs (for the arrival-rate executors) or lack of time (expired maxDuration in the iteration-based executors). [About dropped iterations](/using-k6/scenarios/concepts/dropped-iterations/)                                                                             |
| data_received      | Counter | The amount of received data. [This example covers how to track data for an individual URL](/examples/track-transmitted-data-per-url).                                                                                                                         |
| data_sent          | Counter | The amount of data sent. [Track data for an individual URL](/examples/track-transmitted-data-per-url) to track data for an individual URL.                                                                                                                                   |
| checks             | Rate    | The rate of successful checks.                                                                                                                                                                                                                                |

## HTTP-specific built-in metrics

These metrics are generated only when the test makes HTTP requests.

<Blockquote mod="note" title="">

For all `http_req_*` metrics, **the timestamp is emitted the end of the request.**
In other words, the timestamp happens when k6 receives the end of the response body, or the request times out.

</Blockquote>

| Metric Name              | Type    | Description                                                                                                                                                                                                                                  |
|--------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| http_reqs                | Counter | How many total HTTP requests k6 generated.                                                                                                                                                                                                   |
| http_req_blocked         | Trend   | Time spent blocked (waiting for a free TCP connection slot) before initiating the request. `float`                                                                                                                                           |
| http_req_connecting      | Trend   | Time spent establishing TCP connection to the remote host. `float`                                                                                                                                                                           |
| http_req_tls_handshaking | Trend   | Time spent handshaking TLS session with remote host                                                                                                                                                                                          |
| http_req_sending         | Trend   | Time spent sending data to the remote host. `float`                                                                                                                                                                                          |
| http_req_waiting         | Trend   | Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). `float`                                                                                                                                           |
| http_req_receiving       | Trend   | Time spent receiving response data from the remote host. `float`                                                                                                                                                                             |
| http_req_duration        | Trend   | Total time for the request. It's equal to `http_req_sending + http_req_waiting + http_req_receiving` (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). `float` |
| http_req_failed          | Rate    | The rate of failed requests according to [setResponseCallback](/javascript-api/k6-http/setresponsecallback).                                                                                                                        |
|                          |         |                                                                                                                                                                                                                                              |

### Accessing HTTP timings from a script

To access the timing information from an individual HTTP request, the [Response.timings](/javascript-api/k6-http/response) object provides the time spent on the various phases in `ms`:

- blocked: equals to `http_req_blocked`.
- connecting: equals to `http_req_connecting`.
- tls_handshaking: equals to `http_req_tls_handshaking`.
- sending: equals to  `http_req_sending`.
- waiting: equals to `http_req_waiting`.
- receiving: equals to `http_req_receiving`.
- duration: equals to `http_req_duration`.

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('http://httpbin.test.k6.io');
  console.log('Response time was ' + String(res.timings.duration) + ' ms');
}
```

</CodeGroup>

The expected (partial) output looks like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  INFO[0001] Response time was 337.962473 ms               source=console
```

</CodeGroup>


## Built-in WebSocket metrics

`k6` emits the following metrics when interacting with a WebSocket service through the [`experimental`](/javascript-api/k6-experimental/websockets) or legacy websockets API.

| Metric name         | Type    | Description                                                                                                                |
| ------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| ws_connecting       | Trend   | Total duration for the WebSocket connection request.                                                                       |
| ws_session_duration | Trend   | Duration of the WebSocket session. Time between the start of the connection and the end of the VU execution.               |
| ws_sessions         | Counter | Total number of started WebSocket sessions.                                                                                |
| ws_ping             | Trend   | Duration between a ping request and its pong reception                                                                     |
| ws_msgs_sent        | Counter | Total number of messages sent through [Socket.send(data)](/javascript-api/k6-ws/socket/socket-send)                   |
| ws_msgs_received    | Counter | Total number of received messages [Socket.on('message', callback)](/javascript-api/k6-ws/socket/socket-on). |

## Built-in gRPC metrics

k6 emits the following metrics when it interacts with a service through the [`gRPC`](https://k6.io/docs/javascript-api/k6-net-grpc/) API.

| Metric Name         | Type  | Description                               |
|---------------------|-------|-------------------------------------------|
| `grpc_req_duration` | Trend | Time to receive response from remote host |

