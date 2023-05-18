---
title: 'Welcome'
heading: 'xk6-disruptor Documentation'
head_title: 'xk6-disruptor Documentation'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to test system reliability under turbulent conditions.'
---

xk6-disruptor is a k6 extension that can inject faults into a system to simulate turbulent conditions. 

xk6-disruptor intends to help testers approach the discipline of "Chaos Engineering" with k6 way&mdash;providing the best developer experience as a primary objective. 

The extension offers an [API](/javascript-api/xk6-disruptor/api/) to create disruptors that target one specific type of component (for example, Pods).
These disruptors can inject different types of [faults](/javascript-api/xk6-disruptor/api/faults), such as errors in HTTP requests, served by that component.
Currently, disruptors exist for [Pods](/javascript-api/xk6-disruptor/api/poddisruptor) and [Services](/javascript-api/xk6-disruptor/api/servicedisruptor), but others will be introduced in the future, along with other types of faults for existing disruptors.

<Blockquote mod="note">

xk6-disruptor is intended for systems running in Kubernetes. Other platforms are not supported at this time.

</Blockquote>

## Use case for xk6-disruptor

The main use case for xk6-disruptor is to test how resilient an application is to diverse types of disruptions. xk6-disruptor can reproduce the effects of these disruptions, without having to reproduce their root causes.
For example, you can inject delays in the HTTP requests that an application makes to a service  without having to stress or interfere with the infrastructure (network, nodes) on which the service runs.

In this way, xk6-disruptor makes reliability tests repeatable, predictable, and with a limited blast radius.
These characteristics make it easier to incorporate such tests into the test suites of applications that deploy on shared infrastructures (such as staging environments).


<Blockquote mod="attention">

xk6-disruptor is in the alpha phase, undergoing active development. k6 doesn't guarantee API compatibility between releases.
Until this extension reaches v1.0 release, your k6 scripts may need to be updated on each release .

</Blockquote>

## Try out xk6-disruptor on our demo environment

We provide an [interactive demo environment in Killercoda](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda) which you can use to try xk6-disruptor right away without having to install Kubernetes on your local machine.

You can use this sandbox to try out xk6-disruptor and start writing fault injection on a microservices application right away.

## Install xk6-disruptor on your environment

1. Check the [requirements](/javascript-api/xk6-disruptor/get-started/requirements).

2. [Install](/javascript-api/xk6-disruptor/get-started/installation) the xk6-disrutor binary in your system.

3. Run the [Injecting HTTP faults to a Pod](/javascript-api/xk6-disruptor/examples/inject-http-faults-into-pod) example.