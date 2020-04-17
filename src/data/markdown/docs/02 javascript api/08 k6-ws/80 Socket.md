---
title: "Socket"
---

`Socket` is a WebSocket client to interact with a WebSocket connection. You can use it to listen various events happening on the WebSocket connection and send messages to the server. Additionally, you can use socket.setTimeout() and socket.setInterval() to execute code in the background, or repeatedly, while the WebSocket connection is open.

| Method                                                                                                      | Description                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------     | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Socket.close()](/javascript-api/k6-ws/socket/socket-close)                                                 | Close the WebSocket connection.                                                                                                                           |
| [Socket.on(event, callback)](/javascript-api/k6-ws/socket/socket-on-event-callback)                         | Set up an event listener on the connection for any of the following events:<br />- open<br />- message<br />- ping<br />- pong<br />- close<br />- error. |
| [Socket.ping()](/javascript-api/k6-ws/socket/socket-ping)                                                   | Send a ping.                                                                                                                                              |
| [Socket.send(data)](/javascript-api/k6-ws/socket/socket-send-data)                                          | Send data.                                                                                                                                                |
| [Socket.setInterval(callback, interval)](/javascript-api/k6-ws/socket/socket-setinterval-callback-interval) | Call a function repeatedly at certain intervals, while the connection is open.                                                                            |
| [Socket.setTimeout(callback, period)](/javascript-api/k6-ws/socket/socket-settimeout-callback-delay)        | Call a function with a delay, if the connection is open.                                                                                                  |
