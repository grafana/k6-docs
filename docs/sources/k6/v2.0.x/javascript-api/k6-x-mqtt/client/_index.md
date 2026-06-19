---
title: 'Client'
description: 'MQTT client for connecting to brokers and managing operations'
weight: 10
---

# Client

The `Client` class provides a high-level, event-driven interface for interacting with MQTT brokers. It supports both synchronous and asynchronous operations for connecting, subscribing, publishing, and unsubscribing.

## Constructor

<!-- md-k6:skipall -->

```javascript
new Client(options)
```

Creates a new MQTT client instance.

### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| options | object | Optional client configuration |
| options.client_id | string | Client identifier (must be unique per broker connection). If not provided, the broker assigns one. |
| options.username | string | Username for broker authentication |
| options.password | string | Password for broker authentication |
| options.credentials_provider | function | Function returning `{username, password}` for dynamic authentication |
| options.will | object | Last Will and Testament message configuration |
| options.will.topic | string | Topic for the will message |
| options.will.payload | string | Payload for the will message |
| options.will.qos | number | QoS level for the will message (0, 1, or 2) |
| options.will.retain | boolean | Whether the will message should be retained |
| options.tags | object | Custom tags for metrics (key-value pairs) |

## Properties

| Property | Type | Description |
| :------- | :--- | :---------- |
| connected | boolean | Read-only. Indicates if the client is currently connected to the broker. |

## QoS

Quality of Service enumeration for message delivery guarantees:

| Value | Name | Description |
| :---- | :--- | :---------- |
| 0 | QoS.AtMostOnce | Fire and forget. Message delivered at most once, no acknowledgment. |
| 1 | QoS.AtLeastOnce | Message delivered at least once, with acknowledgment. |
| 2 | QoS.ExactlyOnce | Message delivered exactly once, guaranteed and duplicate-free. |

## Methods

| Method | Description |
| :----- | :---------- |
| [connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/connect) | Connect to an MQTT broker |
| [reconnect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/reconnect) | Reconnect to the broker using previous parameters |
| [subscribe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/subscribe) | Subscribe to one or more topics |
| [subscribeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/subscribe-async) | Subscribe to topics asynchronously |
| [unsubscribe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/unsubscribe) | Unsubscribe from topics |
| [unsubscribeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/unsubscribe-async) | Unsubscribe from topics asynchronously |
| [publish()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/publish) | Publish a message to a topic |
| [publishAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/publish-async) | Publish a message asynchronously |
| [on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/on) | Register event handlers |
| [end()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/end) | Disconnect from the broker |
| [endAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-mqtt/client/end-async) | Disconnect from the broker asynchronously |

## Example

### Basic Usage

```javascript
import { Client } from "k6/x/mqtt";

export default function () {
  const client = new Client()

  client.on("connect", () => {
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
