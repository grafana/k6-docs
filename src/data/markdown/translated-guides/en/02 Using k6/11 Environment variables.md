---
title: 'Environment variables'
excerpt: 'You can access any environment variables from your k6 script code and use this to supply your VUs with configuration information.'
canonicalUrl: https://grafana.com/docs/k6/latest/using-k6/environment-variables/
redirect: https://grafana.com/docs/k6/latest/using-k6/environment-variables/
---

Often, scripts need only minor tweaks to be reusable in different contexts.
Rather than creating several separate scripts for these different contexts or environments, you can use [environment variables](/misc/glossary/#environment-variables) to make parts of your script tweakable.

You can use environment variables for two main purposes:

1. Passing environment variables to the k6 Script
2. Configuring [k6 Options](/using-k6/k6-options/how-to) with environment variables

## Passing environment variables to the k6 script

In k6, the environment variables are exposed through a global `__ENV` variable, a JS object.
For reference, see the script example below:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  sleep(1);
}
```

The recommended option to pass environment variables to your testing script is to use one or more [`-e` / `--env` CLI flags](/using-k6/k6-options/reference#supply-environment-variables)
(this command works the same for all platforms):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

> #### ⚠ The `-e` flag does not configure options
>
> This flag just provides variables to the script, which the script can use or ignore.
> For example, `-e K6_ITERATIONS=120` does _not_ configure the script iterations.
>
> Compare this behavior with `K6_ITERATIONS=120 k6 run script.js`, which _does_ set iterations.

<Collapsible title="Using System Environment Variables">

A second option to pass environment variables is to source them from the local system.

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

#### ⚠️ Warning

By default, passing system environment variables doesn't work for `k6 archive`, `k6 cloud`, and `k6 inspect`.
This is a security measure to avoid the risk of uploading sensitive data to k6 Cloud.
To override this mode, specify [--include-system-env-vars](/using-k6/k6-options/reference#include-system-env-vars).

</Collapsible>

## Configure k6 options with environment variables

You can also configure k6 [options](/using-k6/k6-options/how-to) with environment variables.
Consider this script:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}
```

By default, a local run of this script will execute a single iteration with one virtual user(VU).
To modify the default behavior, pass [k6 options](/using-k6/k6-options/how-to) as environment variables.
For example, this snippet configures the script to run 10 virtual users for a duration of 10 seconds:

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

As the preceding example shows, you need to prefix `K6_` in the environment variable name for k6 to evaluate it as an option parameter.
However, be aware that not all options are supported as environment variables.
You can confirm whether one is by checking the [documentation for each option](/using-k6/k6-options/reference).

Note that when you define options in multiple places, there's an [order of precedence](/using-k6/k6-options/how-to) that determines the option to use.
To ensure you're always working with the highest precedence, use command-line flags instead of environment variables:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io --duration 10s --vus 10 script.js
```

</CodeGroup>

## Read more

- [Manage environment variables in k6 Cloud](/cloud/manage/environment-variables/)

