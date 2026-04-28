---
title: 'Client.end( [options] )'
description: 'Disconnect from the MQTT broker'
weight: 61
---

# Client.end()

Disconnect from the broker synchronously. When the disconnection is complete, the `end` event is triggered.

## Signature

<!-- md-k6:skipall -->

```javascript
client.end(options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| options | object | Optional disconnect configuration |
| options.tags | object | Custom tags for metrics (key-value pairs) |
