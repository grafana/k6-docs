---
title: About the Extensions Registry
description: Reasons for the registry and what is required to be included.
weight: 01
---

# About the Extensions Registry

Did you create an extension and want to share it with your fellow k6 users?
We'd love to spread word of this new feature adding to our [registry](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore) of available extensions.
However, before an extension is added to the registry, we must ensure that it is maintained to the registry standard.

Our desire is to provide the best developer experience when using k6.
This extends to the extensions ecosystem as well.
The adaptability provided by k6 extensions opens a wide array of potential use cases.

To ensure quality, we need a well-maintained, curated listing of extensions.
Our pledge to the community is to make our best attempt to ensure the listed projects meet certain standards.
While we cannot guarantee the quality of community-provided extensions, we _can_ aid the evaluation by requiring certain consistencies.

## Registry Requirements

At minimum, each source code repository must have the following:

- **a README file**

  The `README` must contain documentation such as the project description, build and usage instructions, as well as k6 version compatibility.
  The goal is to provide enough information to quickly and easily evaluate the extension.

- **the `xk6` topic set**

  GitHub allows setting _topics_ for a repository.
  This supports querying all public repositories based upon a keyword for better discoverability, i.e. ["xk6"](https://github.com/topics/xk6).
  See the [GitHub documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) to add topics.

- **a non-restrictive license**

  Any open source software (OSS) license will suffice, but [Apache2](https://www.apache.org/licenses/LICENSE-2.0) is preferred.

- **an `examples` folder with examples**

  Provide at least one script to show proper usage of your API.
  If a [Docker Compose](https://docs.docker.com/compose/compose-file/) specification is provided, these could be used as integration tests to validate the extension works as intended.

- **at least one versioned release**

  As features or fixes are ready to be consumed, create a [release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
  This promotes stability by allowing a user to utilize a particular version.
  Use [semantic versioning](https://semver.org/) to communicate changes as the extension evolves.

- **builds with a recent k6 version**

  Ideally, the extension should build with the [latest release](https://github.com/grafana/k6/releases/latest).
  But, it must build with a version of k6 that is no more than three releases old.
  For example, if latest version of k6 is `v0.100`, the extension must build with at least version `v0.98`.
  Be sure to also match the version of Go as determined by the version of k6.

## Naming Conventions

Some extensions may be very specific, where others are more general.
Multiple extensions may even be created for the same product with different levels of support based upon version.
By adhering to typical naming conventions, your extension name can remove some doubts as to what is supported.

For any extension, we recommend the `xk6-` prefix as well as an optional `output-` for [Output extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/output-extensions).
Next, provide the product or protocol name; don't be cryptic.
Ensure the usage is explicit by adopting only well-known acronyms or abbreviations if necessary.
If your extension supports only a specific version of a product, incorporate the version into the name, for example `v2`.

As an example, suppose an extension that outputs test metrics to the _AwesomeLog_ application, and it uses only the v2 API.
In this case, say the latest v3 API is not backward-compatible.
Applying our conventions, we'd recommend naming this repository as `xk6-output-awesomelog-v2`.

{{% admonition type="note" %}}

Our goal is to quickly understand the intent of the extension.

{{% /admonition %}}

## Extension Tiers

Extensions come from multiple sources.
To help distinguish extensions, we're now categorizing each extension into a _tier_.
Each tier definition is as follows:

- **Official Extensions**

  _Official extensions_ are those owned and maintained by Grafana Labs.
  They will have official documentation and have support provided by members of the Grafana organization.

- **Community Extensions**

  _Community extensions_ are created and maintained by an individual or group from the community at large.
  These have no implied warranty or level of support.
  The Grafana team will make best-effort assistance to keep popular projects in compliance.

## Potential for De-listing

Given our desire to provide the best developer experience when using k6, we reserve the right to de-list any extension we deem is no longer maintaining standards.
Before any action takes place, the extension maintainers will be contacted to be given a chance to rectify the project and thus avoid de-listing.
Such contact may be in the form of GitHub issues or merge requests.

Should any extension be de-listed, this does not constitute a permanent removal.
Any extension that has been de-listed may be reinstated once the reasons for the initial removal have been remediated.
