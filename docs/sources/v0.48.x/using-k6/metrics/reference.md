---
title: Built-in metrics
excerpt: A reference of built-in metrics for different supported protocols.
weight: 000
---

# Built-in metrics

Every k6 test emits built-in and [custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics).
Each supported protocol also has its specific metrics.

## Standard built-in metrics

k6 always collects the following metrics, no matter what protocol the test uses:

| Metric Name        | Type    | Description                                                                                                                                                                                                                                                                   |
| ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vus                | Gauge   | Current number of active virtual users                                                                                                                                                                                                                                        |
| vus_max            | Gauge   | Max possible number of virtual users (VU resources are [pre-allocated](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/arrival-rate-vu-allocation), to avoid affecting performance when scaling up load )                                                                |
| iterations         | Counter | The aggregate number of times the VUs execute the JS script (the `default` function).                                                                                                                                                                                         |
| iteration_duration | Trend   | The time to complete one full iteration, including time spent in `setup` and `teardown`. To calculate the duration of the iteration's function for the specific scenario, [try this workaround](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/workaround-iteration-duration)              |
| dropped_iterations | Counter | The number of iterations that weren't started due to lack of VUs (for the arrival-rate executors) or lack of time (expired maxDuration in the iteration-based executors). [About dropped iterations](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/dropped-iterations) |
| data_received      | Counter | The amount of received data. [This example covers how to track data for an individual URL](https://grafana.com/docs/k6/<K6_VERSION>/examples/tracking-data-per).                                                                                                                 |
| data_sent          | Counter | The amount of data sent. [Track data for an individual URL](https://grafana.com/docs/k6/<K6_VERSION>/examples/tracking-data-per) to track data for an individual URL.                                                                                                            |
| checks             | Rate    | The rate of successful checks.                                                                                                                                                                                                                                                |

## HTTP-specific built-in metrics {#http}

These metrics are generated only when the test makes HTTP requests.

{{% admonition type="note" %}}

For all `http_req_*` metrics, **the timestamp is emitted the end of the request.**
In other words, the timestamp happens when k6 receives the end of the response body, or the request times out.

 {{% /admonition %}}

| Metric Name              | Type    | Description                                                                                                                                                                                                                                  |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| http_reqs                | Counter | How many total HTTP requests k6 generated.                                                                                                                                                                                                   |
| http_req_blocked         | Trend   | Time spent blocked (waiting for a free TCP connection slot) before initiating the request. `float`                                                                                                                                           |
| http_req_connecting      | Trend   | Time spent establishing TCP connection to the remote host. `float`                                                                                                                                                                           |
| http_req_tls_handshaking | Trend   | Time spent handshaking TLS session with remote host                                                                                                                                                                                          |
| http_req_sending         | Trend   | Time spent sending data to the remote host. `float`                                                                                                                                                                                          |
| http_req_waiting         | Trend   | Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). `float`                                                                                                                                           |
| http_req_receiving       | Trend   | Time spent receiving response data from the remote host. `float`                                                                                                                                                                             |
| http_req_duration        | Trend   | Total time for the request. It's equal to `http_req_sending + http_req_waiting + http_req_receiving` (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). `float` |
| http_req_failed          | Rate    | The rate of failed requests according to [setResponseCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback).                                                                                                       |

## Browser metrics {#browser}

The [k6 browser module](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser) emits its own metrics based on the [Core Web Vitals](https://web.dev/vitals/#core-web-vitals).

These core metrics will evolve over time when technology changes, but for now, k6 tracks the following core web vitals:

<!-- vale off -->

| Core Web Vital        | Description                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| browser_web_vital_lcp | Measures a page's loading performance. Please refer to [Largest Contentful Paint](https://web.dev/lcp/) for more information. |
| browser_web_vital_fid | Measures a page's interactivity. Please refer to [First Input Delay](https://web.dev/fid/) for more information.              |
| browser_web_vital_cls | Measures a page's visual stability. Please refer to [Cumulative Layout Shift](https://web.dev/cls/) for more information.     |

<!-- vale on -->

### Other Web Vitals

Apart from the Core Web Vitals, the browser module also reports [Other Web Vitals](https://web.dev/vitals/#other-web-vitals).

<!-- vale off -->

| Other Web Vital        | Description                                                                                                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| browser_web_vital_ttfb | Measures the time it takes between the browser request and the start of the response from a server. Please refer to [Time to First Byte](https://web.dev/ttfb/) for more information.                                |
| browser_web_vital_fcp  | Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header. Please refer to [First Contentful Paint](https://web.dev/fcp/) for more information. |
| browser_web_vital_inp  | An experimental metric that measures a page's responsiveness. Please refer to [Interaction to Next Paint](https://web.dev/inp/) for more information.                                                                |

<!-- vale on -->

## Built-in WebSocket metrics {#websockets}

`k6` emits the following metrics when interacting with a WebSocket service through the [`experimental`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets) or legacy websockets API.

| Metric name         | Type    | Description                                                                                                  |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| ws_connecting       | Trend   | Total duration for the WebSocket connection request.                                                         |
| ws_session_duration | Trend   | Duration of the WebSocket session. Time between the start of the connection and the end of the VU execution. |
| ws_sessions         | Counter | Total number of started WebSocket sessions.                                                                  |
| ws_ping             | Trend   | Duration between a ping request and its pong reception                                                       |
| ws_msgs_sent        | Counter | Total number of messages sent                                                                                |
| ws_msgs_received    | Counter | Total number of messages received                                                                            |

## Built-in gRPC metrics {#grpc}

k6 emits the following metrics when it interacts with a service through the [`gRPC`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/) API.

| Metric Name                  | Type    | Description                               |
| ---------------------------- | ------- | ----------------------------------------- |
| `grpc_req_duration`          | Trend   | Time to receive response from remote host |
| `grpc_streams`               | Counter | Total number of started streams           |
| `grpc_streams_msgs_sent`     | Counter | Total number of messages sent             |
| `grpc_streams_msgs_received` | Counter | Total number of messages received         |

{{% admonition type="note" %}}

Steams-related metrics (`grpc_streams*`) are available only when using the `k6/experimental/grpc` module which is available on `k6` version `0.45.0` or higher.

 {{% /admonition %}}
