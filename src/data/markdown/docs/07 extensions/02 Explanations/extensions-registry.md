---
title: About the Extensions Registry
excerpt: Reasons for the registry and what is required to be included.
hideFromSidebar: false
---

Our desire is to provide the best developer experience when using k6.
This extends to the extensions ecosystem as well.
The adaptability provided by k6 extensions opens a wide-array of potential use cases.

The need for a well-maintained, curated listing of extensions is a necessity.
Our pledge to the community will be to make our best attempt to ensure those projects listed meet certain standards.
While we cannot guarantee the quality of community-provided extensions, we _can_ aid the evaluation by requiring certain consistencies.

Did you create an extension and want to share it with your fellow k6 users?
We'd love to spread word of this new feature adding to our [registry](/extensions/get-started/explore/) of available extensions.

## Registry Requirements
At a minimum, each source code repository should have the following:

- a README file containing project description, build and usage documentation, and version compatibilities
- the `xk6` topic _(See the [GitHub documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics))_ for discoverability
- a non-restrictive OSS license _(Apache2 preferred)_
- an `examples` folder with at least one example to show proper usage
- at least one [versioned release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

In addition, extensions must successfully build with version(s) of k6 no older than one year and must specify the k6 versions it is compatible with.

<Blockquote mod="note" title="">

Our goal is to ease evaluation and adoption of extensions.

</Blockquote>

## Naming Conventions
Some extensions may be very specific, where others are more general. 
Multiple extensions may even be created for the same product with different levels of support based upon version.
By adhering to typical naming conventions, your extension name can remove some doubts as to what is supported.

For any extension we recommend the `xk6-` prefix as well as an optional `output-` for [Output extensions](/extensions/get-started/create/output-extensions/).
Next, provide the product or protocol name; don't be cryptic. 
Ensure the usage is explicit by only adopting well-known acronyms or abbreviations if necessary.
If your extension only supports a specific version of a product, incorporate the version into the name, for example `v2`.

As an example, suppose we've created an extension to output test metrics to the _AwesomeLog_ application strictly using the v2 API.
In our case, let's say the latest v3 API is not backward-compatible.
Applying our conventions, we'd recommend naming this repository as `xk6-output-awesomelog-v2`.

<Blockquote mod="note" title="">

Our goal is to quickly understand the intent of the extension.

</Blockquote>

## Potential for De-listing
Given our desire to provide the best developer experience when using k6, we reserve the right to de-list any extension we deem is no longer maintaining standards.
Before any action takes place, the extension maintainers will be contacted in attempt to rectify the project and thus avoid de-listing.
Such contact may be in the form of GitHub issues or merge requests.

Should any extension be de-listed, this does not constitute a permanent removal.
Any extension having been de-listed may be reinstated once the reasons for the initial removal have been remediated.
