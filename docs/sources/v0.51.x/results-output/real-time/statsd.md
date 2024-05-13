---
title: 'StatsD'
description: 'k6 has a built-in output to a StatsD service.'
weight: 00
---

# StatsD

{{% admonition type="warning" %}}

The built-in StatsD output has been deprecated on k6 v0.47.0. You can continue to use this feature by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), and this guide has been updated to include instructions for how to use it.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{% /admonition %}}

k6 can push test metrics to a [StatsD](https://github.com/statsd/statsd) service by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd).

## Build the k6 version

To build a k6 binary with the extension, first, make sure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed on your machine.

Then, open your terminal and run the following commands:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the k6 binary
xk6 build --with github.com/LeonAdato/xk6-output-statsd

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

xk6 will create the new k6 binary in the local folder.

{{% admonition type="note" %}}

To learn more about how to build custom k6 versions, check out [xk6](https://github.com/grafana/xk6).

{{% /admonition %}}

## Run the k6 test

Using the k6 binary you built in the previous step, you can use the `--out output-statsd` option when running your tests to use this extension:

{{< code >}}

```bash
$ ./k6 run --out output-statsd script.js
```

{{< /code >}}

The following options can be configured:

| Name                      | Value                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_STATSD_ADDR`          | Address of the statsd service, currently only UDP is supported. The default value is `localhost:8125`.                                  |
| `K6_STATSD_NAMESPACE`     | The namespace used as a prefix for all the metric names. The default value is `k6`.                                                     |
| `K6_STATSD_PUSH_INTERVAL` | Configure how often data batches are sent. The default value is `1s`.                                                                   |
| `K6_STATSD_BUFFER_SIZE`   | The buffer size. The default value is `20`.                                                                                             |
| `K6_STATSD_ENABLE_TAGS`   | If `true` enables sending tags. `false` by default as old versions of statsd, prior to v0.9.0 did not support tags.                     |
| `K6_STATSD_TAG_BLOCKLIST` | This is a comma-separated list of tags that should NOT be sent to statsd. For example, "tag1,tag2". The default value is `vu,iter,url`. |
