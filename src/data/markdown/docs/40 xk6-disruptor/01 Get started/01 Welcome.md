---
title: 'Welcome'
heading: 'xk6-disruptor Documentation'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to test system reliability under turbulent conditions. Think of it as unit testing, but for reliability.'
---

xk6-disruptor is a k6 extension that can inject faults into a system to simulate turbulent conditions. 

This project aims to aid developers in building reliable systems, implementing the goals of "Chaos Engineering" discipline in a k6 way - with the best developer experience as its primary objective. 

The extension offers an [API](/javascript-api/xk6-disruptor/api/) for creating disruptors that target one specific type of component (for example, Pods) and are capable of injecting different types of [faults](/javascript-api/xk6-disruptor/api/faults) such as errors in HTTP requests served by that component. Currently disruptors exist for [Pods](/javascript-api/xk6-disruptor/api/poddisruptor) and [Services](/javascript-api/xk6-disruptor/api/servicedisruptor), but others will be introduced in the future as well as additional types of faults for the existing disruptors.

<Blockquote mod="note">

xk6-disruptor is intended for systems running in kubernetes. Other platforms are not supported at this time.

</Blockquote>

<Blockquote mod="warning">

xk6-disruptor is in the alpha stage, undergoing active development. We do not guarantee API compatibility between releases - your k6 scripts may need to be updated on each release until this extension reaches v1.0 release.

</Blockquote>

## Use case for xk6-disruptor

The main use case for xk6-disruptor is to test the resiliency of an application of diverse types disruptions by reproducing their effects, but without having to reproduce their root-causes. For example, inject delays in the HTTP requests an application makes to a service  without having to stress or interfere with the infrastructure (network, nodes) on which the service runs, or affecting other workloads in unexpected ways.

In this way, xk6-disruptor make reliability tests repeatable, predictable and limits their blast-radius. These are important characteristic in order to incorporate this kind of tests in the test suits of applications deployed on shared infrastructures such as staging environments.


