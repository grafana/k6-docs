---
title: Extensions
description: 'The k6 extension ecosystem enables developers and testers to extend k6 to cover use cases not supported natively in the core.'
weight: 700
---

# Extensions

With k6 extensions, you can extend the core k6 functionality with new features to support your specific reliability-testing needs.

k6 supports three types of extensions:

- **JavaScript extensions** extend the JavaScript APIs available to your test scripts. Add support for new network protocols, improve performance compared to equivalent JS libraries, or add features.

- **Output extensions** send metrics to a custom file format or service. Add custom processing and dispatching.

- **Secret Source extensions** provide secrets to your tests.

## Use cases

The extensions ecosystem provides endless possibilities to expand the functionality for your k6 testing. Some reasons you might want to extend k6 include the following:

- **To add support for a new network protocol**

  For example, [xk6-dns](https://github.com/grafana/xk6-dns) lets users resolve DNS names to IP addresses in k6 scripts. With xk6-dns, you can assert the performance of custom DNS servers under load, and provide a way to resolve DNS names to IP addresses using a specific DNS server.

- **To incorporate a client library for test dependency**

  Everyone wants to run their services in Kubernetes these days. With [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes), your JavaScript tests can interface directly with Kubernetes resources using functionality typically restricted to kubectl. Prepare isolated Namespaces for each test run, or inject environment variables as ConfigMaps.

- **To format and send metrics to the output of your choice**

  Suppose your company has consolidated its observability metrics into Prometheus. Use [xk6-output-prometheus-remote](https://github.com/grafana/xk6-output-prometheus-remote) to publish your k6 test metrics to Prometheus as well!

- **To improve script performance and efficiency**

  Perhaps your company uses OpenTelemetry to trace service requests through layers of microservices. Using [xk6-distributed-tracing](https://github.com/grafana/xk6-distributed-tracing), you can update the HTTP client to link your test requests as the origin for your traces—no need to add JavaScript code to supply the required trace headers.
