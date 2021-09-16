---
title: 'Environment variables'
excerpt: 'You can access any environment variables from your k6 script code, and use this to supply your VUs with configuration information.'
---

A lot of the time, scripts will only need minor tweaking to be reusable in different contexts. Rather than having to create several separate scripts for these different contexts or environments, you can use environment variables to make parts of your script tweakable.

There are two main ways of passing environment variables in k6:

1. Using `-e` CLI flag
2. Using [k6 Options](/using-k6/options) environment variables

## Setting Environment Variables using `-e` CLI flag

In k6, the environment variables are exposed through a global `__ENV` variable, a JS object. For reference, see the script example below:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  sleep(1);
}
```

The recommended option of passing environment variables to your testing script is using one or more [`-e` / `--env` CLI flags](/using-k6/options#supply-environment-variables) (this command works the same for all platforms):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

**Note**: This can _not_ be used to configure k6 with environment variables as listed on the [options](/using-k6/options) page. In other words `-e K6_ITERATIONS=120` will _not_ configure the script [iterations](/using-k6/options#iterations), it will just provide `__ENV.K6_ITERATIONS` to the script, unlike `K6_ITERATIONS=120 k6 run script.js`.

<Collapsible title="Using System Environment Variables">

A second option of passing environment variables is by sourcing them from the local system.

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

> #### ⚠️ Warning
>
> This option is NOT recommended due to the risk of uploading unnecessary and sensitive environment variables to the cloud. Hence, by default, passing system environment variables does not work for `k6 archive`, `k6 cloud` and `k6 inspect`. You can override this mode by explicitly specifying [`--include-system-env-vars`](https://k6.io/docs/using-k6/options/#include-system-env-vars).

</Collapsible>

## k6 Options Environment Variables

k6 [options](/using-k6/options) can be configured by passing environment variables. Consider the following basic test script:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}
```

By default, running the above script locally will execute a single iteration using one virtual user(VU). We can modify the **default behavior** by passing along [k6 Options](/using-k6/options) as environment variables:

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_VUS=10 K6_DURATION=10s k6 run script.js
```

```bash
C:\k6> set "K6_VUS=10 K6_DURATION=10s" && k6 run script.js
```

```bash
PS C:\k6> $env:K6_VUS=10 ; $env:K6_DURATION="10s" ; k6 run script.js
```

</CodeGroup>

The same script will now run 10 virtual users for a duration of 10 seconds. Take note you must prefix `K6_` in the environment variable name in order for k6 to evaluate it as a **option parameters**. However, be aware not all options are supported as environment variables. You can confirm by checking the documentation for each option.

Take note that when you use multiple ways to define options for a script, there's an [order of precedence](https://k6.io/docs/using-k6/options#using-options) that is used to determine which option is actually used. To ensure you are always working with the highest precedence, always use command-line flags instead of environment variables:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io --duration 10s --vus 10 script.js
```

</CodeGroup>
