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

- The k6 version (string, e.g. "0.17.2")
- Max VUs configured (number)
- Test duration (number)
- Total stages duration (number)
- VU iterations configured (number)
- The running program's operating system target (`darwin`, `freebsd`, `linux`...)
- The running program's architecture target (386, amd64, arm, s390x...)
- The list of JavaScript imported modules (`k6/http`, `k6/experimental/webcrypto`, ...)
- The list of used outputs (`json`, `influxdb`, ...)

> Only k6 built-in JavaScript modules and outputs are considered. Private modules and custom extensions are excluded.

This report is sent to an HTTPS server that collects statistics on k6 usage.

k6 is an open-source project and for those interested, the actual code that generates and sends the usage report can be directly reviewed [here](https://github.com/grafana/k6/blob/d031d2b65e9e28143742b4b109f383e6b103ab31/cmd/report.go).
