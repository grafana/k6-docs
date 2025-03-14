---
title: Versioning and Stability
description: Policies for versioning, releases, and breaking changes in k6 Studio.
weight: 700
---

## Versioning and Stability

Studio follows a **rolling release model**, where only the latest version is actively supported. 

Users are automatically upgraded to the latest version upon release.

### Versioning Scheme and Release Frequency

Studio employs a versioning scheme inspired by **Semantic Versioning**:

- **Major versions (X.y.z)**  
  - Introduce breaking changes or significant functionality shifts.
  - Released only when necessary.

- **Minor versions (x.Y.z)**  
  - Introduce new, backward-compatible features and improvements.
  - Released approximately every **2-6 weeks**.

- **Patch versions (x.y.Z)**  
  - Include bug fixes and performance enhancements without altering functionality.
  - Released as needed.

## Breaking Changes Policy

### Migrations

Whenever possible, breaking changes will be handled **transparently** through automatic migration tools. If a migration tool cannot support a particular change (e.g., major UI/UX revamps):

- (1) Users will be notified about upcoming changes.
- (2) Where applicable, we will provide documentation to ease migration.

### Deprecation Notices

Features planned for removal will be marked as **deprecated** in advance.

## Release Notes

Each release will include information about new features and bug fixes. 

A complete changelog is maintained in `CHANGELOG.md`.