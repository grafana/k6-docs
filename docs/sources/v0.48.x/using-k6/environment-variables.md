---
title: 'Environment variables'
description: 'You can access any environment variables from your k6 script code and use this to supply your VUs with configuration information.'
weight: 11
---

# Environment variables

Often, scripts need only minor tweaks to be reusable in different contexts.
Rather than creating several separate scripts for these different contexts or environments, you can use [environment variables](https://grafana.com/docs/k6/<K6_VERSION>/misc/glossary#environment-variables) to make parts of your script tweakable.

You can use environment variables for two main purposes:

1. Passing environment variables to the k6 Script
2. Configuring [k6 Options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) with environment variables

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

The recommended option to pass environment variables to your testing script is to use one or more [`-e` / `--env` CLI flags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#supply-environment-variables)
(this command works the same for all platforms):

{{< code >}}

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

{{< /code >}}

> #### ⚠ The `-e` flag does not configure options
>
> This flag just provides variables to the script, which the script can use or ignore.
> For example, `-e K6_ITERATIONS=120` does _not_ configure the script iterations.
>
> Compare this behavior with `K6_ITERATIONS=120 k6 run script.js`, which _does_ set iterations.

{{< collapse title="Using System Environment Variables" >}}

A second option to pass environment variables is to source them from the local system.

```bash
$ MY_HOSTNAME=test.k6.io k6 run script.js
```

```windows
C:\k6> set "MY_HOSTNAME=test.k6.io" && k6 run script.js
```

```powershell
PS C:\k6> $env:MY_HOSTNAME="test.k6.io"; k6 run script.js
```

#### ⚠️ Warning

By default, passing system environment variables doesn't work for `k6 archive`, `k6 cloud`, and `k6 inspect`.
This is a security measure to avoid the risk of uploading sensitive data to k6 Cloud.
To override this mode, specify [--include-system-env-vars](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#include-system-env-vars).

{{< /collapse >}}

## Configure k6 options with environment variables

You can also configure k6 [options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) with environment variables.
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
To modify the default behavior, pass [k6 options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) as environment variables.
For example, this snippet configures the script to run 10 virtual users for a duration of 10 seconds:

{{< code >}}

```bash
$ K6_VUS=10 K6_DURATION=10s k6 run script.js
```

```windows
C:\k6> set "K6_VUS=10 K6_DURATION=10s" && k6 run script.js
```

```powershell
PS C:\k6> $env:K6_VUS=10 ; $env:K6_DURATION="10s" ; k6 run script.js
```

{{< /code >}}

As the preceding example shows, you need to prefix `K6_` in the environment variable name for k6 to evaluate it as an option parameter.
However, be aware that not all options are supported as environment variables.
You can confirm whether one is by checking the [documentation for each option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference).

Note that when you define options in multiple places, there's an [order of precedence](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) that determines the option to use.
To ensure you're always working with the highest precedence, use command-line flags instead of environment variables:

{{< code >}}

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io --duration 10s --vus 10 script.js
```

{{< /code >}}

## Read more

- [Manage environment variables in k6 Cloud](https://grafana.com/docs/grafana-cloud/k6/author-run/cloud-scripting-extras/cloud-environment-variables/)
