---
title: 'About'
heading: 'xk6-disruptor Documentation'
head_title: 'xk6-disruptor Documentation'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to test system reliability under turbulent conditions.'
---

[xk6-disruptor](https://github.com/grafana/xk6-disruptor) is an extension that adds fault injection capabilities to k6. It implements the principles of the Chaos Engineering discipline to test the reliability of our applications under turbulent conditions such as delays and response errors.

Key features include:

- Everything as code. Facilitate test reuse and collaboration between teams without learning a new DSL.
- Fast to adopt with no day-two surprises. [No need to deploy and maintain](/javascript-api/xk6-disruptor/explanations/how-xk6-disruptor-works/) a fleet of agents or operators.
- Easy to extend and integrate with other types of k6 tests. No need to try to glue multiple tools together to get the job done.

## Capabilities

Currently, the disruptor is intended to test applications running in Kubernetes. Other platforms are not supported at this time.

It provides a Javascript API to inject different [faults](/javascript-api/xk6-disruptor/api/faults/) in HTTP and gRPC requests, such as errors and delays, into the selected Kubernetes [Pods](/javascript-api/xk6-disruptor/api/poddisruptor) or [Services](/javascript-api/xk6-disruptor/api/servicedisruptor).

Other types of faults and disruptors will be introduced in the future. The [Roadmap](https://github.com/grafana/xk6-disruptor/blob/main/ROADMAP.md) presents the project's goals for the coming months regarding new functionalities and enhancements.


## Use cases

The disruptor lets you test the resiliency of distributed applications by introducing errors in the requests served by your services.

The disruptor does not try to reproduce root causes, such as failed application instances or degraded computing or network resources. 
It focuses on reproducing the side effects of such failures, so you can focus on understanding the propagation of errors between internal and public services and improving the error handling in your application. 

This way, the disruptor makes reliability tests repeatable and predictable while limiting their blast radius. 
These are essentials to test applications deployed on shared infrastructures such as pre-production and testing environments.

Common use cases are:
- Test resilient policies such as backoff, timeouts, retries, etc.
- Test the fallback functionality when internal failures arise.
- Test SLOs under common internal failures.
- Test application performance when experiencing delays.
- Add fault injection to existing performance tests.

## Learn more

Lear more about [Fault injection](https://k6.io/blog/democratize-chaos-testing/) and [Building Resilience early in the development cycle](https://k6.io/blog/building-resilience-early-in-the-development-cycle/).

Check the [first steps](/javascript-api/xk6-disruptor/get-started/first-steps) to get started with the disruptor.

Follow the [examples of injecting faults in different scenarios](/javascript-api/xk6-disruptor/examples/).

Visit the [interactive demo environment in Killercoda](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda) and try the disruptor in a demo application without having to do any setup.

## Contributing

For any unexpected behavior, please search the [GitHub issues](https://github.com/grafana/xk6-disruptor/issues) first.

And if you are interested in contributing to the development of this project, check the [contributing guide](https://github.com/grafana/xk6-disruptor/blob/main/docs/01-development/01-contributing.md).


