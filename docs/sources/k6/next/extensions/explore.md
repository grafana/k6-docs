---
title: 'Explore extensions'
menuTitle: 'Explore extensions'
description: 'Explore the k6 extension ecosystem to find extensions that fit your use cases.'
weight: 01
---

# Explore extensions

## Supported by automatic extension resolution

These extensions can be used in your test without any additional configuration. They are automatically resolved and loaded by k6 when you [import them in your test script](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#using-automatic-extension-loading).

We have two categories of extensions:

| Category      | Maintainer   | Audited | Cloud support |
| ------------- | ------------ | ------- | ------------- |
| **Official**  | Grafana Labs | ✅ Yes  | ✅ Yes        |
| **Community** | Community    | ✅ Yes  | ⚠️ Partial\*  |

\* _Partial_ means that they can be used in the CLI with the `--local-execution` mode. Also, on Private Load Zones if a custom image is build. They don't work on Grafana Cloud k6 Public Load Zones.

### Official extensions

| Extension                                                                               | Description                                       | Versions                                 |
| --------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| [xk6-client-prometheus-remote](https://github.com/grafana/xk6-client-prometheus-remote) | Test Prometheus Remote Write-compatible endpoints | 0.3.2                                    |
| [xk6-faker](https://github.com/grafana/xk6-faker)                                       | Generate fake data in your tests                  | 0.4.0, 0.4.1, 0.4.2, 0.4.3, 0.4.4        |
| [xk6-loki](https://github.com/grafana/xk6-loki)                                         | Test Grafana Loki log ingestion endpoints         | 1.0.0, 1.0.1                             |
| [xk6-sql](https://github.com/grafana/xk6-sql)                                           | Test SQL servers                                  | 1.0.0, 1.0.1, 1.0.2, 1.0.3, 1.0.4, 1.0.5 |
| [xk6-sql-driver-mysql](https://github.com/grafana/xk6-sql-driver-mysql)                 | SQL driver for MySQL                              | 0.1.0, 0.2.0, 0.2.1                      |
| [xk6-sql-driver-postgres](https://github.com/grafana/xk6-sql-driver-postgres)           | SQL driver for Postgres                           | 0.1.0, 0.1.1                             |
| [xk6-ssh](https://github.com/grafana/xk6-ssh)                                           | Use SSH connections in your tests                 | 0.1.0, 0.1.1, 0.1.2, 0.1.3               |

### Community extensions

{{< admonition type="note" >}}

We are working on process for community folks to submit their extensions to be included here.

{{< /admonition >}}

| Extension                                                                         | Description                        | Versions       |
| --------------------------------------------------------------------------------- | ---------------------------------- | -------------- |
| [xk6-kafka](https://github.com/mostafa/xk6-kafka)                                 | Load test Apache Kafka             | 1.0.0          |
| [xk6-sql-driver-azuresql](https://github.com/grafana/xk6-sql-driver-azuresql)     | SQL driver for AzureSQL            | 0.1.0, 0.1.1   |
| [xk6-sql-driver-clickhouse](https://github.com/grafana/xk6-sql-driver-clickhouse) | SQL driver for Clickhouse          | 0.1.0, 0.1.1   |
| [xk6-sql-driver-sqlserver](https://github.com/grafana/xk6-sql-driver-sqlserver)   | SQL driver for SQLite3             | 0.1.0, 0.1.1   |
| [xk6-sse](https://github.com/phymbert/xk6-sse)                                    | Test with Server-Sent Events (SSE) | 0.1.10, 0.1.11 |

## Require building a custom k6 binary

### Your own extensions

If you have developed your own k6 extension or want to use an extension that's not available through automatic extension resolution, you'll need to build a custom k6 binary. This process involves using the xk6 tool to compile k6 with your desired extensions included. Custom binaries give you the flexibility to incorporate any extension from the k6 ecosystem.

Check out how to [build a custom k6 binary guide](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#using-extensions-that-require-building-a-custom-k6-binary) to learn how to create your own k6 binary with custom extensions.

### More ecosystem extensions

{{< admonition type="caution" >}}

The extensions in this category are not maintained nor audited by Grafana Labs.

{{< /admonition >}}

Many other extensions, maintained by members of the k6 ecosystem are available in [GitHub](https://github.com/topics/xk6).
