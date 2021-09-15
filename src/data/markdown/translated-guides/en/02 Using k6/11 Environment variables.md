---
title: 'Environment variables'
excerpt: 'You can access any environment variables from your k6 script code, and use this to supply your VUs with configuration information.'
---

A lot of the time, scripts will only need minor tweaking to be reusable in different contexts. Rather than having to create several separate scripts for these different contexts or environments, you can use environment variables to make parts of your script tweakable.

There are three main concerns you should be aware of when setting up environment variables with k6:

1. You can pass system environment variables to your k6 script code
2. You can explicitly pass environment variables using `-e` CLI flag
3. You can pass [k6 Options](/using-k6/options) as environment variables

## System Environment Variables

We can embed environment variables within script code using a global `__ENV` variable, a JS object. The source of the environment variable can be exposed either via system environment variable or via the `e` flag which we'll discuss later in the next section.

Consider the following script example:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  sleep(1);
}
```

In order to run the above script, we'll need to supply the source value of `__ENV.MY_HOSTNAME` variable as follows:

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

> #### ⚠️ Default Settings
>
> Take note that by default, passing system environment variables does not work for `k6 archive`, `k6 cloud` and `k6 inspect`. In order for it to work, you'll need to explicitly specify [`--include-system-env-vars`](https://k6.io/docs/using-k6/options/#include-system-env-vars). You can also disable the default passing of system environment variables when running scripts by using `--include-system-env-vars=false`.

## Explicit Environment Variables

The global `__ENV` variable we mentioned earlier can also be populated using one or more `-e NAME=VALUE` CLI flags. This method is explicit and it will work for all k6 testing commands.

An environment variable can be specified like this on the command line using an [`-e` / `--env` CLI flag](/using-k6/options#supply-environment-variables) (which will be the same for all platforms):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

When setting both system environment variables and explicitly defining them, there is an order of [precedence](https://k6.io/docs/using-k6/options#using-options) that will overwrite options from the next level.

**Note**: This can _not_ be used to configure k6 with environment variables as listed on the [options](/using-k6/options) page. In other words `-e K6_ITERATIONS=120` will _not_ configure the script [iterations](/using-k6/options#iterations), it will just provide `__ENV.K6_ITERATIONS` to the script, unlike `K6_ITERATIONS=120 k6 run script.js`.

Environment variables specified with the `-e` CLI flag takes precedence over (overwrite) actual
system environment variables with the same name.

## k6 Options Environment Variables

We can also pass k6 options through environment variables. Consider the following basic test script:

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
