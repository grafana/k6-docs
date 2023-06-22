---
title: 'Welcome'
heading: 'xk6-disruptor Documentation'
head_title: 'xk6-disruptor Documentation'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to test system reliability under turbulent conditions.'
---

xk6-disruptor is an extension adds fault injection capabilities to [Grafana k6](https://github.com/grafana/k6). It implements the principles of Chaos Engineering discipline and enables Grafana k6 users to test their system's reliability under turbulent conditions.

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

```js
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

In this way, xk6-disruptor make reliability tests repeatable and predictable while limiting their blast radius. These are essential characteristics to incorporate these tests in the test suits of applications deployed on shared infrastructures such as staging environments.

## Learn more

Check the [get started guide](/javascript-api/xk6-disruptor/get-started) for instructions on how to install and use `xk6-disruptor`.

The [examples](/javascript-api/xk6-disruptor/examples/) section in the documentation presents examples of using xk6-disruptor for injecting faults in different scenarios.

The [Roadmap](https://github.com/grafana/xk6-disruptor/blob/main/ROADMAP.md) presents the project's goals for the coming months regarding new functionalities and enhancements.


## Try out xk6-disruptor 

### on our demo environment

We provide an [interactive demo environment in Killercoda](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda) which you can use to try xk6-disruptor right away without having to install Kubernetes on your local machine.

You can use this sandbox to try out xk6-disruptor and start writing fault injection on a microservices application right away.

### On your environment

1. Check the [requirements](/javascript-api/xk6-disruptor/get-started/requirements).

2. [Install](/javascript-api/xk6-disruptor/get-started/installation) the xk6-disruptor binary in your system.

## How to contribute

If you encounter any bugs or unexpected behavior, please search the [currently open GitHub issues](https://github.com/grafana/xk6-disruptor/issues) first, and create a new one if it doesn't exist yet.

If you are interested in contributing with the development of this project, check the [contributing guide](https://github.com/grafana/xk6-disruptor/blob/main/docs/01-development/01-contributing.md)