---
title: 'SocketState'
description: 'Socket lifecycle state values'
weight: 50
---

# SocketState

`SocketState` describes the current lifecycle state of a socket.

## Values

| Value | Description |
| ----- | ----------- |
| `disconnected` | The socket exists but is not connected |
| `opening` | A connection attempt is in progress |
| `open` | The socket is connected and ready for I/O |
| `destroyed` | The socket has been closed permanently and cannot be reused |
