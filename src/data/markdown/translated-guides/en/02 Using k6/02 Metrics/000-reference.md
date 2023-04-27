---
title: Built-in metrics
slug: '/using-k6/metrics/reference'
excerpt: A reference of built-in metrics for different supported protocols.
---

Every k6 test emits built-in and custom metrics.
Each supported protocol also has its specific metrics.

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

