---
title: 'API'
excerpt: 'An overview of the API for xk6-disruptor.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/xk6-disruptor/
---

The xk6-disruptor API is organized around _disruptors_ that affect specific targets such as pods or services. These disruptors can inject different types of [faults](/javascript-api/xk6-disruptor/api/faults) on their targets.

| Class | Description |
| ----- | ----------- |
| [PodDisruptor](/javascript-api/xk6-disruptor/api/poddisruptor) | Targets the  Pods that match selection attributes such as labels.|
| [ServiceDisruptor](/javascript-api/xk6-disruptor/api/servicedisruptor) | Targets the Pods that back a Kubernetes Service |