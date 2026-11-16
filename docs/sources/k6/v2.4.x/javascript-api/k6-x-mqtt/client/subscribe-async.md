---
title: 'Client.subscribeAsync( topic, [options] )'
description: 'Subscribe to MQTT topics asynchronously'
weight: 32
---

# Client.subscribeAsync()

Subscribe to topics asynchronously. Returns a promise that resolves when the subscription is complete.

## Signature

<!-- md-k6:skipall -->

```javascript
await client.subscribeAsync(topic, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| topic | string \| string[] | Topic or array of topics to subscribe to |
| options | object | Optional subscription configuration |
| options.qos | number | Quality of Service level (0, 1, or 2). Default: 0 |
| options.tags | object | Custom tags for metrics (key-value pairs) |

## Returns

A promise that resolves when the subscription is successfully completed.
