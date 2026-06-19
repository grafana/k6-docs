---
title: 'Client.subscribe( topic, [options] )'
description: 'Subscribe to MQTT topics'
weight: 31
---

# Client.subscribe()

Subscribe to topics synchronously.

## Signature

<!-- md-k6:skipall -->

```javascript
client.subscribe(topic, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| topic | string \| string[] | Topic or array of topics to subscribe to |
| options | object | Optional subscription configuration |
| options.qos | number | Quality of Service level (0, 1, or 2). Default: 0 |
| options.tags | object | Custom tags for metrics (key-value pairs) |
