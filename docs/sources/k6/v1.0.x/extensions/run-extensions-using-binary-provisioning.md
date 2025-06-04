---
labels:
  products:
    - cloud
title: 'Run extensions using Binary Provisioning'
description: 'Learn how to run scripts that require extensions using Binary Provisioning.'
weight: 04
---

# Run extensions using Binary Provisioning

{{< admonition type="caution" >}}

This is an experimental feature. Breaking changes might occur prior to the feature being made generally available.

{{< /admonition >}}

k6 supports [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) as a way of extending k6 native functionality, and support a wider variety of use cases.

Using k6 with extensions locally requires users to build a [custom k6 binary](https://grafana.com/docs/k6/<K6_VERSION>/extensions/#xk6-makes-custom-binaries) that includes the extension, which can then be used to run a test script. With the Binary Provisioning feature, Grafana Cloud k6 users can run tests with a [limited set of extensions](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-k6-extensions/#supported-extensions-in-grafana-cloud), without having to manually build a k6 binary.

The `archive` and `inspect` commands also support Binary Provisioning to allow creating archives for Grafana Cloud.

## Before you begin

To use Binary Provisioning, you'll need:

- k6 v1.0 or greater [installed on your machine](https://grafana.com/docs/k6/latest/set-up/install-k6/).
- A [Grafana Cloud account](https://grafana.com/auth/sign-up/create-user).

## Set the Binary Provsioning environment flag

To enable Binary Provisioning, you must set the `K6_BINARY_PROVISIONING` environment variable to `true`:

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

{{< /code >}}

## Log in to Grafana Cloud

To use Binary Provisioning, you must [authenticate to Grafana Cloud](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/tokens-and-cli-authentication/#authenticate-with-the-login-command) using the `k6 cloud login` command:

```bash
k6 cloud login --token <API_TOKEN>
```

## Run a test

After setting the `K6_BINARY_PROVISIONING` environment variable and logging in to Grafana Cloud, you can run a test using the `k6 cloud run` command:

{{< code >}}

```linux
k6 cloud run --local-execution script.js
```

```mac
k6 cloud run --local-execution --quiet script.js
```

```windows-powershell
k6.exe cloud run --local-execution --quiet script.js
```

```windows
k6.exe cloud run --local-execution --quiet script.js
```

{{< /code >}}

As an example, you can save this script to your machine and run it in Grafana Cloud. It uses the [xk6-faker](https://github.com/grafana/xk6-faker) extension to generate a random first name.

<!-- md-k6:skip -->

```javascript
import faker from 'k6/x/faker';

export default function () {
  console.log(faker.person.firstName());
}
```

You should see an output similar to the following:

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

The output includes information about which dependencies were detected, and the version for the dependencies used to run the test.

## Limitations

- Only extensions supported in Grafana Cloud are supported.
- Output extensions are not supported.
- Running scripts from stdin is not supported.
- Only files with extensions `.js`, `.ts` or `.tar` can be used. Other extensions will not invoke the Binary Provisioning mechanism.
