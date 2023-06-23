---
title: 'Welcome'
heading: 'xk6-disruptor Documentation'
head_title: 'xk6-disruptor Documentation'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to test system reliability under turbulent conditions.'
---

[xk6-disruptor](https://github.com/grafana/xk6-disruptor) is an extension that adds fault injection capabilities to k6. It implements the principles of the Chaos Engineering discipline to test the reliability of our applications under turbulent conditions such as latency delays and response errors.

## Why xk6-disruptor?

xk6-disruptor is designed and built to provide the best experience for developers trying to make their systems more reliable:

- Everything as code.
  - No need to learn a new DSL.
  - Developers can use their usual development IDE
  - Facilitate test reuse and sharing

- Fast to adopt with no day-two surprises. No need to deploy and maintain a fleet of agents or operators.

- Easy to extend and integrate with other [types of tests](https://k6.io/docs/test-types/introduction/). No need to try to glue multiple tools together to get the job done.

Also, this project has been built to be a good citizen in the Grafana k6 ecosystem by:

- Working well with other extensions.
- Working well with k6's core concepts and features.

You can check this out in the following example:

```javascript
export default function () {
    // Create a new pod disruptor with a selector
    // that matches pods from the "default" namespace with the label "app=my-app"
    const disruptor = new PodDisruptor({
        namespace: "default",
        select: { labels: { app: "my-app" } },
    });

    // Check that there is at least one target
    const targets = disruptor.targets();
    if (targets.length != 1) {
        throw new Error("expected list to have one target");
    }

    // Disrupt the targets by injecting HTTP faults into them for 30 seconds
    const fault = {
        averageDelay: 500,
        errorRate: 0.1,
        errorCode: 500
    }
    disruptor.injectHTTPFaults(fault, "30s")
}
```

## Features

The project, at this time, is intended to test systems running in Kubernetes. Other platforms are not supported at this time.

It offers an [API](/javascript-api/xk6-disruptor/api) for creating disruptors that target one specific type of the component (e.g., Pods) and is capable of injecting different kinds of [faults](/javascript-api/xk6-disruptor/api/faults), such as errors in HTTP requests served by that component. 
Currently, disruptors exist for [Pods](/javascript-api/xk6-disruptor/api/poddisruptor) and [Services](/javascript-api/xk6-disruptor/api/servicedisruptor), but others will be introduced in the future as well as additional types of faults for the existing disruptors.

## Use cases

The main use case for xk6-disruptor is to test the resiliency of an application of diverse types of disruptions by reproducing their effects without reproducing their root causes. For example, inject delays in the HTTP requests an application makes to a service without having to stress or interfere with the infrastructure (network, nodes) on which the service runs or affect other workloads in unexpected ways.

In this way, the disruptor makes reliability tests repeatable and predictable while limiting their blast radius. These are essential characteristics to incorporate these tests in the test suits of applications deployed on shared infrastructures such as staging environments.

## Learn more

Check the [requirements](/javascript-api/xk6-disruptor/requirements/), [installation](/javascript-api/xk6-disruptor/installation/), and [how to expose your application](/javascript-api/xk6-disruptor/expose-your-application/) to get started with the disruptor.

This documentation presents a few [examples of injecting faults in different scenarios](/javascript-api/xk6-disruptor/examples/).

Also, an [interactive demo environment in Killercoda](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda) is available to use the k6 disruptor right away. You can fail the services of a demo application without having to install Kubernetes on your local machine.

The [Roadmap](https://github.com/grafana/xk6-disruptor/blob/main/ROADMAP.md) presents the project's goals for the coming months regarding new functionalities and enhancements.

And if you are interested in contributing to the development of this project, check the [contributing guide](https://github.com/grafana/xk6-disruptor/blob/main/docs/01-development/01-contributing.md). For any unexpected behavior, please search the [GitHub issues](https://github.com/grafana/xk6-disruptor/issues) first. 

