---
title: 'Client.connect( url, [options] )'
description: 'Connect to an MQTT broker'
weight: 21
---

# Client.connect()

Establishes a connection to an MQTT broker. When the connection is successfully established, the `connect` event is triggered.

## Signature

<!-- md-k6:skipall -->

```javascript
client.connect(url, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| url | string | Broker URL (for example, `mqtt://broker.emqx.io:1883`) |
| options | object | Optional connection configuration |
| options.keepalive | number | Keep-alive interval in seconds (default: 60) |
| options.connect_timeout | number | Connection timeout in milliseconds (default: 30000) |
| options.clean_session | boolean | Whether to start with a clean session (default: true) |
| options.servers | string[] | Array of broker URLs for failover |
| options.tags | object | Custom tags for metrics (key-value pairs) |

## Supported broker URL schemas

| Schema | Description |
| :----- | :---------- |
| `mqtt://` | Plain TCP connection (no encryption) |
| `mqtts://` | Secure connection over SSL/TLS |
| `tcp://` | Alias for `mqtt://` |
| `ssl://` | Alias for `mqtts://` |
| `tls://` | Alias for `mqtts://` |
| `ws://` | MQTT over WebSocket |
| `wss://` | MQTT over secure WebSocket |

If the schema is omitted, `mqtt://` is used as the default.

## SSL/TLS configuration

The extension uses standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/) for all SSL/TLS settings. Configure certificates, verification, and other TLS-related options using k6's environment variables and configuration files.
