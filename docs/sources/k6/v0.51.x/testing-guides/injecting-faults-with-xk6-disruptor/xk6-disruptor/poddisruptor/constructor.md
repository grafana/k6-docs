---
aliases:
  - ../../../../javascript-api/xk6-disruptor/poddisruptor/constructor # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/poddisruptor/constructor
title: 'Constructor'
description: 'xk6-disruptor: PodDisruptor constructor'
weight: 100
---

# Constructor

The `PodDisruptor()` constructor creates a new instance of a [PodDisruptor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor) class.

| Parameter          | Type   | Description                                                       |
| ------------------ | ------ | ----------------------------------------------------------------- |
| selector           | object | [criteria](#selector) for selecting the target pods               |
| options (optional) | object | [options](#options) for controlling the behavior of the disruptor |

### Selector

The `selector` defines the criteria a pod must satisfy to be a valid target:

| Attribute | Type   | Description                                                                                 |
| --------- | ------ | ------------------------------------------------------------------------------------------- |
| namespace | string | namespace the selector will look for pods                                                   |
| select    | object | [attributes](#pod-attributes) that a pod must match to be selected                          |
| exclude   | object | [attributes](#pod-attributes) that exclude a pod (even if it matches the select attributes) |

You can use the following attributes to select or exclude pods:

### Pod attributes

| Attribute | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| labels    | object | map with the labels to be matched for selection or exclusion |

### Options

The `options` control the creation and behavior of the `PodDisruptor`:

| Attribute     | Type   | Description                                                                         |
| ------------- | ------ | ----------------------------------------------------------------------------------- |
| injectTimeout | string | maximum time to wait for the disruptor to be ready in the target pods (default 30s) |

## Example

<!-- eslint-skip -->

```javascript
const selector = {
  namespace: 'my-namespace',
  select: {
    labels: {
      app: 'my-app',
    },
  },
};
const podDisruptor = new PodDisruptor(selector);
```
