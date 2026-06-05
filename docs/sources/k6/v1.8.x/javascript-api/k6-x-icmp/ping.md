---
title: 'ping( target, [options] )'
description: 'Send ICMP echo requests synchronously'
weight: 10
---

# ping( target, [options] )

Sends ICMP echo requests (pings) to the specified target.

## Signature

<!-- md-k6:skipall -->

```javascript
ping(target, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| target | string | Hostname or IP address to ping. |
| options | [PingOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ping-options) | Optional ping configuration options. |

## Returns

| Type | Description |
| :--- | :---------- |
| boolean | Returns `true` if the number of successful pings is greater than or equal to the threshold, otherwise `false`. |

## Example

<!-- md-k6:skipall -->

```javascript
import { ping } from "k6/x/icmp"

export default function () {
  const host = "8.8.8.8"

  console.log(`Pinging ${host}:`);

  if (ping(host)) {
    console.log(`Host ${host} is reachable`);
  } else {
    console.error(`Host ${host} is unreachable`);
  }
}
```
