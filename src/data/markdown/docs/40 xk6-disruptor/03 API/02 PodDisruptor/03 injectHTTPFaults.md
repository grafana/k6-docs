---
title: 'injectHTTPFaults()'
excerpt: 'xk6-disruptor: PodDisruptor.injectHTTPFaults method'
canonicalUrl: https://grafana.com/docs/k6
---

injectHTTPFaults injects HTTP faults in the requests served by a target Pod.

| Parameter | Type   | Description |
| --------- | ------ | ------- |
| fault     | object | description of the [http faults](/javascript-api/xk6-disruptor/api/faults/http) to be injected |
| duration  | string | duration of the disruption |
| options (optional)   | object | [options](#options) that control the injection of the fault |


## options

The injection of the fault is controlled by the following options:

| Option    | Type   | Description |
| --------- | ------ | -------- |
| proxyPort | number | port the agent will use to listen for requests in the target pods ( default `8000`) |

<Blockquote mod="note">

When injecting faults you may find the following error message during the test execution:

WARN\[0035\] Request Failed error="read tcp 172.18.0.1:43564->172.18.255.200:80: read: connection reset by peer"

This is normal and means that one request was "in transit" at the time the faults were injected, causing the request to fail from a network connection reset.

</Blockquote>

## Example

<!-- eslint-skip -->

```javascript
    const fault = {
        averageDelay: "50ms",
        errorCode: 500,
        errorRate: 0.1
    }
    disruptor.injectHTTPFaults(fault, "30s")
```