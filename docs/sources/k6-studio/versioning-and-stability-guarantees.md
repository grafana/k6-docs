---
title: Versioning and stability
description: Policies for versioning, releases, and breaking changes in k6 Studio.
weight: 700
---

# Versioning and stability

Grafana k6 Studio follows a **rolling release model**, where only the latest version is actively supported.

Users are automatically upgraded to the latest version upon release.

## Versioning scheme and release frequency

k6 Studio employs a versioning scheme inspired by [Semantic Versioning](https://semver.org/):

- **Major versions (X.y.z)**

  - Introduce breaking changes or significant functionality updates.
  - Released only when necessary.

- **Minor versions (x.Y.z)**

  - Introduce new, backward-compatible features and improvements.
  - Released approximately every **2-6 weeks**.

- **Patch versions (x.y.Z)**
  - Include bug fixes and performance enhancements without changing functionality.
  - Released as needed.

## Breaking changes policy

### Migrations

Whenever possible, breaking changes will be handled **transparently** through automatic migration tools. If a migration tool can't support a particular change, for example, for major UI/UX revamps:

1. Users will be notified about upcoming changes.
2. Where applicable, we will provide documentation to ease migration.

### Deprecation notices

Features planned for removal will be marked as **deprecated** in advance.

## Release notes

Each release will include information about new features and bug fixes.

A complete CHANGELOG is maintained on the k6 Studio GitHub repository [CHANGELOG](https://github.com/grafana/k6-studio/blob/main/CHANGELOG.md) file.
