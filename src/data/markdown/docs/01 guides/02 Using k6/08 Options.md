---
title: 'Options'
excerpt: ''
---

## Using Options

Options allow you to configure how k6 will behave during test execution. They can be a part of the
script code so that they can be version controlled. They can also be specified with command-line
flags, environment variables or via a config file. Please refer to the list of available options
below for more details.

The order of precedence is: defaults < config file < exported script options < environment
variables < command-line flags. Options from each subsequent level can be used to overwrite the
options from the previous levels, with the CLI flags having the highest priority.

For example, you can define the duration in 4 different ways:

- set the `duration: "10s"` option in the config file
- set the `duration: "10s"` option in the script
- define `K6_DURATION` as an environment variable
- use the command-line flag `-d 10s`

The following JS snippet shows how to specify options in the script:

<div class="code-group" data-props='{"labels": ["example.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';

export let options = {
  hosts: { 'test.k6.io': '1.2.3.4' },
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 0 },
  ],
  thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
  noConnectionReuse: true,
  userAgent: 'MyK6UserAgentString/1.0',
};

export default function() {
  http.get('http://test.k6.io/');
}
```

</div>

You can also set the same options through a config file:

<div class="code-group" data-props='{"labels": ["config.json"], "lineNumbers": [true]}'>

```json
{
  "hosts": {
    "test.k6.io": "1.2.3.4"
  },
  "stages": [
    {
      "duration": "1m",
      "target": 10
    },
    {
      "duration": "1m",
      "target": 30
    },
    {
      "duration": "1m",
      "target": 0
    }
  ],
  "thresholds": {
    "http_req_duration": ["avg<100", "p(95)<200"]
  },
  "noConnectionReuse": true,
  "userAgent": "MyK6UserAgentString/1.0"
}
```

</div>

Or set some of the previous options via environment variables and command-line flags:

<div class="code-group" data-props='{"labels": ["Bash"], "lineNumbers": [true]}'>

```shell
$ K6_NO_CONNECTION_REUSE=true K6_USER_AGENT="MyK6UserAgentString/1.0" k6 run ~/script.js

$ k6 run ---no-connection-reuse --user-agent "MyK6UserAgentString/1.0" ~/script.js
```

</div>

<br/>

Below, you'll find details on all available options that can be specified within a script. It also
documents the equivalent command line flag, environment variables or option when executing `k6 run ...`
and `k6 cloud ...` that can be used to override options specified in the code.

## TLS Cipher Suites

A list of cipher suites allowed to be used by in SSL/TLS interactions with a server.
For a full listing of available ciphers go [here](https://golang.org/pkg/crypto/tls/#pkg-constants).

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `tlsCipherSuites`  |

### Default

`null` - Allow all suites

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  tlsCipherSuites: [
    'TLS_RSA_WITH_RC4_128_SHA',
    'TLS_RSA_WITH_AES_128_GCM_SHA256',
  ],
};
```

</div>

## Duration

A string specifying the total duration a test run should be run for. During this time each
VU will execute the script in a loop. Available in `k6 run` and `k6 cloud` commands.

| Env           | CLI                | Code / Config file |
| ------------- | ------------------ | ------------------ |
| `K6_DURATION` | `--duration`, `-d` | `duration`         |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  duration: '3m',
};
```

</div>

## Extension Options

An object used to set configuration options for third-party collectors, like plugins.

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `ext`              |

### Default

null

### Example

This is an example of how to specify the test name (test runs/executions with the same name will be
logically grouped for trending and comparison) when streaming results to
[k6 Cloud Insights](/cloud/analyzing-results/performance-insights).

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  ext: {
    loadimpact: {
      name: 'My test name',
    },
  },
};
```

</div>

## Hosts

An object with overrides to DNS resolution, similar to what you can do with `/etc/hosts` on
Linux/Unix or `C:\\Windows\\System32\\drivers\\etc\\hosts` on Windows. For instance, you could set
up an override which routes all requests for `test.k6.io` to `1.2.3.4`.

> ### ⚠️ Keep in mind!
>
> This does not modify the actual HTTP `Host` header, but rather where it will be routed.

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `hosts`            |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  hosts: {
    'test.k6.io': '1.2.3.4',
  },
};
```

</div>

## Iterations

A number specifying a fixed number of iterations to execute of the script, as opposed to specifying
a duration of time during which the script would run in a loop.
\*Note: The number of iterations
is split between all VUs. Available in `k6 run` command (not yet supported for cloud executed
tests using the `k6 cloud` command).

| Env             | CLI                  | Code / Config file |
| --------------- | -------------------- | ------------------ |
| `K6_ITERATIONS` | `--iterations`, `-i` | `iterations`       |

### Default

1

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  iterations: 10,
};
```

</div>

Or, to run 10 VUs 10 times each:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  vus: 10,
  iterations: 100,
};
```

</div>

## Linger

A boolean, true or false, specifying whether the k6 process should linger around after test
run completion. Available in the `k6 run` command.

| Env         | CLI              | Code / Config file |
| ----------- | ---------------- | ------------------ |
| `K6_LINGER` | `--linger`, `-l` | `linger`           |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  linger: true,
};
```

</div>

## Thresholds

A collection of threshold specifications to configure under what condition(s) a test is considered
successful or not, when it has passed or failed, based on metric data. To learn more, have a look
at the [Thresholds](/using-k6/thresholds) documentation. Available in `k6 run` commands.

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `thresholds`       |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  thresholds: {
    http_req_duration: ['avg<100', 'p(95)<200'],
    'http_req_connecting{cdnAsset:true}': ['p(95)<100'],
  },
};
```

</div>

## No Thresholds

Disables threshold execution. Available in the `k6 run` command.

| Env                | CLI               | Code / Config file |
| ------------------ | ----------------- | ------------------ |
| `K6_NO_THRESHOLDS` | `--no-thresholds` | N/A                |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```shell
$ k6 run --no-thresholds ~/script.js
```

</div>

## Max Redirects

The maximum number of HTTP redirects that k6 will follow before giving up on a request and
erroring out. Available in both the `k6 run` and the `k6 cloud` commands.

| Env                | CLI               | Code / Config file |
| ------------------ | ----------------- | ------------------ |
| `K6_MAX_REDIRECTS` | `--max-redirects` | `maxRedirects`     |

### Default

10

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  maxRedirects: 10,
};
```

</div>

## Batch

The maximum number of simultaneous/parallel connections in total that an
[`http.batch()`](/javascript-api/k6-http/batch-requests) call in a VU can make. If you have a
`batch()` call that you've given 20 URLs to and `--batch` is set to 15, then the VU will make 15
requests right away in parallel and queue the rest, executing them as soon as a previous request is
done and a slot opens. Available in both the `k6 run` and the `k6 cloud` commands

| Env        | CLI       | Code / Config file |
| ---------- | --------- | ------------------ |
| `K6_BATCH` | `--batch` | `batch`            |

### Default

20

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  batch: 15,
};
```

</div>

## Batch per host

The maximum number of simultaneous/parallel connections for the same hostname that an
[`http.batch()`](/javascript-api/k6-http/batch-requests) call in a VU can make. If you have a
`batch()` call that you've given 20 URLs to the *same* hostname and `--batch-per-host` is set to 5, then the VU will make 5
requests right away in parallel and queue the rest, executing them as soon as a previous request is
done and a slot opens. This will not run more request in parallel then the value of `batch`. Available in both the `k6 run` and the `k6 cloud` commands

| Env        | CLI       | Code / Config file |
| ---------- | --------- | ------------------ |
| `K6_BATCH_PER_HOST` | `--batch-per-host` | `batchPerHost`            |

### Default

6

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  batchPerHost: 5,
};
```

</div>

## No Connection Reuse

A boolean, true or false, specifying whether k6 should disable keep-alive connections.
Available in `k6 run` and `k6 cloud` commands.

| Env                      | CLI                     | Code / Config file  |
| ------------------------ | ----------------------- | ------------------- |
| `K6_NO_CONNECTION_REUSE` | `--no-connection-reuse` | `noConnectionReuse` |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  noConnectionReuse: true,
};
```

</div>

## No VU Connection Reuse

A boolean, true or false, specifying whether k6 should reuse TCP connections between iterations
of a VU. Available in `k6 run` and `k6 cloud` commands.

| Env                         | CLI                        | Code / Config file    |
| --------------------------- | -------------------------- | --------------------- |
| `K6_NO_VU_CONNECTION_REUSE` | `--no-vu-connection-reuse` | `noVUConnectionReuse` |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  noVUConnectionReuse: true,
};
```

</div>

## No Usage Report

A boolean, true or false. By default, k6 sends a usage report each time it is run, so that we can
track how often people use it. If this option is set to true, no usage report will be made. To
learn more, have a look at the [Usage reports](/misc/usage-reports) documentation. Available in
`k6 run` commands.

| Env                  | CLI                 | Code / Config file |
| -------------------- | ------------------- | ------------------ |
| `K6_NO_USAGE_REPORT` | `--no-usage-report` | `noUsageReport`    |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  noUsageReport: true,
};
```

</div>

## Paused

A boolean, true or false, specifying whether the test should start in a paused state. To resume
a paused state you'd use the `k6 resume` command. Available in `k6 run` and `k6 cloud` commands.

| Env         | CLI              | Code / Config file |
| ----------- | ---------------- | ------------------ |
| `K6_PAUSED` | `--paused`, `-p` | `paused`           |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  paused: true,
};
```

</div>

## RPS

The maximum number of requests to make per second, in total across all VUs. Available in `k6 run`
and `k6 cloud` commands.

| Env      | CLI     | Code / Config file |
| -------- | ------- | ------------------ |
| `K6_RPS` | `--rps` | `rps`              |

### Default

0 (unlimited)

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  rps: 500,
};
```

</div>

## Stages

A list of VU `{ target: ..., duration: ... }` objects that specify the target number of VUs to
ramp up or down to for a specific period. Available in `k6 run` and `k6 cloud` commands,

| Env         | CLI                                                     | Code / Config file |
| ----------- | ------------------------------------------------------- | ------------------ |
| `K6_STAGES` | `--stage <duration>:<target>`, `-s <duration>:<target>` | `stages`           |

### Default

Based on `vus` and `duration`.

### Example

<div class="code-group" data-props='{"labels": ["Code", "Shell"], "lineNumbers": [true]}'>

```js
// The following config would have k6 ramping up from 1 to 10 VUs for 3 minutes,
// then staying flat at 10 VUs for 5 minutes, then ramping up from 10 to 35 VUs
// over the next 10 minutes before finally ramping down to 0 VUs for another
// 3 minutes.

export let options = {
  stages: [
    { duration: '3m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '10m', target: 35 },
    { duration: '3m', target: 0 },
  ],
};
```

```shell
$ k6 run --stage 5s:10,5m:20,10s:5 ~/script.js

# or...

$ K6_STAGES="5s:10,5m:20,10s:5" k6 run ~/script.js
```

</div>

## Summary export

> _New in v0.26.0_

Output the end-of-test summary report to a JSON file that includes
data for all test metrics, checks and thresholds. This is useful to
get the aggregated test results in a machine-readable format, for
integration with dashboards, external alerts, etc.

Available in the `k6 run` command.

| Env                 | CLI                           | Code / Config file |
|---------------------|-------------------------------|--------------------|
| `K6_SUMMARY_EXPORT` | `--summary-export <filename>` | N/A                |

### Default

null

### Example

<div class="code-group" data-props='{"labels": ["Code", "Shell"], "lineNumbers": [true]}'>

```shell
$ k6 run --summary-export export.json ~/script.js

# or...

$ K6_SUMMARY_EXPORT="export.json" k6 run ~/script.js
```

</div>

See an example file on the [Results Output](https://k6.io/docs/getting-started/results-output#summary-export) page.


## Tags

Specify tags that should be set test wide across all metrics. If a tag with the same name has
been specified on a request, check or custom metrics it will have precedence over a test wide
tag. Available in `k6 run` and `k6 cloud` commands.

| Env | CLI                | Code / Config file |
| --- | ------------------ | ------------------ |
| N/A | `--tag NAME=VALUE` | `tags`             |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  tags: {
    name: 'value',
  },
};
```

</div>

## Include System Env Vars

Pass the real system environment variables to the runtime. Available in `k6 run` and `k6 cloud`
commands.

| Env | CLI                         | Code / Config file |
| --- | --------------------------- | ------------------ |
| N/A | `--include-system-env-vars` | N/A                |

### Default

true for `k6 run`, but false for all other commands to prevent inadvertent sensitive data leaks.

### Example

<div class="code-group" data-props='{"labels": [ "Shell" ], "lineNumbers": [true]}'>

```shell
$ k6 run --include-system-env-vars ~/script.js
```

</div>

## Supply Env Var

Add/override environment variable with VAR=value. Available in `k6 run` and `k6 cloud` commands.

| Env | CLI           | Code / Config file |
| --- | ------------- | ------------------ |
| N/A | `--env`, `-e` | N/A                |

### Default

### Example

<div class="code-group" data-props='{"labels": [ "Shell" ], "lineNumbers": [true]}'>

```shell
$ k6 run -e FOO=bar ~/script.js
```

</div>

## Results Output

Specify the results output. Please go to [Results ouput](/getting-started/results-output) for more information
on all output plugins available and how to configure them. Since version 0.21, this option can be
specified multiple times. Available in `k6 run` command.

| Env | CLI           | Code / Config file |
| --- | ------------- | ------------------ |
| N/A | `--out`, `-o` | N/A                |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [ "Shell" ], "lineNumbers": [true]}'>

```shell
$ k6 run --out influxdb=http://localhost:8086/k6 script.js
```

</div>

## Throw

A boolean, true or false, specifying whether to throw errors on failed HTTP requests or not.
Available in `k6 run` and `k6 cloud` commands.

| Env        | CLI             | Code / Config file |
| ---------- | --------------- | ------------------ |
| `K6_THROW` | `--throw`, `-w` | `throw`            |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  throw: true,
};
```

</div>

## Blacklist IPs

Blacklist IP ranges from being called. Available in `k6 run` and `k6 cloud` commands.

| Env                | CLI              | Code / Config file |
| ------------------ | ---------------- | ------------------ |
| `K6_BLACKLIST_IPS` | `--blacklist-ip` | `blacklistIPs`     |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  blacklistIPs: ['10.0.0.0/8'],
};
```

</div>

## Summary Trend Stats

Define stats for trend metrics (response times), one or more as `avg,p(95),...`. Available
in `k6 run` command.

| Env                      | CLI                     | Code / Config file  |
| ------------------------ | ----------------------- | ------------------- |
| `K6_SUMMARY_TREND_STATS` | `--summary-trend-stats` | `summaryTrendStats` |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  summaryTrendStats: ['avg', 'p(95)'],
};
```

</div>

## TLS Authentication

A list of TLS client certificate configuration objects. Each object needs to specify for
which host(s)/domain(s) the given client certificate is valid for.

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `tlsAuth`          |

### Default

null

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  tlsAuth: [
    {
      domains: ['example.com'],
      cert: open('mycert.pem'),
      key: open('mycert-key.pem'),
    },
  ],
};
```

</div>

## Skip TLS Verification

A boolean, true or false. When this option is enabled (set to true), all of the verifications that
would otherwise be done to establish trust in a server provided TLS certificate will be ignored.
Available in `k6 run` and `k6 cloud` commands

| Env                           | CLI                          | Code / Config file      |
| ----------------------------- | ---------------------------- | ----------------------- |
| `K6_INSECURE_SKIP_TLS_VERIFY` | `--insecure-skip-tls-verify` | `insecureSkipTLSVerify` |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  insecureSkipTLSVerify: true,
};
```

</div>

## TLS Version

Either a string representing the only SSL/TLS version allowed to be used in interactions with a
server, or an object specifying the "min" and "max" versions allowed to be used.

| Env | CLI | Code / Config file |
| --- | --- | ------------------ |
| N/A | N/A | `tlsVersion`       |

### Default:

`null` - Allow all versions

### Example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  tlsVersion: 'tls1.2',
};

// or...

export let options = {
  tlsVersion: {
    min: 'ssl3.0',
    max: 'tls1.2',
  },
};
```

</div>

## User Agent

A string specifying the user-agent string to use in `User-Agent` headers when sending HTTP
requests. Available in `k6 run` and `k6 cloud` commands

| Env             | CLI            | Code / Config file |
| --------------- | -------------- | ------------------ |
| `K6_USER_AGENT` | `--user-agent` | `userAgent`        |

### Default

`k6/0.20 (https://k6.io/)` (depending on the version you're using)

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  userAgent: 'MyK6UserAgentString/1.0',
};
```

</div>

## HTTP Debug

Log all HTTP requests and responses. Excludes body by default, to include body use
'--http-debug=full'. Available in `k6 run` and `k6 cloud` commands.

| Env             | CLI                                     | Code / Config file |
| --------------- | --------------------------------------- | ------------------ |
| `K6_HTTP_DEBUG` | `--http-debug`,<br/>`--http-debug=full` | `httpDebug`        |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  httpDebug: 'full',
};
```

</div>

## VUs

A number specifying the number of VUs to run concurrently. If you'd like more control look at
the [`stages`](#stages) option. Available in `k6 run` and `k6 cloud` commands.

| Env      | CLI           | Code / Config file |
| -------- | ------------- | ------------------ |
| `K6_VUS` | `--vus`, `-v` | `vus`              |

### Default

1

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  vus: 10,
};
```

</div>

## VUs Max

A number specifying max number of virtual users, if more than `vus`. This option is typically
used when the intent is to dynamically scale the amount of VUs up and down during the test using
the `k6 scale` command. Since instantiating a VU is an expensive operation in k6 this option
is used to preallocate `vusMax` number of VUs. Available in `k6 run` and `k6 cloud` commands.

| Env          | CLI           | Code / Config file |
| ------------ | ------------- | ------------------ |
| `K6_VUS_MAX` | `--max`, `-m` | `vusMax`           |

### Default

0

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  vusMax: 10,
};
```

</div>

## System Tags

Specify which [System Tags](/using-k6/tags-and-groups#section-system-tags) will be in the collected
metrics. Some collectors like the `cloud` one may require that certain system tags be used.
You can specify the tags as an array from the JS scripts or as a comma-separated list via the
CLI. Available in `k6 run` and `k6 cloud` commands

| Env              | CLI             | Code / Config file |
| ---------------- | --------------- | ------------------ |
| `K6_SYSTEM_TAGS` | `--system-tags` | `systemTags`       |

### Default

`proto`, `subproto`, `status`, `method`, `url`, `name`, `group`, `check`, `error`, `tls_version`

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  systemTags: ['status', 'method', 'url'],
};
```

</div>

## Setup Timeout

Specify how long the `setup()` function is allow to run before it's terminated and the test fails.

| Env                | CLI | Code / Config file |
| ------------------ | --- | ------------------ |
| `K6_SETUP_TIMEOUT` | N/A | `setupTimeout`     |

### Default

`10s`

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  setupTimeout: '30s',
};
```

</div>

## Teardown Timeout

Specify how long the `teardown()` function is allowed to run before it's terminated and the test
fails.

| Env                   | CLI | Code / Config file |
| --------------------- | --- | ------------------ |
| `K6_TEARDOWN_TIMEOUT` | N/A | `teardownTimeout`  |

### Default

`10s`

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  teardownTimeout: '30s',
};
```

</div>

## Config

Specify the config file in JSON format to read the `options` values. If the config file is not
specified, k6 will look for `config.json` in the `loadimpact/k6` directory inside the regular
directory for configuration files on the operating system.

For example in Linux/BSDs, it will look for `config.json` inside `${HOME}/.config/loadimpact/k6`.
Available in `k6 run` and `k6 cloud` commands

| Env | CLI                            | Code / Config file |
| --- | ------------------------------ | ------------------ |
| N/A | `--config <path>`, `-c <path>` | N/A                |

### Default

null

## Discard Response Bodies

Specify if response bodies should be discarded by changing the default value of
[responseType](/javascript-api/k6-http/params-k6-http) to `none` for all HTTP requests. Highly recommended to be set
to `true` and then only for the requests where the response body is needed for scripting
to set [responseType](/javascript-api/k6-http/params-k6-http) to `text` or `binary`. Lessens the amount of memory
required and the amount of GC - reducing the load on the testing machine, and probably producing
more reliable test results.

| Env                          | CLI                         | Code / Config file      |
| ---------------------------- | --------------------------- | ----------------------- |
| `K6_DISCARD_RESPONSE_BODIES` | `--discard-response-bodies` | `discardResponseBodies` |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  discardResponseBodies: true,
};
```

</div>

## Minimum Iteration Duration

Specifies the minimum duration for every single execution (i.e. iteration) of the default
function should be. Any iterations that are shorter than it will cause that VU to sleep for
the remainder of the time until the specified minimum duration is reached.

| Env                         | CLI                        | Code / Config file     |
| --------------------------- | -------------------------- | ---------------------- |
| `K6_MIN_ITERATION_DURATION` | `--min-iteration-duration` | `minIterationDuration` |

### Default

`0` (disabled)

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  minIterationDuration: '10s',
};
```

</div>

## No Cookies Reset

This disables the default behavior of resetting the cookie jar after each VU iteration. If
it's enabled, saved cookies will be persisted across VU iterations.

| Env                   | CLI | Code / Config file |
| --------------------- | --- | ------------------ |
| `K6_NO_COOKIES_RESET` | N/A | `noCookiesReset`   |

### Default

false

### Example

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
export let options = {
  noCookiesReset: true,
};
```

</div>
