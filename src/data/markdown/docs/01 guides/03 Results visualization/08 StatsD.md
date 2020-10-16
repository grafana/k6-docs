---
title: 'StatsD'
excerpt: ''
---

k6 can also push the metrics to a [StatsD](https://github.com/statsd/statsd) service like:

<CodeGroup labels={["StatsD"]}>

```shell
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
