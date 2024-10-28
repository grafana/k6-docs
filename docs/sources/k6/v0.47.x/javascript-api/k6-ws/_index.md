---
title: 'k6/ws'
description: 'k6 WebSocket API'
weight: 12
---

# k6/ws

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

The ws module provides a [WebSocket](https://en.wikipedia.org/wiki/WebSocket) client implementing the [WebSocket protocol](http://www.rfc-editor.org/rfc/rfc6455.txt).

| Function                                                                                                  | Description                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [connect( url, params, callback )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/connect) | Create a WebSocket connection, and provides a [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket) client to interact with the service. The method blocks the test finalization until the connection is closed. |

| Class/Method                                                                                                                      | Description                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/params)                                                    | Used for setting various WebSocket connection parameters such as headers, cookie jar, compression, etc.                                                                        |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket)                                                    | WebSocket client used to interact with a WS connection.                                                                                                                        |
| [Socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close)                               | Close the WebSocket connection.                                                                                                                                                |
| [Socket.on(event, callback)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-on)                      | Set up an event listener on the connection for any of the following events:<br />- open<br />- binaryMessage<br />- message<br />- ping<br />- pong<br />- close<br />- error. |
| [Socket.ping()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-ping)                                 | Send a ping.                                                                                                                                                                   |
| [Socket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-send)                             | Send string data.                                                                                                                                                              |
| [Socket.sendBinary(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-sendbinary)                 | Send binary data.                                                                                                                                                              |
| [Socket.setInterval(callback, interval)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-setinterval) | Call a function repeatedly at certain intervals, while the connection is open.                                                                                                 |
| [Socket.setTimeout(callback, period)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-settimeout)     | Call a function with a delay, if the connection is open.                                                                                                                       |
