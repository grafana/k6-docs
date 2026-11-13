---
title: Extensions
description: 'The k6 extension ecosystem enables developers and testers to extend k6 to cover use cases not supported natively in the core.'
weight: 700
---

# Extensions

With k6 extensions, you can extend the core k6 functionality with new features to support your specific reliability-testing needs.

If you maintain an extension and plan to upgrade it to k6 v2.4.0+, review the [Sobek conversion changes](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/go-js-bridge/#upgrade-extensions-to-k6-v240). Nil slices and nested pointers can produce different JavaScript values after the upgrade.

k6 supports four types of extensions:

- **JavaScript extensions** extend the JavaScript APIs available to your test scripts. They can add support for new network protocols, improve performance compared to equivalent JS libraries, or add features.
- **Output extensions** send metrics to a custom file format or service. They can add custom processing and dispatching methods.
- **Secret Source extensions** provide secrets to your tests.
- **Subcommand extensions** add custom CLI commands under the `k6 x` namespace for setup, validation, and integration tools.
