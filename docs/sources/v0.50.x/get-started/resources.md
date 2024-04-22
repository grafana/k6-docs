---
title: k6 resources
description: 'An overview of the k6 resources beyond the k6 docs: videos, repositories, test servers, courses, and more'
weight: 05
---

# k6 resources

The docs aim to cover everything necessary to use the core k6 products in your daily operational work.
But scripting and testing are skills that take time to learn.
What's more, k6 is an extensible tool, already incorporated with many other functionalities and protocols.

These resources help you write and run k6 tests in a safe environment and explore how to use k6 with other applications.

## Learning

- [Get started with k6 tutorial](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6). The getting started tutorial provides some procedures for common real-life uses of k6 and does not require prior knowledge of k6 or JavaScript

- [k6 Learn](https://github.com/grafana/k6-learn). A repository with a course and a ton of learning resources.
- [k6 OSS workshop](https://github.com/grafana/k6-oss-workshop). A 2-3 hour k6 workshop with practical k6 examples using the QuickPizza demo app.
- [k6 YouTube channel](https://www.youtube.com/playlist?list=PLDGkOdUX1UjrZM3lIHvFcKJxVgl2n4J65). Office hours, specific playlists, and other interesting videos from the community.
- [Awesome k6](https://github.com/grafana/awesome-k6). A list of awesome stuff about k6.
- [Examples](https://github.com/grafana/k6/tree/master/examples). A directory full of example k6 scripts for different use cases.

## Community

- [The k6 community forum](https://community.grafana.com/). Get support from the k6 team and community.
- [Get in touch](https://k6.io/community/#join-the-conversation). Slack, Meetup, Twitter, Stack Overflow, LinkedIn, and more.

## Test servers

If you need a place to learn k6 and test your scripts, you can use these playground/demo servers:

- [pizza.grafana.fun](https://pizza.grafana.fun/). A simple demo webapp. [grafana/quickpizza](https://github.com/grafana/quickpizza)
- [k6-http.grafana.fun](https://k6-http.grafana.fun). A simple HTTP Request & Response Service. [grafana/httpbin](https://github.com/grafana/httpbin)
- [grpcbin.test.k6.io](https://grpcbin.test.k6.io/). A simple gRPC Request & Response Service. [grafana/k6-grpcbin](https://github.com/grafana/k6-grpcbin)

Note that these are shared testing environments - please avoid high-load tests. Alternatively, you can deploy and host them on your infrastructure and run the examples in the repository.

## k6 + your favorite tool

- [Kubernetes Operator](https://k6.io/blog/running-distributed-tests-on-k8s/). Distribute test execution across a Kubernetes cluster.
- [xk6 extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions). Custom k6 binaries to support the tool you need.
- [The browser recorder](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-tests-from-recordings/using-the-browser-recorder). Make test scripts from browser sessions.
- [k6 TypeScript template](https://github.com/grafana/k6-template-typescript)
- [Integrations](https://grafana.com/docs/k6/<K6_VERSION>/misc/integrations)
