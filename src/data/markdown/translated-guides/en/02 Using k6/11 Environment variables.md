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

k6 will read some specific environment variables to customize its operation.
These must be supplied to k6 at the shell level (so they _cannot_ be [passed
via -e or --env][envvarsref]).

| Name                 | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUD_HOST`      | A URL to connect to when the `--out=cloud` results output option is specified.                                          |
| `K6_CLOUD_TOKEN`     | An authentication token to use in API calls to the k6 cloud service, both for [streaming results to][k6ingest] and for [running tests in](/cloud) the k6 cloud. |
| `K6_NO_USAGE_REPORT` | Define this to disable [usage reports](/misc/usage-collection).                                                        |
| `K6_OUT`             | Specify results output, same as --out command-line option.                                                             |

k6 also allows proxying via its use of [Golang's standard http library](https://pkg.go.dev/net/http#ProxyFromEnvironment).
This is useful e.g. when wanting to send data to [k6 cloud](/cloud) from a k6 running inside a restricted network.

| Name                 | Description                                                          |
| -------------------- | ---------------------------------------------------------------------|
| `HTTP_PROXY`         | Proxy address (URL or `host:port`) to use for HTTP requests, unless overridden by `NO_PROXY`.    |
| `HTTPS_PROXY`        | Proxy address (URL or `host:port`) to use for HTTPS requests, unless overridden by `NO_PROXY`.   |
| `NO_PROXY`           | Hosts that should bypass proxies. This is a comma-separated string of IP addresses and/or host names. See [the httpproxy docs][httpproxyconfig] for more info. Example: `"1.2.3.4,2.3.4.5:80,myhost.com"`.|


[k6ingest]: /results-visualization/cloud/
[envvarsref]: /using-k6/options/#supply-environment-variables
[httpproxyconfig]: https://pkg.go.dev/golang.org/x/net/http/httpproxy#Config
