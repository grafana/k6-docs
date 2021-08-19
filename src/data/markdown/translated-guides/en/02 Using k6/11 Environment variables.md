---
title: 'Environment variables'
excerpt: 'You can access any environment variables from your k6 script code, and use this to supply your VUs with configuration information.'
---

## k6 and environment variables

Environment variables can be used with k6 in two ways:

- You can access any environment variables from your k6 script code, and use this to supply your
  VUs with configuration information.
- A couple of environment variables are automatically read by k6 on startup, affecting its behavior.

## Accessing environment variables from a script

A lot of the time, scripts will only need minor tweaking to be reusable in different
contexts. Rather than having to create several separate scripts for these different
contexts or environments, you can use environment variables to make parts of your
script tweakable.

In k6, the environment variables are exposed through a global `__ENV` variable, a JS
object. The source of the environment variables can be twofold. They could come from
the local system and/or be explicitly passed to k6 using one or more `-e NAME=VALUE`
CLI flags.

The primary difference between the two is that only `k6 run` passes the actual system
environment variables to the script code by default, while `k6 archive`, `k6 cloud` and
`k6 inspect` do not. So unless you explicitly specify `--include-system-env-vars`, only
the variables passed using the `-e` CLI flag will be persisted when creating an archive
(`k6 archive script.js`). You can also disable the default passing of system environment
variables when running scripts by using `--include-system-env-vars=false`.

An environment variable could, for example, be specified like this on the command line:

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ MY_HOSTNAME=test.k6.io k6 run script.js
```

```bash
C:\k6> set "MY_HOSTNAME=test.k6.io" && k6 run script.js
```

```bash
PS C:\k6> $env:MY_HOSTNAME="test.k6.io"; k6 run script.js
```

</CodeGroup>

or using an [`-e` / `--env` CLI flag](/using-k6/options#supply-environment-variables) (which will be the same for all platforms):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

Note: This can *not* be used to configure k6 with environment variables as listed on the [options](/using-k6/options) page. In other words `-e K6_ITERATIONS=120` will *not* configure the script [iteratons](/using-k6/options#iterations), it will just provide `__ENV.K6_ITERATIONS` to the script, unlike `K6_ITERATIONS=120 k6 run script.js`.

The environment variable could then be used as follows in a script:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import { check, sleep } from 'k6';
import http from 'k6/http';

export default function () {
  var r = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  check(r, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(5);
}
```

</CodeGroup>

Environment variables specified with the `-e` CLI flag takes precedence over (overwrite) actual
system environment variables with the same name.

## Environment variables k6 will read automatically

k6 will also try to read some specific environment variables that the user can set to change the
behavior of k6:

| Name                 | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUD_HOST`      | A URL to connect to, when the --out=cloud results output option is specified.                                          |
| `K6_CLOUD_TOKEN`     | An authentication token to use in API calls to the cloud service, when the --cloud results output option is specified. |
| `K6_NO_USAGE_REPORT` | Define this to disable [usage reports](/misc/usage-collection).                                                        |
| `K6_OUT`             | Specify results output, same as --out command-line option.                                                             |

When streaming test data to [k6 cloud](/cloud) with `k6 -o cloud`, k6 will
collect all data and send it in batches.

| Name | Description |
| ---- | ----------- |
| `K6_CLOUD_METRIC_PUSH_INTERVAL`               | How often to send data to the k6 cloud (default `'6s'`).                                        |

k6 can also _aggregate_ the data it sends to the k6 cloud each batch.
Aggregation is disabled by default.

When using aggregation, k6 will collect incoming test data into time-buckets.
For each data-type collected in such a bucket, it will figure out the dispersion
(by default the [interquartile range](iqr)) around the median value. Data far
outside the lower and upper quartiles are not aggregated, but sent as-is in
order to not lose potentially important testing information.

Aggregation is controlled by a series of environment variables you don't need to
modify unless you have very specific statistical needs.

> When running a test entirely in the cloud with `k6 cloud`, `k6` will always
> aggregate. In this case the aggregation settings are set by the infrastructure
> in the cloud and are not controllable from the CLI.

| Name                                          | Description                                                                                              |
|---------------------------------------------- |----------------------------------------------------------------------------------------------------------|
| `K6_CLOUD_AGGREGATION_PERIOD`                 | >0s to activate aggregation (default disabled, `'3s'` is a good example to try) |
| `K6_CLOUD_AGGREGATION_CALC_INTERVAL`          | How often new data will be aggregated (default `'3s'`).                                                    |
| `K6_CLOUD_AGGREGATION_WAIT_PERIOD`            | How long to wait for period samples to accumulate before aggregating them (default `'5s'`).                |
| `K6_CLOUD_AGGREGATION_MIN_SAMPLES`            | If fewer samples than this arrived in interval, skip aggregation (default `100`).                          |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_RADIUS`     | Outlier sampling from median to use for Q1 and Q3 quartiles (fraction) (default `0.25` (i.e. [IQR][iqr])). |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_LOWER` | How many quartiles below the lower quartile are non-aggregatable outliers (default 1.5)                            |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_UPPER` | How many quartiles above the upper quartile are non-aggregatable outliers (default 1.3)                            |



[iqr]: https://en.wikipedia.org/wiki/Interquartile_range

