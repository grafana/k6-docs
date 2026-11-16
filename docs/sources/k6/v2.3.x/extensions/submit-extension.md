---
title: Submit an extension
description: Learn how to submit a community extension to the k6 extension registry.
weight: 05
---

# Submit an extension

Extensions are a core part of the k6 ecosystem, providing capabilities not available in the k6 core. Adding your extension to the registry makes it available to all k6 users, in open-source and Grafana Cloud k6.

There are two main categories of extensions:

- **Official**: Owned and maintained by Grafana Labs.
- **Community**: Developed by the community. Anyone can contribute.

Submit a Community extension when your project fills a gap not covered by k6 or existing extensions.

## Before you start

Read the contribution guidelines in [grafana/k6-extension-registry](https://github.com/grafana/k6-extension-registry) — they are the authoritative source for the exact registry file format, field names, and naming conventions. The requirements your extension repository must meet are at [extensions registry requirements](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/extensions-registry). Read both before submitting.

If something in the repository documentation is unclear, open an issue asking for clarification.

## Extension prerequisites

Your extension repository must meet a minimum bar before you submit. The full list is in the registry repository, but at a minimum your extension must have:

- A LICENSE file using an allowed license
- A README that explains what the extension does and how to use it
- A valid `go.mod`
- At least one runnable example in an `examples` folder
- At least one versioned release
- A GitHub workflow with `golangci-lint` running on every pull request and every merge on the `main` branch

All of these requirements are automatically checked by the `xk6 lint --preset community` command.

Submissions that don't meet these requirements will fail automated checks. Don't rely on a reviewer to catch missing prerequisites.

## Run the checks locally first

The registry includes a Makefile that lets you run the automated checks on your machine. Always do this before opening a pull request. CI does not run automatically on new pull requests — a maintainer must manually allow it. Running checks locally catches failures early and avoids wasting that trigger on a submission that would have failed immediately.

## Submission steps

1. Fork `grafana/k6-extension-registry`.
2. Add your extension to the registry file, following the format documented in the repository.
3. Open a pull request using the provided pull request template. Fill it out completely.

## What happens after you open a pull request

### Automated checks

A maintainer will trigger the automated checks if the submission is legitimate — meaning it fills a clear product gap or adds a feature, with no evidence of user security risks or harassment.

Once triggered, the checks validate your registry entry and your extension repository against the documented requirements. Human review does not begin until all automated checks pass. If checks fail, consult the check output and the documentation linked above, fix the issues, and push — a maintainer will re-trigger CI.

### Maintainer review

Once checks pass, a maintainer will manually review your extension repository, not just the registry entry. The key question is whether the extension is genuinely useful to the k6 community, and the overall quality and trustworthiness of the project.

Passing automated checks does not guarantee acceptance. They are a necessary condition, not a sufficient one.

There is no guaranteed review turnaround time. Maintainers actively monitor the submission queue. There is no need to follow up — any comments or decisions will appear directly on the pull request.

Reviewers may close pull requests that appear stale.

### What reviewers may ask or decide

- **Accepted** — your extension is merged into the registry and will be available soon to k6 local and Cloud runs.
- **Changes requested** — address the feedback on your registry entry or extension repository before the review continues.
- **Rejected** — the extension does not meet the criteria at this time. The maintainer will explain why. If circumstances change, you are welcome to open a new submission.

### Ongoing responsibilities

When you list an extension, you take on its basic maintenance over time:

- **Security vulnerabilities**: Address significant security issues using your best judgment. There is no formal response SLA, but known vulnerabilities left unaddressed may result in removal from the registry.
- **k6 compatibility**: New k6 versions ship regularly. Watch the [grafana/k6](https://github.com/grafana/k6) repository on GitHub for release notifications and keep your extension compatible.
- **User issues**: Support and respond to issues filed against your extension repository.

### Decommission

If you can no longer maintain the extension, open a pull request removing it from the registry. If that is not practical, opening an issue or leaving a clear signal on the registry repository is enough — maintainers just need to know.

Additional decommissioning cases may apply. For more details, refer to the [Decommission an extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/decommission-extension) guide.
