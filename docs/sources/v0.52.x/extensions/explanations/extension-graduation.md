---
title: Extension Graduation
description: Some extensions are created with the intent to become a part of core of k6.
weight: 03
---

# Extension Graduation

Some _Go_ extensions may one day be available within the k6 binary.
These select extensions pass through different phases to become core functionality.

This graduation process benefits both users and developers.
k6 users can access new features and provide feedback to influence its developments.
k6 developers meanwhile can iterate quickly and respond to feedback without worrying about breaking changes.

A _core-bound_ extension passes through the following phases:
![Extension graduation](/media/docs/k6-oss/extension-graduation.png)

### Extension

Most extensions in the k6 ecosystem remain _extensions_ requiring [xk6](https://github.com/grafana/xk6) to incorporate the custom functionality.
These extensions might be provided by Grafana or by the community, and _may_ be included in the [Extensions Registry](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore).

{{% admonition type="note" %}}

Only Grafana-controlled extensions may progress beyond the _extension_ phase to become _experimental_ or _core modules_.

{{% /admonition %}}

### Experimental Module

This phase is the first exposure to core k6.
The extension is still maintained outside the core of k6 but imported as a Go module, no longer requiring xk6.

Once an extension is promoted as an _experimental module_, the extension will be removed from the [extension listing](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore).
At this time, documentation for the functionality will be provided in [k6 API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental) and [output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time) for _JavaScript_ and _Output_ extensions, respectively.

There should be a reasonably high degree of quality and stability at this point.
This phase makes the feature accessible to more users, which in turn gives k6 developers more chances to receive feedback.
The key will be to achieve a balance between usability and stability.

{{% admonition type="caution" %}}

Not all experimental modules will progress to become a core module!
The k6 team reserves the right to discontinue and remove any experimental module if is no longer deemed desirable.

{{% /admonition %}}

### Core Module

The stabilized feature is now part of the standard k6 product as a built-in module.
An extension may be in the _experimental module_ phase for an extended time before progressing as a core module.

The module code is in the main k6 repository, with the old extension repository archived.
Options from the _experimental module_ phase are deprecated and removed after two k6 releases,
providing time for users to upgrade scripts for the new module.
