---
title: 'PingDetail'
description: 'Detailed information about ping results'
weight: 40
---

# PingDetail

Data you receive as a parameter in the ping callback.

## Properties

| Property | Type | Description |
| :------- | :--- | :---------- |
| alive | boolean | Indicates whether the target is reachable (if an echo reply was received). |
| target | string | Hostname or IP address that was pinged. |
| target_ip | string | Target IP address that was pinged. |
| target_ip_version | [IP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ip) | Target IP version that was used for the ping request. Valid values are `"ip4"` and `"ip6"`. |
| sent_at | number | Timestamp when the request was sent. Value is in UTC milliseconds since the Unix epoch. |
| received_at | number | Timestamp when the response was received. Value is in UTC milliseconds since the Unix epoch. |
| ttl | number | Time to live from the echo reply, if a response was received. |
| id | number | Identifier for the ICMP session from the echo reply, if a response was received. |
| seq | number | Sequence number for the ICMP echo request from the echo reply, if a response was received. |
| size | number | Size of the ICMP echo reply, if a response was received. |
| options | [PingOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ping-options) | Ping options used for the request. |

## PingCallback

Callback function for ping results. This function is called for every echo packet sent. If the deadline is exceeded, it is not called for the remaining packets. If the echo response has been received, the error value will be null, otherwise it contains the error.

### Signature

<!-- md-k6:skipall -->

```javascript
(err, data) => void
```

### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| err | Error \| null | Error object if an error occurred, otherwise `null`. |
| data | PingDetail | Data about the ping attempt, including timing and echo details. |
