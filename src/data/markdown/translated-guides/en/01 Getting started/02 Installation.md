---
title: 'Installation'
excerpt: 'Instructions to install k6 in Linux, Mac, Windows. Use the Docker container or the prebuilt binary.'
---

## Linux

### Debian/Ubuntu

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```


### Fedora/CentOS

Using `dnf` or `yum` on older versions:

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

Otherwise you can manually download and install the [latest official `.msi` package](https://dl.k6.io/msi/k6-latest-amd64.msi).

## Docker

```bash
docker pull loadimpact/k6
```

## Download the k6 binary

Download a prebuilt binary from our [Releases page](https://github.com/k6io/k6/releases),
and place it in your `PATH` to run `k6` from any location.

## Using k6 extensions

If you use one or more [k6 extensions](/extensions), you need a k6 binary built with your desired extension/s. Head over to the [bundle builder page](/extensions/bundle-builder/) to get started.

## Troubleshooting 

If the installation fails, check the [list of common installation issues](/getting-started/installation/troubleshooting/).