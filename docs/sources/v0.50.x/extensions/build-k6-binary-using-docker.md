---
title: 'Build a k6 binary using Docker'
description: 'Guide to build a k6 binary with extensions using Docker.'
weight: 03
---

# Build a k6 binary using Docker

Using the [xk6 Docker image](https://hub.docker.com/r/grafana/xk6/) can simplify the process of creating a custom k6 binary. It avoids having to setup a local Go environment, and install xk6 manually.

{{% admonition type="note" %}}

This tutorial is about creating a custom k6 binary (using Docker). If you want to create a Docker image with a custom k6 binary, refer instead to [Using modules with Docker](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules/#using-modules-with-docker).

{{% /admonition %}}

## Building your first extension

For example, to build a custom k6 binary with the latest versions of k6 and the [`xk6-kafka`](https://github.com/mostafa/xk6-kafka) and [`xk6-output-influxdb`](https://github.com/grafana/xk6-output-influxdb) extensions, run one of the commands below, depending on your operating system:

{{< code >}}

```linux
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build \
  --with github.com/mostafa/xk6-kafka \
  --with github.com/grafana/xk6-output-influxdb
```

```mac
docker run --rm -e GOOS=darwin -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" \
  grafana/xk6 build \
  --with github.com/mostafa/xk6-kafka \
  --with github.com/grafana/xk6-output-influxdb
```

```windows-powershell
docker run --rm -e GOOS=windows -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" `
  grafana/xk6 build --output k6.exe `
  --with github.com/mostafa/xk6-kafka `
  --with github.com/grafana/xk6-output-influxdb
```

```windows
docker run --rm -e GOOS=windows -v "%cd%:/xk6" ^
  grafana/xk6 build --output k6.exe ^
  --with github.com/mostafa/xk6-kafka ^
  --with github.com/grafana/xk6-output-influxdb
```

{{< /code >}}

This creates a `k6` (or `k6.exe`) binary in the current working directory.

To build the binary with concrete versions, see the example below (k6 `v0.45.1`, xk6-kafka `v0.19.1`, and xk6-output-influxdb `v0.4.1`):

{{< code >}}

```linux
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build v0.45.1 \
  --with github.com/mostafa/xk6-kafka@v0.19.1 \
  --with github.com/grafana/xk6-output-influxdb@v0.4.1
```

```mac
docker run --rm -e GOOS=darwin -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" \
  grafana/xk6 build v0.45.1 \
  --with github.com/mostafa/xk6-kafka@v0.19.1 \
  --with github.com/grafana/xk6-output-influxdb@v0.4.1
```

```windows-powershell
docker run --rm -e GOOS=windows -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" `
  grafana/xk6 build v0.45.1 --output k6.exe `
  --with github.com/mostafa/xk6-kafka@v0.19.1 `
  --with github.com/grafana/xk6-output-influxdb@v0.4.1
```

```windows
docker run --rm -e GOOS=windows -v "%cd%:/xk6" ^
  grafana/xk6 build v0.45.1 --output k6.exe ^
  --with github.com/mostafa/xk6-kafka@v0.19.1 ^
  --with github.com/grafana/xk6-output-influxdb@v0.4.1
```

{{< /code >}}

## Breaking down the command

The example command line may look a bit intimidating at first, but let's focus on the first part, which pertains strictly to Docker:

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6"
```

This tells Docker to run a new container from an image.

- `--rm` means the container will be destroyed once your build is completed.
- `-u` specifies the user and group IDs of the account on the host machine. This is important for the `k6` file to have the same file permissions as the host user.
- `-v` is required to mount the current working directory inside the container, so that the `k6` binary can be written to it.

For Windows and Mac, we additionally include the target system as an environment variable:

```bash
-e GOOS=<target os>
```

The remainder is straight from the [xk6 documentation](https://github.com/grafana/xk6/#command-usage), with the exception that we use the `grafana/xk6` _image_ rather than a local installation of `xk6`:

{{< code >}}

```plain
grafana/xk6 build [<k6_version>]
    [--output <file>]
    [--with <module[@version][=replacement]>...]
    [--replace <module=replacement>...]

Flags:
  --output   specifies the new binary name [default: 'k6']
  --replace  enables override of dependencies for k6 and extensions [default: none]
  --with     the extension module to be included in the binary [default: none]
```

{{< /code >}}

{{% admonition type="caution" %}}

The use of `--replace` should be considered an advanced feature to be avoided unless required.

{{% /admonition %}}

Referring back to our executed command, note that:

- We specify the version as `v0.43.1`. When you omit the version or specify `latest`, you build using the _latest_ source code for k6.
  Consider using a stable [release version](https://github.com/grafana/k6/releases) as a best practice unless you genuinely want the _bleeding edge_.
- We specify a full GitHub URI for the extension repository with each `--with`.
  If a version is not specified, the default is again the `latest`.
  Check your extension repository for stable release versions, if available, to lock in your version as we've done with `xk6-kafka@v0.17.0` and `xk6-output-influxdb@v0.3.0`.
- For Windows, we used the `--output` option to name our result as `k6.exe`; if not specified, our new binary is `k6` within the current directory.
  If you specify a directory, the new binary will be `k6` within _that_ directory.
  If you specify a path to a non-existent file, e.g. `/tmp/k6-extended`, this will be the path and filename for the binary.

Run `./k6 version` (or `k6.exe version`) to check that your build is based on the appropriate `k6` version and contains the desired extensions. For example:

{{< code >}}

```bash
$ ./k6 version
k6 v0.43.1 ((devel), go1.20.1, darwin/amd64)
Extensions:
  github.com/grafana/xk6-output-influxdb v0.3.0, xk6-influxdb [output]
  github.com/mostafa/xk6-kafka v0.17.0, k6/x/kafka [js]
```

{{< /code >}}

## Running your extended binary

Now that we have our newly built k6 binary, we can run scripts using the functionalities
of the bundled extensions.

{{< code >}}

```bash
./k6 run my-script.js
```

```batch
k6.exe run my-script.js
```

{{< /code >}}

> Be sure to specify the binary just built in the current directory as `./k6`, or else
> Linux/Mac could execute another k6 binary on your system path. Windows shells will
> first search for the binary in the current directory by default.

## Encountering issues?

If you're having issues, search the [k6 Community Forum](https://community.grafana.com/c/grafana-k6/extensions/82).
Someone may have had the same issue in the past.
