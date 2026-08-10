---
title: 'Client.unsubscribeAsync( topics, [options] )'
description: 'Unsubscribe from MQTT topics asynchronously'
weight: 34
---

# Client.unsubscribeAsync()

Unsubscribe from topics asynchronously.

## Signature

<!-- md-k6:skipall -->

```javascript
await client.unsubscribeAsync(topics, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| topics | string \| string[] | Topic or array of topics to unsubscribe from |
| options | object | Optional unsubscribe configuration |
| options.tags | object | Custom tags for metrics (key-value pairs) |

## Returns

A promise that resolves when the unsubscription is complete.
