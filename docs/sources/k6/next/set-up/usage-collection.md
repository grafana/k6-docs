---
aliases:
  - ../misc/usage-collection # docs/k6/<K6_VERSION>/misc/usage-collection
title: 'Usage collection'
description: 'By default, k6 sends a usage report each time it is run, so that we can track how often people use it. This report can be turned off by setting an environment variable or option.'
weight: 300
---

# Usage collection

By default, k6 sends an anonymous usage report each time it is run, so that we can track relevant information to be able to build the product making better data-driven decisions. Prioritizing the features that benefit the most and reducing the impact of changes.

The report can be turned off by setting the [no usage report](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference/#no-usage-report) option setting the environment variable `K6_NO_USAGE_REPORT` or by adding the flag `--no-usage-report` when executing k6.

The usage report does not contain any information about what you are testing. The contents are the following:

- An anonymous installation ID (`installation_id`), described below.
- The k6 version (string, e.g. "0.17.2")
- Max VUs configured (number)
- Test duration (number)
- Total stages duration (number)
- VU iterations configured (number)
- The running program's operating system target (`darwin`, `freebsd`, `linux`...)
- The running program's architecture target (386, amd64, arm, s390x...)
- The list of JavaScript imported modules (`k6/http`, `k6/experimental/webcrypto`, ...)
- The list of used outputs (`json`, `influxdb`, ...)
- The list of used extensions, each with its Go module path, version, and type (`js`, `output`, or `subcommand`)
- The test run ID if the test was executed in the cloud or was outputed to it
- The number of parsed files and how many were TypeScript files.
- The number of times `require` was called.
- Whether `global` was accessed.

{{< admonition type="note" >}}

The module and output lists contain only k6 built-in names. An extension is reported only if it's listed in the public [k6 extension catalog](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore/). Private and unlisted extensions are never reported.

{{< /admonition >}}

Running an extension subcommand (`k6 x <name>`) also sends a usage report. It contains the anonymous installation ID, the k6 version, the operating system and architecture targets, whether k6 runs in a CI system, and the invoked extension's entry as described above. The `K6_NO_USAGE_REPORT` environment variable and the `noUsageReport` configuration file option turn this report off too. The `--no-usage-report` flag has no effect here, because `k6 x` passes all flags unchanged to the extension.

## Anonymous installation ID

Starting with k6 v2.3.0, usage reports include a random UUID to help estimate the number of active k6 installations over time. Reusing the ID lets Grafana distinguish repeated runs from the same installation from runs across many installations, which helps guide k6 development. The ID is randomly generated, not derived from a username, hostname, or machine fingerprint.

k6 saves the ID in an `installation-id` file and reuses it between runs:

| Operating system | File location |
| --- | --- |
| Linux and other Unix systems | `$XDG_CONFIG_HOME/k6/installation-id`, or `$HOME/.config/k6/installation-id` if `XDG_CONFIG_HOME` is unset or empty. |
| macOS | `$HOME/Library/Application Support/k6/installation-id` |
| Windows | `%AppData%/k6/installation-id` |

Setting a custom configuration file with `--config` does not change this location. If you delete the ID file, k6 creates a new ID the next time it sends a usage report. This resets the local identifier; it does not disable reporting or delete reports already sent. If k6 cannot read or save the ID, it sends the report without the ID.

When you disable usage reporting, k6 does not read or create the ID file and sends no report. For example:

```sh
k6 run --no-usage-report script.js
```

For extension subcommands, set `K6_NO_USAGE_REPORT=true` instead of passing `--no-usage-report`.

This report is sent to an HTTPS server that collects statistics on k6 usage.

k6 is an open-source project and for those interested, the actual code that generates and sends the usage report can be directly reviewed [here](https://github.com/grafana/k6/blob/master/internal/cmd/report.go).
