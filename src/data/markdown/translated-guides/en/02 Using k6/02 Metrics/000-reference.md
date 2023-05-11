---
title: Built-in metrics
slug: '/using-k6/metrics/reference'
excerpt: A reference of built-in metrics for different supported protocols.
---

Every k6 test emits built-in and [Custom metrics](/using-k6/metrics/create-custom-metrics).
Each supported protocol also has its specific metrics.

## Standard built-in metrics.

k6 always collects the following metrics, no matter what protocol the test uses:

| Metric Name        | Type    | Description                                                                                                                                                                                                                                                   |
|--------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vus                | Gauge   | Current number of active virtual users                                                                                                                                                                                                                        |
| vus_max            | Gauge   | Max possible number of virtual users (VU resources are [pre-allocated](/using-k6/scenarios/concepts/arrival-rate-vu-allocation/), to avoid affecting performance when scaling up load )                                                                                                              |
| iterations         | Counter | The aggregate number of times the VUs execute the JS script (the `default` function).                                                                                                                                                                        |
| iteration_duration | Trend   | The time to complete one full iteration, including time spent in `setup` and `teardown`. To calculate the duration of the iteration's function for the specific scenario, [try this workaround](/using-k6/workaround-to-calculate-iteration_duration) |
| dropped_iterations | Counter | The number of iterations that weren't started due to lack of VUs (for the arrival-rate executors) or lack of time (expired maxDuration in the iteration-based executors). [About dropped iterations](/using-k6/scenarios/concepts/dropped-iterations/)                                                                             |
| data_received      | Counter | The amount of received data. [This example covers how to track data for an individual URL](/examples/track-transmitted-data-per-url).                                                                                                                         |
| data_sent          | Counter | The amount of data sent. [Track data for an individual URL](/examples/track-transmitted-data-per-url) to track data for an individual URL.                                                                                                                                   |
| checks             | Rate    | The rate of successful checks.

## HTTP-specific built-in metrics {#http}

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

## Browser metrics {#browser}

The [k6 browser module](/using-k6-browser) emits its own metrics based on the [Core Web Vitals](https://web.dev/vitals/#core-web-vitals).


These core metrics will evolve over time when technology changes, but for now, k6 tracks the following core web vitals:

| Core Web Vital                       |  Description                                                                                                 |
|--------------------------------      |--------------------------------------------------------------------------------------------------------------|
| webvital_largest_content_paint       | Measures a page's loading performance. Please refer to [Largest Contentful Paint](https://web.dev/lcp/) for more information. |
| webvital_first_input_delay           | Measures a page's interactivity. Please refer to [First Input Delay](https://web.dev/fid/) for more information.          |
| webvital_cumulative_layout_shift     | Measures a page's visual stability. Please refer to [Cumulative Layout Shift](https://web.dev/cls/) for more information.  |

### Other Web Vitals

Apart from the Core Web Vitals, the browser module also reports [Other Web Vitals](https://web.dev/vitals/#other-web-vitals).


| Other Web Vital                      |  Description                                                                                                 |
|--------------------------------      |--------------------------------------------------------------------------------------------------------------|
| webvital_time_to_first_byte          | Measures the time it takes between the browser request and the start of the response from a server. Please refer to [Time to First Byte](https://web.dev/ttfb/) for more information.|
| webvital_first_contentful_paint      | Measures the time it takes for the browser to render the first DOM element on the page, whether that's a text, image or header. Please refer to [First Contentful Paint](https://web.dev/fcp/) for more information.  |
| webvital_interaction_to_next_paint   | An experimental metric that measures a page's responsiveness. Please refer to [Interaction to Next Paint](https://web.dev/inp/) for more information.  |

### Legacy browser metrics

<Blockquote mod="note" title="">

  As of [k6 version 0.44.0](https://github.com/grafana/k6/releases/tag/v0.44.0), k6 now natively supports [Google's Core Web Vitals](https://web.dev/vitals/#core-web-vitals). In future releases, to align with recommended practices, we will remove the following browser metrics to focus on the web vital metrics. Please refer to [#831](https://github.com/grafana/xk6-browser/issues/831) for more information.

</Blockquote>

Apart from the usual HTTP specific metrics that k6 already tracks, the browser module tracks the following browser specific performance metrics on top:

| Metric Name                    |  Description                                                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|
| browser_dom_content_loaded     | Emitted when the page is loaded but scripts have just started to be executed.                                |
| browser_first_paint            | Emitted when the browser renders the first pixel on the page.                                                |
| browser_loaded                 | Emitted when the page is fully loaded.                                                                       |


## Built-in WebSocket metrics {#websockets}

`k6` emits the following metrics when interacting with a WebSocket service through the [`experimental`](/javascript-api/k6-experimental/websockets) or legacy websockets API.

| Metric name         | Type    | Description                                                                                                  |
|---------------------|---------|--------------------------------------------------------------------------------------------------------------|
| ws_connecting       | Trend   | Total duration for the WebSocket connection request.                                                         |
| ws_session_duration | Trend   | Duration of the WebSocket session. Time between the start of the connection and the end of the VU execution. |
| ws_sessions         | Counter | Total number of started WebSocket sessions.                                                                  |
| ws_ping             | Trend   | Duration between a ping request and its pong reception                                                       |
| ws_msgs_sent        | Counter | Total number of messages sent through [Socket.send(data)](/javascript-api/k6-ws/socket/socket-send)          |
| ws_msgs_received    | Counter | Total number of messages received                                                                            |

## Built-in gRPC metrics {#grpc}

k6 emits the following metrics when it interacts with a service through the [`gRPC`](https://k6.io/docs/javascript-api/k6-net-grpc/) API.

| Metric Name         | Type  | Description                               |
|---------------------|-------|-------------------------------------------|
| `grpc_req_duration` | Trend | Time to receive response from remote host |

