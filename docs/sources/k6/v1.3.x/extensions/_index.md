---
title: Extensions
description: 'The k6 extension ecosystem enables developers and testers to extend k6 to cover use cases not supported natively in the core.'
weight: 700
---

# Extensions

With k6 extensions, you can extend the core k6 functionality with new features to support your specific reliability-testing needs.

k6 supports three types of extensions:

- **JavaScript extensions** extend the JavaScript APIs available to your test scripts. They can add support for new network protocols, improve performance compared to equivalent JS libraries, or add features.
- **Output extensions** send metrics to a custom file format or service. They can add custom processing and dispatching methods.
- **Secret Source extensions** provide secrets to your tests.
