---
title: Extension Graduation
excerpt: Some extensions are created with the intent to become a part of core of k6.
hideFromSidebar: false
---

Some _Go_ extensions may one day be available within the k6 binary.
These select extensions will go through different phases to become core functionality.

Beginning the process as an extension allows us to iterate on the feature quickly, without worrying about breaking changes, while providing some value to our users and potentially getting early feedback.

The three phases which a _core-bound_ extension will go through include:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**_extension_ -> _experimental module_ -> _core module_**

### Extension
Most of the extensions in the k6 ecosystem will remain an _extension_ requiring using [xk6](https://github.com/grafana/xk6) to incorporate the custom functionality.
These extensions will be a mix of Grafana- and community-provided features and _may_ be included in the [Extensions Registry](/extensions/get-started/explore/).

<Blockquote mod="note" title="">

Only Grafana-owned extensions may progress beyond the _extension_ phase to become _experimental_ or _core modules_.

</Blockquote>

### Experimental Module
This phase is the first exposure to core k6. 
The extension is still maintained outside the core of k6 but imported as a Go module, no longer requiring using xk6.

There should be a reasonably high degree of quality and stability at this point.
This phase will allow adoption by a broader subset of OSS and cloud users while getting actionable feedback about the user experience.
The key will be to achieve a balance between usability and stability.

### Core Module
The stabilized feature is now part of the standard k6 product as a built-in module.
An extension may be in the _experimental module_ phase for an extended time before progressing as a core module.

The extension code will be in the main k6 repository, with the old extension repository archived.
Options from the _experimental module_ phase will be deprecated and removed after two k6 releases.
This time frame should provide ample time for users to upgrade scripts for the new usage.
