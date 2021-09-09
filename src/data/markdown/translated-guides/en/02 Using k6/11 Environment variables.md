---
title: 'Environment variables'
excerpt: 'You can access any environment variables from your k6 script code, and use this to supply your VUs with configuration information.'
---

Environment variables can be used with k6 in two ways:

- You can pass some [k6 Options](/using-k6/options) as environment variables to affect k6's behavior. 

- You can access any environment variables from your k6 script code, and use this to supply your
  VUs with configuration information.

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

Note: This can *not* be used to configure k6 with environment variables as listed on the [options](/using-k6/options) page. In other words `-e K6_ITERATIONS=120` will *not* configure the script [iterations](/using-k6/options#iterations), it will just provide `__ENV.K6_ITERATIONS` to the script, unlike `K6_ITERATIONS=120 k6 run script.js`.

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