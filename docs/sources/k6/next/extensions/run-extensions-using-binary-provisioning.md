---
title: 'Run extensions using Binary Provisioning'
description: 'Learn how to run scripts that require extensions using Binary Provisioning.'
weight: 04
---

# Run extensions using Binary Provisioning

k6 supports [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) as a way of extending k6 native functionality, and support a wider variety of use cases.

Using k6 with extensions requires users to build a [custom k6 binary](https://grafana.com/docs/k6/<K6_VERSION>/extensions/#xk6-makes-custom-binaries) that includes the extension, which can then be used to run a test script. With the Binary Provisioning feature, k6 users can run tests using extensions without having to manually build a k6 binary.

## Before you begin

To use Binary Provisioning, you'll need:

- k6 v1.2.0 or greater [installed on your machine](https://grafana.com/docs/k6/latest/set-up/install-k6/).

## Set the Binary Provisioning environment flag

Set the `K6_BINARY_PROVISIONING` environment variable to `true` to enable the feature:

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

## Enable community extensions (Optional)

By default [a limited set of officially supported extensions](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-k6-extensions/#supported-extensions-in-grafana-cloud) can be used. With the `K6_ENABLE_COMMUNITY_EXTENSIONS` the full list of available extensions is available, including the [community extensions](https://grafana.com/docs/k6/latest/extensions/explore/#community-extensions).

> When running tests in the cloud only the officially supported extensions are allowed.

{{< code >}}

```linux
export K6_ENABLE_COMMUNITY_EXTENSIONS=true
```

```mac
export K6_ENABLE_COMMUNITY_EXTENSIONS=true
```

```windows-powershell
$Env:K6_ENABLE_COMMUNITY_EXTENSIONS = "true"

```
{{< /code >}}

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
INFO[0000] A new k6 binary has been provisioned with version(s): k6:v1.2.0 k6/x/faker:v0.4.3
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

- Output extensions are not supported.
