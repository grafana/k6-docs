---
title: 'k6/x/mqtt'
description: 'k6 MQTT extension API'
weight: 11
---

# k6/x/mqtt

{{< docs/shared source="k6" lookup="official-extension.md" version="<K6_VERSION>" >}}

The `k6/x/mqtt` module adds first-class support for the [MQTT protocol](https://mqtt.org) to your load testing and performance scripts. With this extension, you can connect to MQTT brokers, publish and subscribe to topics, and interact with MQTT systems directly from your k6 tests.

The API is designed to feel familiar to users of [MQTT.js](https://github.com/mqttjs/MQTT.js), the popular JavaScript MQTT client. This means you can use event-driven programming, both synchronous and asynchronous operations, and migrate existing MQTT.js-based test logic with minimal changes.

## Key features

- Event-driven architecture with support for connection lifecycle events (`connect`, `message`, `end`, `reconnect`, `error`)
- Both synchronous and asynchronous methods for all operations (subscribe, publish, unsubscribe, end)
- Support for Quality of Service (QoS) levels: 0 (at most once), 1 (at least once), 2 (exactly once)
- Message retention and Last Will and Testament (LWT) support
- Multiple broker URL schemas: `mqtt://`, `mqtts://`, `tcp://`, `ssl://`, `tls://`, `ws://`, `wss://`
- SSL/TLS support using standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/)
- Automatic metrics collection for MQTT operations
- Support for binary payloads using ArrayBuffer
- Credentials provider for dynamic authentication

### Use cases

- Load testing MQTT brokers and IoT infrastructure
- Testing publish/subscribe patterns under high load
- Validating message delivery and QoS guarantees
- Simulating thousands of concurrent MQTT clients
- Testing MQTT-based microservices and event-driven architectures
- Monitoring MQTT broker performance and message throughput

## API

| Class/Type | Description |
| ---------- | ----------- |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client) | MQTT client for connecting to brokers and managing operations |
| [Client.connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/connect) | Connect to an MQTT broker |
| [Client.reconnect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/reconnect) | Reconnect to the broker |
| [Client.subscribe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/subscribe) | Subscribe to MQTT topics |
| [Client.subscribeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/subscribe-async) | Subscribe to topics asynchronously |
| [Client.unsubscribe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/unsubscribe) | Unsubscribe from topics |
| [Client.unsubscribeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/unsubscribe-async) | Unsubscribe from topics asynchronously |
| [Client.publish()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/publish) | Publish messages to MQTT topics |
| [Client.publishAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/publish-async) | Publish messages asynchronously |
| [Client.on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/on) | Register event handlers |
| [Client.end()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/end) | Disconnect from the MQTT broker |
| [Client.endAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/end-async) | Disconnect asynchronously |
| [QoS](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client#qos) | Quality of Service enumeration |

## Metrics

The extension automatically generates metrics for MQTT operations, allowing you to monitor performance:

- `mqtt_connects`: Counter tracking the number of connection attempts
- `mqtt_connect_duration`: Trend measuring connection time
- `mqtt_publishes`: Counter tracking the number of publish operations
- `mqtt_subscribes`: Counter tracking the number of subscribe operations
- `mqtt_messages_received`: Counter tracking received messages
- `mqtt_messages_sent`: Counter tracking sent messages

## Event-driven architecture

Unlike HTTP-based tests that continuously loop the main function, MQTT tests use an asynchronous event loop. Each VU creates an MQTT connection and registers event handlers. The VU remains active until the connection is closed.

When you call `client.connect()`, the `connect` event handler is immediately called. Inside this handler, you set up other event handlers and perform MQTT operations. The VU blocks until `client.end()` is called or the connection is closed by the broker.

## Examples

<!-- md-k6:skipall -->

### Hello World

Comparing HTTP-based tests to MQTT ones, you'll find differences in both structure and inner workings. The primary difference is that instead of continuously looping the main function (`export default function() { ... }`) over and over, each VU now runs an asynchronous event loop.

When the MQTT connection is created, the `connect` handler function is immediately called, all code inside it is executed (usually code to set up other event handlers), and then blocked until the MQTT connection is closed (by the remote host or by using `client.end()`).

```javascript
import { Client } from "k6/x/mqtt";

export default function () {
  const client = new Client()

  client.on("connect", async () => {
    console.log("Connected to MQTT broker")
    client.subscribe("greeting")
    client.publish("greeting", "Hello MQTT!")
  })

  client.on("message", (topic, message) => {
    const str = String.fromCharCode.apply(null, new Uint8Array(message))
    console.info("topic:", topic, "message:", str)
    client.end()
  })

  client.on("end", () => {
    console.log("Disconnected from MQTT broker")
  })

  client.connect(__ENV["MQTT_BROKER_ADDRESS"] || "mqtt://broker.emqx.io:1883")
}
```

### Async Programming

Async and event-based programming is fully supported. You can use [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout), [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval), and other async patterns with xk6-mqtt event handlers.

```javascript
import { Client } from "k6/x/mqtt";

export default function () {
  const client = new Client()

  client.on("connect", async () => {
    console.log("Connected to MQTT broker")
    await client.subscribeAsync("probe")

    const intervalId = setInterval(() => {
      client.publish("probe", "ping MQTT!")
    }, 1000)

    setTimeout(() => {
      clearInterval(intervalId)
      client.end()
    }, 3100)
  })

  client.on("message", (topic, message) => {
    console.info(String.fromCharCode.apply(null, new Uint8Array(message)))
  })

  client.on("end", () => {
    console.log("Disconnected from MQTT broker")
  })

  client.connect(__ENV["MQTT_BROKER_ADDRESS"] || "mqtt://broker.emqx.io:1883")
}
```
