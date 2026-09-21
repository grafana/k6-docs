---
title: 'PingOptions'
description: 'Configuration options for ping operations'
weight: 30
---

# PingOptions

Options for configuring the ping operation.

## Properties

| Property | Type | Description |
| :------- | :--- | :---------- |
| id | number | Identifier for the ICMP session. It is a 16-bit unsigned integer. Default is a k6 process ID plus a VU ID modulo 65536. |
| seq | number | Starting sequence number for the ICMP echo request. It is a 16-bit unsigned integer. Default is a random value. |
| ttl | number | Time to live for the ping packets. This value is decremented by each router the packet passes through. |
| timeout | number \| string | Timeout for the single echo request and its response. The value is a number or string. The number value is in milliseconds, the string value contains the unit (for example, `2s`). If the timeout is exceeded, the callback will be invoked with an error and the result will be `false`. Default is `10s` (10 seconds). |
| deadline | number \| string | Deadline for the whole ping operation. The value is a number or string. The number value is in milliseconds, the string value contains the unit (for example, `2s`). The deadline includes all echo requests and their responses. If the deadline is exceeded, the callback will be invoked with an error and the result will be `false`. Default is no deadline. |
| count | number | Number of ping requests to send. Default is 1. If the count is set to a value greater than 1, the ping process will send multiple requests and returns `true` if at least `threshold` percent of the requests succeed. |
| threshold | number | Minimum percent of successful ping responses required for the ping operation to be considered successful. If this option is not set, the default is `100` (%). |
| size | number | Size of the data to include in the ping request, in bytes. If this option is not set, 56 bytes will be used (ping command default). |
| interval | number \| string | Interval between ping requests if `count` is set to a value greater than 1. The value is a number or string. The number value is in milliseconds, the string value contains the unit (for example, `2s`). Default is `1s` (1 second). A very low value can be used for DoS attacks, so the allowed minimum value can be configured via the `K6_PING_MINIMUM_INTERVAL` environment variable for safety. Default allowed minimum value is `500ms` (0.5 seconds). |
| source | string | Source IP address to use for the ping request. If not set, the system's default source address will be used. |
| preferred_ip_version | [IP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-icmp/ip) | Preferred IP protocol version to use for the ping request if the target is not an IPv4 or IPv6 address. Valid values are `"ip4"` and `"ip6"`. If not set, `"ip4"` protocol will be used. |
| tags | object | Optional tags for metrics and logging (key-value pairs). |
