---
title: 'ConnectOptions'
description: 'Connection options for TCP sockets'
weight: 30
---

# ConnectOptions

`ConnectOptions` configures how a socket connects to a remote endpoint.

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `port` | number \| string | Destination port number |
| `host` | string | Destination host name or IP address. Defaults to `localhost` |
| `tls` | boolean | Enables TLS for the connection. Defaults to `false` |
| `tags` | object | Optional key-value pairs attached to connection metrics |

## Notes

- The `port` property accepts both `number` and `string`, just like the positional `connect()` and `connectAsync()` overloads.
- Set `tls: true` to enable TLS using standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/).
- If a tag key exists in both `SocketOptions.tags` and `ConnectOptions.tags`, the connect-level tag wins.
