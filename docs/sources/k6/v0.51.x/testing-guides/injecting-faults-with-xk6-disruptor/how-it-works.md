---
title: 'How xk6-disruptor works'
description: 'A brief description of the components of the xk6-disruptor and how they work when inject faults in a target system.'
weight: 05
aliases:
  - ./how--it-works/
---

# How xk6-disruptor works

xk6-disruptor consists of two main components:

- **The xk6-disruptor extension** provides a Javascript API for injecting faults into a target system using the xk6-disruptor-agent as a backend. This API is built around a collection of **disruptors**. Each disruptor targets a type of component in the system (for example Pods or cluster Nodes).
- **The xk6-disruptor-agent** injects faults into the target system where it runs. It is provided as an Docker image that you can pull from the [xk6-disruptor repository](https://github.com/grafana/xk6-disruptor/pkgs/container/xk6-disruptor-agent).

The xk6-disruptor extension installs the agent in the target and sends commands to inject the desired faults. How this happens depends on the type of disruptor, as described in the following sections.

## PodDisruptor

The following diagram shows how PodDisruptor works:

1. The PodDisruptor selects the target pods based on the selector attributes defined in the [constructor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/constructor)
2. The PodDisruptor attaches the xk6-disruptor-agent to each of the target pods
3. When a fault is injected (e.g. calling the [injectHTTTFault](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/injecthttpfaults)) the PodDisruptor sends a command to the agents to inject the fault in their respective pods

![How PodDisruptor works](/media/docs/k6-oss/xk6-disruptor-how-pod-disruptor-works.png)

## ServiceDisruptor

The ServiceDisruptor works as a wrapper around a PodDisruptor, which targets the pods that back the service.

1. The ServiceDisruptor uses the definition of the service specified in the [constructor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor/constructor) to create a pod selector that matches the pods that back the service.
2. The ServiceDisruptor creates a PodDisruptor using this pod selector.
3. The PodDisruptor installs the agent in the target pods.

From this point, the PodDisruptor works as described before.

![How ServiceDisruptor works](/media/docs/k6-oss/xk6-disruptor-how-service-disruptor-works.png)
