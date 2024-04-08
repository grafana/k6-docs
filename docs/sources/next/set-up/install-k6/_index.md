---
aliases:
  - ../get-started/installation # docs/k6/<K6_VERSION>/get-started/installation
  - ./installation
title: 'Install k6'
description: 'k6 has packages for Linux, Mac, and Windows. As alternatives, you can also using a Docker container or a standalone binary.'
weight: 01
---

# Install k6

k6 has packages for Linux, Mac, and Windows. Alternatively, you can use a Docker container or a standalone binary.

## Linux

### Debian/Ubuntu

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Fedora/CentOS

Using `dnf` (or `yum` on older versions):

```bash
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```

## MacOS

Using [Homebrew](https://brew.sh/):

```bash
brew install k6
```

## Windows

If you use the [Chocolatey package manager](https://chocolatey.org/) you can install the unofficial k6 package with:

```
choco install k6
```

If you use the [Windows Package Manager](https://github.com/microsoft/winget-cli), install the official packages from the k6 manifests [(created by the community)](https://github.com/microsoft/winget-pkgs/tree/master/manifests/k/k6/k6):

```
winget install k6 --source winget
```

Alternatively, you can download and run [the latest official installer](https://dl.k6.io/msi/k6-latest-amd64.msi).

## Docker

```bash
docker pull grafana/k6
```

We also have a separate image you can use with `chromium` installed to run k6 browser tests.

```bash
docker pull grafana/k6:master-with-browser
```

## Download the k6 binary

Our [GitHub Releases page](https://github.com/grafana/k6/releases) has a standalone binary for all platforms. After downloading and extracting the archive for your platform, place the `k6` or `k6.exe` binary in your `PATH` to run `k6` from any location.

## Using k6 extensions

If you use one or more [k6 extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions), you need a k6 binary built with your desired extensions.
Head to [Explore extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/explore) to get started.

## Troubleshooting

If installation fails, check the [list of common installation issues](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/troubleshooting).
If your problem is not listed and persists, reach out via the channel `#community-discussion` on our [official Slack](https://k6io.slack.com/), or report it on our [community forum](https://community.grafana.com/).

## Next steps

Now that you have k6 installed in your machine, you can:

- Head over to [Running k6](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6/) to learn how to create and run your first test.
- Refer to [Configure k6 Intellisense](https://grafana.com/docs/k6/<K6_VERSION>/set-up/configure-k6-intellisense/) to set up code editing features to your code editor, such as auto-completion of k6 functions.
