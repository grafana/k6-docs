---
title: 'SocketEvent'
description: 'Supported socket event names'
weight: 60
---

# SocketEvent

`SocketEvent` lists the event names supported by [Socket.on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/on).

## Values

| Value | Description |
| ----- | ----------- |
| `connect` | Fired when the socket finishes connecting |
| `data` | Fired when the socket receives data |
| `close` | Fired when the socket finishes closing |
| `error` | Fired when a socket operation fails |
| `timeout` | Fired when the socket is idle past the configured timeout |
