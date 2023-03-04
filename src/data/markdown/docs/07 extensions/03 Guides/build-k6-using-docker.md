---
title: 'Build a k6 binary using Docker'
excerpt: ''
hideFromSidebar: false
---

The easiest way to use [xk6](https://github.com/grafana/xk6) is via our [Docker image](https://hub.docker.com/r/grafana/xk6/). This avoids having to setup a local Go environment, and install xk6 manually.

## Building your first extension

For example, to build a k6 v0.43.1 binary with the [`xk6-kafka`](https://github.com/mostafa/xk6-kafka) and [`xk6-output-influxdb`](https://github.com/grafana/xk6-output-influxdb) extensions, you would run one of the following based upon your operating system:

<CodeGroup labels={["Linux", "Mac", "Windows PowerShell", "Windows"]}>

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build v0.43.1 \
  --with github.com/mostafa/xk6-kafka@v0.17.0 \
  --with github.com/grafana/xk6-output-influxdb@v0.3.0
```

```bash
docker run --rm -e GOOS=darwin -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" \
  grafana/xk6 build v0.43.1 \
  --with github.com/mostafa/xk6-kafka@v0.17.0 \
  --with github.com/grafana/xk6-output-influxdb@v0.3.0
```

```powershell
docker run --rm -e GOOS=windows -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" `
  grafana/xk6 build v0.43.1 --output k6.exe `
  --with github.com/mostafa/xk6-kafka@v0.17.0 `
  --with github.com/grafana/xk6-output-influxdb@v0.3.0
```

```batch
docker run --rm -e GOOS=windows -v "%cd%:/xk6" ^
  grafana/xk6 build v0.43.1 --output k6.exe ^
  --with github.com/mostafa/xk6-kafka@v0.17.0 ^
  --with github.com/grafana/xk6-output-influxdb@v0.3.0
```

</CodeGroup>

This would create a `k6` (or `k6.exe`) binary in the current working directory.

## Breaking down the command

We'll admit, the example command line looks terrifying. Let's focus on the first part, which pertains strictly to Docker:

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6"
```

This tells Docker to run a new container from an image. 
`--rm` means the container will be destroyed once your build is completed.
`-u` specifies the user and group IDs of the account on the host machine. This is important for the `k6` file to have the same file permissions as the host user.
`-v` is required to mount the current working directory inside the container, so that the `k6` binary can be written to it.

For Windows and Mac, we additionally include the target system as an environment variable:

```bash
-e GOOS=<target os>
```

The remainder is straight from the [xk6 documentation](https://github.com/grafana/xk6/#command-usage) with the exception that we are using the `grafana/xk6` _image_ rather than a local installation of `xk6`:

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

> For this portion, use the [interactive builder](/extensions/get-started/bundle/) and prefix the `grafana/` to avoid typing mistakes!

<Blockquote mod="attention">

The use of `--replace` should be considered an advanced feature to be avoided unless required.

</Blockquote>

Referring back to our executed command, note that:
- We specify the version as `v0.43.1`. Had we specified `latest`, or omitted a version, would mean that we'll build using the _latest_ source code for k6. 
  Consider using a stable [release version](https://github.com/grafana/k6/releases) as a best practice unless you genuinely want the _bleeding edge_.
- With each `--with`, we specified a full GitHub URI for the extension repository. 
  If not specifying a version, the default is `latest` once again. 
  Check your extension repository for stable release versions, if available, to lock in your version as we've done with `xk6-kafka@v0.17.0` and `xk6-output-influxdb@v0.3.0`.
- For Windows, we used the `--output` option to name our result as `k6.exe`; if not specified, our new binary is `k6` within the current directory.
  If a directory is specified, then the new binary would be `k6` within _that_ directory. 
  If a path to a non-existent file, e.g. `/tmp/k6-extended`, this will be the path and filename for the binary.

Running `./k6 version` (or `k6.exe version`) should show your build is based upon the appropriate version.

## Running your extended binary

Now that we have our newly built k6 binary, we can run scripts using the functionalities
of the bundled extensions.

<CodeGroup labels={["Linux/Mac", "Windows"]}>

```bash
./k6 run my-script.js
```

```batch
k6.exe run my-script.js
```

</CodeGroup>

> Be sure to specify the binary just built in the current directory as `./k6`, or else
> Linux/Mac could execute another k6 binary on your system path. Windows shells will
> first search for the binary in the current directory by default.

## Encountering issues?

If you're having issues, search the [k6 Community Forum](https://community.k6.io/c/extensions/). 
Someone may have had the same issue in the past.
