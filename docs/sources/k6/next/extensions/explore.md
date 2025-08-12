---
title: 'Explore extensions'
menuTitle: 'Explore extensions'
description: 'Explore the k6 extension ecosystem to find extensions that meet your requirements.'
weight: 01
---

# Explore extensions

## Supported by automatic extension resolution

These extensions can be used in your test without any additional configuration. They are automatically resolved and loaded by k6 when you [import them in your test script](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#using-automatic-extension-loading).

We have two categories of extensions:

| Category      | Maintainer                      | Audited | Cloud support |
| ------------- | ----------------------------------- | ------- | ------------- |
| **Official**  | Grafana Labs                 | ✅ Yes   | ✅ Yes         |
| **Community** | Community  | ✅ Yes   | ⚠️ Partial\*  |

\* *Partial* means that they can be used in the CLI with the `--local-execution` mode. Also, on Private Load Zones if a custom image is build. They don't work on Grafana Cloud k6 Public Load Zones.

### Official extensions

TBD

### Community extensions

{{< admonition type="note" >}}

We are working on process for community folks to submit their extensions to be included here.

{{< /admonition >}}

TBD

## Require building a custom k6 binary

### Your own extensions
TBD

### More community extensions
{{< admonition type="caution" >}}

The extensions is this category are not maintained nor audited by Grafana Labs.

{{< /admonition >}}

Many other extensions, maintained by members of the k6 community are available in [GitHub](https://github.com/topics/xk6).