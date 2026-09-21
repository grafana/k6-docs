---
title: 'Client.endAsync( [options] )'
description: 'Disconnect from the MQTT broker asynchronously'
weight: 62
---

# Client.endAsync()

Disconnect from the broker asynchronously. Returns a promise that resolves when the disconnection is complete.

## Signature

<!-- md-k6:skipall -->

```javascript
await client.endAsync(options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| options | object | Optional disconnect configuration |
| options.tags | object | Custom tags for metrics (key-value pairs) |

## Returns

A promise that resolves when the client is successfully disconnected.
