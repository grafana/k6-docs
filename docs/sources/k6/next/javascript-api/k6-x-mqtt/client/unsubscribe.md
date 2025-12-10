---
title: 'Client.unsubscribe( topics, [options] )'
description: 'Unsubscribe from MQTT topics'
weight: 33
---

# Client.unsubscribe()

Unsubscribe from topics synchronously.

## Signature

<!-- md-k6:skipall -->

```javascript
client.unsubscribe(topics, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| topics | string \| string[] | Topic or array of topics to unsubscribe from |
| options | object | Optional unsubscribe configuration |
| options.tags | object | Custom tags for metrics (key-value pairs) |
