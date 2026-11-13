---
title: 'Client.on( event, listener )'
description: 'Register event handlers for MQTT client events'
weight: 50
---

# Client.on()

The `on()` method registers event handlers for various MQTT client lifecycle and message events. All event handlers execute in the context of the k6 VU event loop.

## Signature

<!-- md-k6:skipall -->

```javascript
client.on(event, listener)
```

### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| event | string | Event name (`connect`, `message`, `end`, `reconnect`, `error`) |
| listener | function | Callback function to handle the event |

## Events

### connect

Triggered when the client successfully connects to the broker.

#### Signature

```javascript
client.on("connect", () => {
  // Connection established
})
```

### message

Triggered when a message is received on a subscribed topic.

#### Signature

```javascript
client.on("message", (topic, payload) => {
  // Handle received message
})
```

#### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| topic | string | The topic the message was received on |
| payload | ArrayBuffer | The message payload as binary data |

### end

Triggered when the client disconnects from the broker.

#### Signature

```javascript
client.on("end", () => {
  // Connection closed
})
```

### reconnect

Triggered when the client attempts to reconnect to the broker.

#### Signature

```javascript
client.on("reconnect", () => {
  // Reconnection attempt
})
```

### error

Triggered when an error occurs during any MQTT operation.

#### Signature

```javascript
client.on("error", (error) => {
  // Handle error
})
```

#### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| error | object | Error object |
| error.name | string | Always "MQTTError" |
| error.message | string | Error description |
| error.method | string | The method where the error occurred |
