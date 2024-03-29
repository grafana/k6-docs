---
title: Extensions
description: 'The k6 extension ecosystem enables developers and testers to extend k6 to cover use cases not supported natively in the core. Explore the endless possibilities of k6 and xk6.'
weight: 700
---

# Extensions

Expand the potential use cases for k6.

## Quickstart

<div class="nav-cards">
    <a href={{< relref "./explore" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>🔎 Explore</h4>
        <p>A list of more than 50 available extensions.</p>
    </a>
    <a href={{< relref "./build-k6-binary-using-go" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>🧩 Bundle</h4>
        <p>Combine multiple extensions into a custom k6 binary.</p>
    </a>
    <a href={{< relref "./create/" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>🏗️ Create</h4>
        <p>Learn how to make your own k6 extension.</p>
    </a>
</div>

## Custom k6 builds

With k6 extensions, you can create custom k6 binaries to support your specific reliability-testing needs.

Currently, k6 supports two ways to extend its native functionality:

- **JavaScript extensions** extend the JavaScript APIs available to your test scripts. Add support for new network protocols, improve performance compared to equivalent JS libraries, or add features.

- **Output extensions** send metrics to a custom file format or service. Add custom processing and dispatching.

## xk6 makes custom binaries

[xk6](https://github.com/grafana/xk6/) is command-line tool and framework written in Go. With xk6, you build custom k6 binaries that bundle one or more extensions written in Go. You have two options for creating k6 binaries: using [Go and xk6](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-go/) or [Docker](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-docker/):

{{< code >}}

```go-and-xk6
xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-prometheus-remote
```

```docker-in-linux
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-prometheus-remote
```

{{< /code >}}

<br/>

## Extension use cases

The extensions ecosystem provides endless possibilities to expand the functionality for your k6 testing. Some reasons you might want to extend k6 include the following:

- **To add support for a new network protocol**

  For example, [xk6-amqp](https://github.com/grafana/xk6-amqp) gives access to resources using the Advanced Message Queueing Protocol (AMQP). With xk6-amqp, your scripts can create message queues and seed messages for tests that include systems like RabbitMQ or ActiveMQ (among others).

- **To incorporate a client library for test dependency**

  Everyone wants to run their services in Kubernetes these days. With [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes), your JavaScript tests can interface directly with Kubernetes resources using functionality typically restricted to kubectl. Prepare isolated Namespaces for each test run, or inject environment variables as ConfigMaps.

- **To format and send metrics to the output of your choice**

  Suppose your company has consolidated its observability metrics into Prometheus. Use [xk6-output-prometheus-remote](https://github.com/grafana/xk6-output-prometheus-remote) to publish your k6 test metrics to Prometheus as well!

- **To improve script performance and efficiency**

  Perhaps your company uses OpenTelemetry to trace service requests through layers of microservices. Using [xk6-distributed-tracing](https://github.com/grafana/xk6-distributed-tracing), you can update the http client to link your test requests as the origin for your traces—no need to add JavaScript code to supply the required trace headers.

Next, [Explore the available extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore) to see how you can expand your use of k6 right now.
