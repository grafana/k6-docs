---
title: 'Run scripts using automatic extension resolution'
description: 'Learn how to run scripts that require extensions.'
weight: 04
---

# Run scripts using automatic extension resolution

k6 supports [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) as a way of extending k6 native functionality, and support a wider variety of use cases.

The Automatic Extension Resolution feature allows k6 users to run tests using any of the [official extensions](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-k6-extensions/#supported-extensions-in-grafana-cloud) without having to manually build a [custom k6 binary](https://grafana.com/docs/k6/<K6_VERSION>/extensions/#xk6-makes-custom-binaries).
## Before you begin

To use Automatic Extension Resolution, you'll need:

- k6 v1.2.0 or greater [installed on your machine](https://grafana.com/docs/k6/latest/set-up/install-k6/).

## Disable the Automatic Extension Resolution

This feature can be disabled by setting the `K6_AUTO_EXTENSION_RESOLUTION` environment variable to `false`.

{{< code >}}

```linux
export K6_AUTO_EXTENSION_RESOLUTION=false
```

```mac
export K6_AUTO_EXTENSION_RESOLUTION=false
```

```windows-powershell
$Env:K6_AUTO_EXTENSION_RESOLUTION = "false"

```
{{< /code >}}

## Enable community extensions

By default [a limited set of officially supported extensions](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-k6-extensions/#supported-extensions-in-grafana-cloud) can be used. With the `K6_ENABLE_COMMUNITY_EXTENSIONS`, the full list of extensions is available, including the [community extensions](https://grafana.com/docs/k6/latest/extensions/explore/#community-extensions).
{{< admonition type="note" >}}

When running tests in the cloud, only a subset of the officially supported extensions is allowed.

{{< /admonition >}}

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

## Use unsupported extensions

Users requiring extensions not supported by the Automatic Extension Resolution can build a [custom k6 binary](https://grafana.com/docs/k6/<K6_VERSION>/extensions/#xk6-makes-custom-binaries).

## Run a test with extensions

{{< code >}}

```linux
k6 run script.js
```

```mac
k6 run script.js
```

```windows-powershell
k6.exe run script.js
```

```windows
k6.exe run script.js
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
