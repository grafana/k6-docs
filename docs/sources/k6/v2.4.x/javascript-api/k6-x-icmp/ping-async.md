---
title: 'pingAsync( target, [optsOrCallback], [callback] )'
description: 'Send ICMP echo requests asynchronously'
weight: 20
---

# pingAsync( target, [optsOrCallback], [callback] )

Sends ICMP echo requests (pings) to the specified target asynchronously.

## Signature

<!-- md-k6:skipall -->

```javascript
await pingAsync(target, optsOrCallback, callback)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| target | string | Hostname or IP address to ping. |
| optsOrCallback | [PingOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ping-options) \| [PingCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ping-detail#pingcallback) | Optional ping options or callback function. |
| callback | [PingCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ping-detail#pingcallback) | Optional callback function for ping results. |

## Returns

| Type | Description |
| :--- | :---------- |
| Promise\<boolean\> | Promise that resolves to `true` if the number of successful pings is greater than or equal to the threshold, otherwise `false`. |

## Example

<!-- md-k6:skipall -->

```javascript
import { pingAsync } from "k6/x/icmp"

export default async function () {
  const host = "8.8.8.8"

  console.log(`Pinging ${host} with callback:`);

  const opts = {
    timeout: 1000,
    retries: 2,
    count: 5
  };

  const result = await pingAsync(host, opts, (err, { target, sent_at, received_at, seq, ttl, size, options }) => {
    if (err) {
      console.error(`${target}: ${err}`);

      return
    }

    const rtt = received_at - sent_at;

    console.log(`${size} bytes from ${target}: icmp_seq=${seq} ttl=${ttl} time=${rtt} ms`);
  });

  if (result) {
    console.log(`Host ${host} is reachable`);
  } else {
    console.error(`Host ${host} is unreachable`);
  }
}
```
