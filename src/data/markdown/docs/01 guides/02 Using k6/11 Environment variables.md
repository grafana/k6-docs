---
title: 'Environment variables'
excerpt: ''
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

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: Powershell"]} lineNumbers={[false]}>

```bash
$ MY_HOSTNAME=test.k6.io k6 run script.js
```

```bash
c:\\k6> set MY_HOSTNAME=\"test.k6.io\"\nc:\\k6> k6 run script.js
```

```bash
c:\\k6> $env:MY_HOSTNAME = \"test.k6.io\"\nc:\\k6> k6 run script.js
```

</CodeGroup>

or using an `-e` CLI flag (which will be the same for all platforms):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

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
| `K6_NO_USAGE_REPORT` | Define this to disable [usage reports](/misc/usage-reports).                                                           |
| `K6_OUT`             | Specify results output, same as --out command-line option.                                                             |
