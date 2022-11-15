---
title: 'Constructor'
excerpt: 'xk6-disruptor: PodDisruptor constructor'
---


The `PodDisruptor()` constructor creates a new instance of a [PodDisruptor](/javascript-api/xk6-disruptor/api/poddisruptor) class.


| Parameter | Description |
| --------- | ----------- |
| [selector](#selector) | criteria for selecting the target pods |
| [options](#options) | options for controlling the behavior of the disruptor |

### Selector

The `selector` defines the criteria a pod must satisfy in order to be a valid target:
| Attribute | Description |
| --------- | ----------- |
| namespace | namespace the selector will look for pods |
| select | [attributes](#pod-attributes) that a pod must match for being selected |
| exclude | [attributes](#pod-attributes) that if a pod matches, will be excluded (even if it matches the select attributes) |

The following attributes can be used for selecting or excluding pods:

### Pod attributes
| Attribute | Description |
| --------- | ----------- |
| labels    | map with the labels to be matched for selection/exclusion |

### Options
The `options` control the creation and behavior of the `PodDisruptor`:

| Attribute | Description |
| --------- | ----------- |
| injectTimeout | maximum time for waiting the disruptor to be ready in the target pods, in seconds (default 30s). Zero value forces default. Negative values force no waiting. |
