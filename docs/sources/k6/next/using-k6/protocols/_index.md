---
title: 'Protocols'
description: 'Out of the box k6 comes with support for a few protocols: HTTP / WebSockets / gRPC / ...'
weight: 10
---

# Protocols

Out of the box, k6 supports the following protocols:

- HTTP/1.1
- [HTTP/2](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/http-2)
- [WebSockets](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/websockets)
- [gRPC](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/grpc)

You can use k6 on more protocols with xk6.

## Upgrade to HTTP/2 is automatic

By default, k6 uses HTTP/1.1 when it contacts a server.
If the server reports to k6 that it supports [HTTP/2](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/http-2), k6 upgrades the connection to HTTP/2 instead.

This is all automatic:
you don't need to do anything special for either the initial use of HTTP/1.1 or the potential protocol upgrade.
However, you might want to verify which protocol is actually being
used for a transaction.
This verification requires an extra step.

Using [WebSockets](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/websockets) is a bit different, for both the test structure and the VU lifecycle.

## Extend protocol support with xk6

xk6 is a separate CLI tool that lets you build custom k6 binaries.
Community contributors have already added support for additional protocols,
with extensions for SQL, Kafka, ZeroMQ, Redis, and more.
Refer to the [full list of extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore) and find the ones you want to build. Then follow the [xk6 guide](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-go).

You can build your own extension, too.
See the [tutorials](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create) to get started.
