---
title: 'Constructor'
excerpt: 'xk6-disruptor: ServiceDisruptor constructor'
---


The `ServiceDisruptor()` constructor creates a new instance of a [ServiceDisruptor](/javascript-api/xk6-disruptor/api/servicedisruptor) class.


| Parameter | Description |
| --------- | ----------- |
| service   | name of the service |
| namespace | namespace on which the service is defined |
| [options](#options) | options for controlling the behavior of the disruptor |


### Options

The following options control the creation and behavior of the `ServiceDisruptor`:

| Attribute | Description |
| --------- | ----------- |
| injectTimeout | maximum time for waiting the disruptor to be ready in the target pods, in seconds (default 30s). Zero value forces default. Negative values force no waiting. |

## Example

<!-- eslint-skip -->

```javascript
  const disruptor = new ServiceDisruptor('my-service', 'my-namespace');
```
