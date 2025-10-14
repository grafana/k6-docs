---
title: 'Explore extensions'
menuTitle: 'Explore extensions'
description: 'Explore the k6 extension ecosystem to find extensions that fit your use cases.'
weight: 01
---

# Explore extensions

Extensions can be used to extend the core k6 features to fit your performance-testing use cases. There are two main categories of extensions: official and community.

## Official extensions

These are extensions owned and maintained by Grafana Labs, with support for a wide range of versions.

{{< docs/k6/official-extensions >}}

## Community extensions

These are extensions developed by the community, with support for specific versions.

{{< admonition type="note" >}}

We're working on a process for community folks to submit their extensions.

{{< /admonition >}}

{{< docs/shared source="k6" lookup="community-extensions.md" version="<K6_VERSION>" >}}

## Use extensions

There are two ways to use extensions when running a k6 test script.

### Automatic extension resolution

These extensions can be used in your test without any additional configuration. They are automatically resolved and loaded by k6 when you [import them in your test script](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#using-automatic-extension-loading).

### Custom k6 binary

If you have developed your own k6 extension or want to use an extension that's not available through automatic extension resolution, you have to build a custom k6 binary. The process involves using the xk6 tool to compile k6 with your desired extensions included. Custom binaries give you the flexibility to incorporate any extension from the k6 ecosystem.

Refer to [build a custom k6 binary guide](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/#use-extensions-with-a-custom-k6-binary) to learn how to create your own k6 binary with custom extensions.

{{< admonition type="caution" >}}

Many other extensions maintained by members of the k6 ecosystem are available in [GitHub](https://github.com/topics/xk6). These extensions aren't maintained nor audited by Grafana Labs.

{{< /admonition >}}
