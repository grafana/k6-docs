---
title: 'StatsD'
excerpt: 'k6 has a built-in output to a StatsD service.'
---

<Blockquote mod="warning" title="">

The built-in StatsD output has been deprecated on k6 v0.47.0. If you'd like to keep using this feature, you can use the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd).

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

</Blockquote>

k6 can also push the metrics to a [StatsD](https://github.com/statsd/statsd) service like:

<CodeGroup labels={["StatsD"]}>

```bash
$ k6 run --out statsd script.js
```

</CodeGroup>

The following options can be configured:

| Name                      | Value                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `K6_STATSD_ADDR`          | Address of the statsd service, currently only UDP is supported. The default value is `localhost:8125`. |
| `K6_STATSD_NAMESPACE`     | The namespace used as a prefix for all the metric names. The default value is `k6`.                    |
| `K6_STATSD_PUSH_INTERVAL` | Configure how often data batches are sent. The default value is `1s`.                                  |
| `K6_STATSD_BUFFER_SIZE`   | The buffer size. The default value is `20`.                                                            |
| `K6_STATSD_ENABLE_TAGS`   | If `true` enables sending tags. `false` by default as old versions of statsd, prior to v0.9.0 did not support tags. |
| `K6_STATSD_TAG_BLOCKLIST` | This is a comma-separated list of tags that should NOT be sent to statsd. For example, "tag1,tag2". The default value is `vu,iter,url`. |
