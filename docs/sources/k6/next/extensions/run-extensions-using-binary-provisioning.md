---
title: 'Run extensions using Binary Provisioning'
description: 'Guide to run scripts that require extensions using Binary provisioning.'
weight: 04
---

# Run extensions using Binary Provisioning

{{< admonition type="caution" >}}

This is an experimental feature. Breaking changes might occur prior to the feature being made generally available.

{{< /admonition >}}

k6 now supports natively running scripts that use extensions using the Binary Provisioning feature.

When enabled, this feature will automatically provide a custom binary including all the required extensions and will execute the script using this binary.

Currently, it only supports extensions [supported in Grafana Cloud](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-k6-extensions/#supported-extensions-in-grafana-cloud).

If your test requires other extensions, you can create a [custom k6 binary](https://grafana.com/docs/k6/<K6_VERSION>/extensions/#xk6-makes-custom-binaries).

The feature requires authentication to Grafana Cloud and therefore is supported only in the `cloud run` command.

Running scripts locally with the `run` command will not use Binary Provisioning, but you can use `cloud run --local-execution` instead.

The `archive` and `inspect` commands also support Binary provisioning to allow creating archives to the cloud.

To enable the Binary Provisioning, you must set the `K6_BINARY_PROVISIONING` environment variable to `true`:

{{< code >}}

```linux
export K6_BINARY_PROVISIONING=true
```

```mac
export K6_BINARY_PROVISIONING=true
```

```windows-powershell
$Env:K6_BINARY_PROVISIONING = "true"

```

```windows
```

{{< /code >}}


In order to use the Binary Provisioning, the user must be authenticated to Grafana Cloud. You can [authenticate](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/tokens-and-cli-authentication/#authenticate-with-the-login-command) using the `k6 cloud login` command:

{{< code >}}

```linux
k6 cloud login --token <API_TOKEN>
```

```mac
k6 cloud login --token <API_TOKEN>
```

```windows-powershell

```

```windows
```

{{< /code >}}


## Example

Consider the following script that uses the [xk6-faker](https://github.com/grafana/xk6-faker) extension to create a random person name and prints it to the console:

{{< code >}}

```javascript
import faker from 'k6/x/faker';

export default function () {
  console.log(faker.person.firstName());
}
```

{{< /code >}}

You can run it locally using the following command:

{{< code >}}

```linux
k6 cloud run --local-execution faker.js
```

```mac
k6 cloud run --local-execution --quiet faker.js
```

```windows-powershell
k6.exe cloud run --local-execution --quiet faker.js

```

```windows
k6.exe cloud run --local-execution --quiet faker.js
```

{{< /code >}}

You should see an output similar to the following:

{{< code >}}

```sh
INFO[0000] The current k6 binary doesn't satisfy all dependencies, it is required to provision a custom binary.  deps="k6/x/faker*"
INFO[0000] A new k6 binary has been provisioned with version(s): k6:v1.0.0 k6/x/faker:v0.4.3
time="2025-04-24T12:59:24+02:00" level=info msg=Zelma source=console


    TOTAL RESULTS

    EXECUTION
    iteration_duration.....................: avg=759.06µs min=759.06µs med=759.06µs max=759.06µs p(90)=759.06µs p(95)=759.06µs
    iterations.............................: 1   1061.414505/s

    NETWORK
    data_received..........................: 0 B 0 B/s
    data_sent..............................: 0 B 0 B/s
```

{{< /code >}}

Notice the messages indicating the Binary Provisioning feature was used, which dependencies were detected and what versions of these dependencies were used to run the test.

## Known issues and limitations

- Only extensions supported in Grafana Cloud are supported
- Output extensions are not supported
- Running scripts from stdin is not supported
- Only files with extensions `.js`, `.ts` or `.tar` can be used. Other extensions will not invoke the Binary Provisioning mechanism
