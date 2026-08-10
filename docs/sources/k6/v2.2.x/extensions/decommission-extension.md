---
title: Decommission an extension
description: Understand the process for retiring a k6 extension or a specific version from the registry.
weight: 07
---

# Decommission an extension

This page covers the decommissioning process for k6 extensions and explains what extension owners and users can expect.

Decommissioning applies to two scenarios:

- **Single version** — a specific release is retired, for example when it reaches end of life or has a critical security issue.
- **Entire extension** — the extension as a whole is retired.

## Communication

The k6 core team aims to notify affected users and owners before any removal when possible. The team tries to provide known alternatives and add removal notices directly to the registry listings.

Notifications may come through:

- A dedicated section in the release notes
- A dedicated section or page in the k6 official docs
- An issue on the original extension's repository

## Official extensions

Official extensions follow the [same support process and timelines](https://grafana.com/docs/k6/<K6_VERSION>/reference/versioning-and-stability-guarantees) as the k6 core product.

Extensions are first marked as deprecated, giving users advance notice and a clear migration path. Support is only dropped upon the release of a subsequent major version.

## Community extensions

Community extensions are maintained by their owners. Owners are encouraged to follow the same notice process as official extensions and to notify the k6 team to update the registry listing.

The k6 core team may remove a community extension or specific version from the registry at any time if it no longer meets the registry criteria.

## Exceptions for immediate removal

The k6 core team may remove an extension immediately, without a grace period, when required by:

- A security vulnerability with critical severity
- A legal or licensing obligation
- A critical safety concern

In these cases, the k6 core team will communicate the removal as soon as possible, including the reason and any available mitigation or alternative.
