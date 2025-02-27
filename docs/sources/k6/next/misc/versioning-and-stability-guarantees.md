---
title: Versioning and stability guarantees
description: Definitions and gurantees for k6 v1.0.0 and beyond.
weight: 8
---

# k6 Versioning and stability guarantees

As innovation sometimes requires introducing bold and extensive changes that might impact the workflow of k6’s consumers, our goal is to ensure stability, predictability, and ease of use for all users of k6, including those leveraging it in the Cloud and other products built on top of the open-source project.

In the following sections, we define workflows, guarantees, and constraints applied to k6 software, starting with version v1.0.0.

## Versioning strategy

k6 strictly follows [Semantic Versioning 2.0.0](https://semver.org/) versioning scheme. This versioning scheme defines three kinds of software versions.
#### Major version

A major version contains backward incompatible API changes.

Quoting the [semver 2.0.0 specification on major versions](https://semver.org/#spec-item-8) directly:

> *Major version X (X.y.z | X \> 0\) **MUST** be incremented if any backward-incompatible changes are introduced to the public API. This may also include minor and patch-level changes. Patch and minor versions **MUST** be reset to 0 when the major version is incremented.*
#### Minor version

A minor version contains backward-compatible API additions/changes.

Quoting the [semver 2.0.0 specification on minor versions](https://semver.org/#spec-item-7) directly:

> *Minor version Y (x.Y.z | x \> 0\) **MUST** be incremented if new, backward-compatible functionality is introduced to the public API.*
> *It MUST be incremented if any public API functionality is marked as deprecated.*
> *It MAY be incremented if substantial new functionality or improvements are introduced within the private code.*
> *It MAY include patch-level changes. The patch version MUST be reset to 0 when the minor version is incremented.*

#### Patch version

A patch version contains bug fixes **that do not affect** the API.

Quoting the [semver 2.0.0 specification on patch versions](https://semver.org/#spec-item-6) directly:

> *Patch version Z (x.y.Z | x \> 0\) **MUST** be incremented if only backward compatible bug fixes are introduced. A bug fix is defined as an internal change that fixes incorrect behavior.*
### Breaking change

As per the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) specification, we define a breaking change as a change to k6 that introduces a change that is not backward compatible.

Breaking changes imply that the consumer of k6 is expected to make some effort to adapt to the changes being made.

Although it is possible that, in certain cases, the new major version containing breaking changes might be compatible with the previous version, this is not expected.

## Release strategy

A k6 release is a set of changes that updates or adds new functionalities to the product, made globally available under a unique and new identifiable version.

k6 follows and aligns with the [Grafana Labs stages](https://grafana.com/docs/release-life-cycle). Not all changes follow a strict and sequential path through all the various steps. Most of the changes directly pass from Experimental to General Available.

### Preview

A preview release includes changes that should be considered unstable or under development but are ready for users to start testing changes or to prepare their migrations.

As soon as the development team starts to work on a new set of changes or breaking changes, opening the need for a new version, a next version should be available under a dedicated versioning format suffixing the `-next` text.

For example, if v1.3.5 is the latest major release, all the newly introduced breaking changes will be available under the `v2.0.0-next` version.
Instead, all the backward-compatible changes will be available under `v1.4.0-next` or `v1.3.6-next`.

### Frequency

#### Major versions

We aim to release a new major version once a year, in alignment with the practice observed in the Grafana ecosystem. This affords us to maintain a regular rhythm, offering opportunities for better feature planning, communication and visibility around releases, and regular cleanup of deprecated functionalities, helping reduce technical debt over time.

#### Minor versions

Minor versions are expected to be released every six weeks as a part of a regular process.

#### Patch versions

A new Patch version is released only if needed and is priority-based. Otherwise, fixes and changes that don’t introduce a new API or change the existing one will be released with the next minor version.
The priority includes different factors: risks, opportunities, timing, and many others.

## What is our stable and supported API surface?

In defining the stable API surface for k6, we aim to provide clear and stable interfaces guaranteed to be maintained and supported according to our [versioning strategy](#versioning-strategy). Our stable and supported API surface includes several key components, each critical for our users and their integration workflows.

Any change to one of the APIs described below will be considered breaking. Note that the following list has to be intended as an allowlist and any APIs, libraries, or components not explicitly mentioned have to be considered excluded. For example, k6 REST API is an example of an accessible API not covered by the supported API surface.

### Options & Command-line interface

Our stable and supported API surface includes the k6 options set (as exposed to users via the various configuration mediums k6 supports, options object, config file, environment variables, etc.).

The k6 command-line interface (CLI), including commands, subcommands, and flags, is also part of the stable and supported API. These commands are essential for initiating and managing test executions locally and in the cloud.

### JavaScript interpreter

With k6 scripts written in JavaScript and the environment in which they are executed supporting a specific set of JavaScript syntax and ECMAScript features, the k6 JavaScript interpreter is considered part of the k6 stable and supported API surface.

This ensures that users can write and execute scripts with predictable behavior and compatibility over the lifespan of their major version of k6.
### Modules

Furthermore, the *“core”* modules exposed directly to a script by k6 *(e.g.,* `k6`, `k6/http`, `k6/execution`) are another critical aspect of the k6 experience and of the interface between k6 and its users and is as such part of the stable and supported API surface.
It includes any class, properties, methods, function, or relative signature that is part of the module and is publicly exposed and documented.

Here, the full list of the `core` modules: `k6`, `k6/browser`, `k6/crypto`, `k6/crypto/x509`, `k6/data`, `k6/encoding`, `k6/execution`,  `k6/http`, `k6/metrics`, `k6/net/grpc`, `k6/timers`, `k6/ws`.

Experimental modules recognizable from their `k6/experimental` prefixed import path are explicitly excluded from the stable and supported API surface.
### Extensions

Our stable and supported API surface also includes the extensions API, which empowers internal and external developers to build custom modules and outputs as part of the k6 codebase or as external extensions.

This includes the [go.k6.io/k6/js/modules](https://pkg.go.dev/go.k6.io/k6@v0.57.0/js/modules) Go package that internal and external developers have available to build module extensions, as well as the [go.k6.io/k6/output](https://pkg.go.dev/go.k6.io/k6@v0.57.0/output) that can be used to build custom outputs for k6.

It also includes public k6 Go packages that are exposed to developers to facilitate the development of these extensions (e.g., the current  [go.k6.io/k6/lib.State](https://pkg.go.dev/go.k6.io/k6@v0.57.0/lib#State) package).
### Output

We guarantee the stability and support of metrics, logs, traces, and profiling outputs that we fully control in an end-to-end flow. This includes the JSON, CSV, JSON summary exports, cloud metrics, logs and traces outputs, and OpenTelemetry formats while excluding outputs dependent on third-party platforms and protocols.
### Metrics

We guarantee the stability of metric names, types, and units. Any changes to these are considered breaking and will be handled according to our [versioning strategy](#versioning-strategy). Doing so ensures that any product or artifact (dashboards, etc.) built on top of k6 can maintain a reliable and consistent experience.
## Deprecation, breaking changes, and migration policy

### Breaking Changes

In a constantly evolving product, [breaking changes](#breaking-change) are sometimes unavoidable. They require that k6 users have to actively react to them because the state after it is not backward compatible with the state before.

Because we follow the [semver 2.0.0](https://semver.org/spec/v2.0.0.html) versioning scheme, we work under the assumption breaking changes will always lead to a new major version. When the k6 team decides to introduce a breaking change, it will automatically define the need for a new major version.

When k6 releases a new major version, we are expected to be explicit, clearly communicate the breaking changes, and provide instructions for migrating users.

There are two types of breaking changes:

1. Removal
2. Update

#### Steps to remove an API or a feature

1. Deprecate a current API or a feature by following the dedicated policy.
2. If necessary, add an alternative solution. Ideally, this would be an experimental version within a minor release within the current maintained state. Alternatively, it might be available in a Preview release.
3. Provide documentation for the migration path.
4. Proceed with removing the API and releasing a new major version.

#### Steps to update an API or a feature

1. Apply the changes, then publish them in the next major version. If the change is heavy, it might be convenient to make it available in a Preview release that can support the migration path until a version is globally available.
2. Provide documentation for the migration path.

### Deprecation

When the k6 team intends to remove an API or a feature, it will be marked as *deprecated*. This occurs when an API becomes obsolete, superseded by another API, or otherwise discontinued for business or technological reasons.
Deprecated APIs remain available through their deprecated phase, which guarantees they will remain available at least throughout the entire life cycle of the current major version.

A deprecation has several layers of communication necessary to be implemented and respected before it can be officially applied:

1. Release notes and changelogs
2. Official documentation
3. When the user directly interacts with the feature
4. An alternative already available is recommended, but it shouldn’t be considered mandatory.
### Migration

When a breaking change is introduced, or an API is superseded, then documentation for a migration guide must be provided to users to help them understand how to move from version to version.
The migration path must be available in the official documentation, and it is recommended to be mentioned in all other communication channels.
## Support and development policies

We define k6 support and development policies according to four states where a k6 version can be implemented.

### The states of k6 releases

At any given time, there is a:

* **The under-development** version is the next upcoming version, k6. Note that this version might either start a new major version (*e.g. developing v3.0.0, while the latest release is v2.8.2),* or it might be a new minor or patch iteration over the latest release.
* **The actively maintained** version is the latest released major version of k6.
* **The supported** version is the latest released version of k6 within the previous major version.
* **The deprecated** versions are the set of previously released k6 versions.

As such, during its development and support workflow, the k6 open-source project actively develops the next version of k6, maintains the latest major release, supports the previous major version, and does not provide any support for releases older than the supported one.

Any past version of k6 that’s neither being developed, maintained, or supported is considered **deprecated** and will not support further updates or development. Users are free to use them at their own risk.

### Guidelines

1. **We do not backport features** from one major version to any previous ones.
2. We only provide changes on the latest release of each support category: **at any point in time, there are single officially under-development and actively maintained versions.** We do not support multiple versions of each support path. *For example, suppose a bug is found in v1.1.0, and the latest v1.Y.Z published release is v1.3.2*. *In that case, if and only if the latest release is affected, and the bug or security issue is deemed important enough, only then does the development team define as a priority* *to publish a fix that will be released in v1.3.3. Users cannot expect a v1.1.1 fix release.*
3. Our products, services, and teams building upon k6 are expected to develop their versioning integration built on our support policies.
#### Bugs & Security issues

Bugs and security issues come in all shapes and sizes and vary widely in impact. Some are critical, compromising user safety or impacting software functionality, while others are minor annoyances that do not require immediate action.

The k6 open-source core team, with input from affected stakeholders, is responsible for assessing the severity of these issues.
##### Bugs

We classify bug severity based on their impact on users or product functionality. High-severity bugs prevent a subset of users from using the software properly or at all. Depending on the severity, the team will either release an immediate patch or, for less critical bugs, delay the fix to the next scheduled release.

##### Security

Security issues are classified using the CVSS (Common Vulnerability Scoring System) score when available. In its absence, we evaluate the threat in collaboration with the security team and affected teams. This assessment considers the potential threat to customers, users, system health, and data integrity. Like bug fixes, the response will be either an immediate patch release for high-severity issues or a delayed fix for lower-severity issues.

Following the practice of the Grafana project, *security-related releases follow the same process but* ***MUST*** *be prepared in secret. They* ***MUST NOT*** *include changes that are not related to the security fix.*
### Guarantees

#### Under development

At any point in the k6 development lifecycle, the next version of k6 is being developed.

The next version of k6 can be a [major](#major-version), [minor](#minor-version), [patch](#patch-version) one. This developed version is then released according to our [versioning strategy and scheme](#versioning-strategy) and becomes the latest maintained version of k6.

#### Actively maintained

The latest version, released under the currently active [major version](#major-version), is maintained.

In the event of a bug, security issue, or necessary dependency update:
* **If** **the under-development version is expected to remain within the same [major version](#major-version) scope**, the fix or update is expected to land in said version, which will become, in turn, the next maintained version once released.
* **If the under-development version is expected to switch to a new [major version](#major-version) scope**, the fix or update will be included in the currently maintained major version scope and released as the latest maintained version (patch).
#### Supported k6 version

At any point, the prior major version will be in **support** mode. The supported version of k6 will receive no further updates or features backport but will keep receiving major and security bug fixes. Its [minor version](#minor-version) is not expected to change anymore, and it should only see its [patch version](#patch-version) grow.

#### Deprecated k6 versions

A major version of k6, which is two major versions away from the past (*e.g.,* v1.0.0, when the latest version is v3.0.0), is considered **deprecated** and won’t receive any form of support whatsoever anymore.
The same applies to a minor version.

### Real-world scenarios

#### A major (bug or security) issue is found with the latest release of k6

The latest release of k6 is **actively** **maintained**. Within this version’s major scope is a single maintained version, the latest one.

Thus, when a security issue or bug affects the actively maintained version, the k6 team puts together a fix and publishes a new [patch version](#patch-version) of the currently maintained version. Although the under-development version should integrate those changes, we still reserve the right to release a new intermediary release.

If the issue or bug also affects the supported version of k6, we apply the fix to it and publish a [patch version](#patch-version) of the currently supported version of k6.

If the issue also affects a deprecated version of k6, we take no action and invite users to upgrade to at least the latest *supported version* of k6.
#### An issue is found in the supported version of k6

When a security issue or bug is found in the currently **supported** version of k6, the k6 team creates a fix in the support version’s branch. It publishes a new [patch version](#patch-version) of the supported version, which becomes the new supported version of k6.

If the issue also affects the k6 version, which is currently the [major version](#major-version), a separate fix should be released and released as a [patch version](#patch-version) within the maintained version’s major scope.

If the issue also affects deprecated versions of k6, we take no action and invite users to upgrade to at least the latest *supported version* of k6.
#### An issue is found in a deprecated version of k6

An issue (security or bug) is spotted in a **deprecated** version. We only recommend that users upgrade their version of k6.
### Experimental

Within k6, some APIs, features, and modules are explicitly marked as experimental.

Those APIs, features, and modules are either made of changes or new capabilities, which we believe are valuable to our users and the development of k6. Still, they are **not yet stable**.

An experimental API, feature, or module **can undergo a breaking change and be completely removed without prior notice**. Our support policy does not cover experimental APIs, features, and modules. As such, we advise products, projects, and teams not to rely on them explicitly for mission-critical operations and to build upon them if possible.

Experimental APIs, features, and modules may eventually become stable. However, they also may not.

They should be marked and communicated internally and, most importantly, externally. When a user interacts with an experimental feature or module, it **must** be explicitly communicated to them. How to do it depends on the layer where the change is introduced and can vary case by case.

For example, a JavaScript module should be recognizable as an experimental module by its import path, which includes the `k6/experimental/` prefix. Advertising the experimental state via the official documentation is also highly encouraged. However, using it as a unique level shouldn’t be considered sufficient communication.
However, the development team is responsible to decide which is the reasonable level to apply based on the specific case.

When an experimental API, feature, or module becomes stable, it will lead to a new minor version of k6 in most cases. The experimental module import path becomes deprecated and will be removed in a couple of minor releases with the future notice.

## Versioning policy

We reserve ourselves the right to modify the versioning strategy and policies as part of a major release, under the constraints that:

* We maintain a changelog of the modifications we do in the document itself.
* The document remains public and accessible to users.
* We communicate changes in the context of new releases.

For example, let’s assume we decide to introduce a new supported API surface, like the REST API v2, we would amend this document accordingly, publish and enforce the change to the affected workflows as part of the next major release.