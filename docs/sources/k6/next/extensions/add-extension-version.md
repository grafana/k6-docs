---
title: Add a new version
description: Learn how to make a new version of your extension available in the k6 extension registry.
weight: 06
---

# Add a new version

When a new version is released, the registry doesn't automatically include it. This is by design, to prevent unexpected behavior.

## Process

To make a new version of your extension available in the registry, open a pull request to [grafana/k6-extension-registry](https://github.com/grafana/k6-extension-registry) updating your extension entry with the new version.

If you don't update the registry, the new version won't be available to k6 users through automatic extension resolution or Grafana Cloud k6.
