---
title: 'Installation'
excerpt: 'k6 has packages for Linux, Mac, and Windows. As alternatives, you can also using a Docker container or a prebuilt binary.'
---

k6 has packages for Linux, Mac, and Windows. As alternatives, you can also use a Docker container or a prebuilt binary.

## Linux

### Debian/Ubuntu

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
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
winget install k6
```

You can also manually download and install the [latest official `.msi` package](https://dl.k6.io/msi/k6-latest-amd64.msi).

## Docker

```bash
docker pull grafana/k6
```

## Download the k6 binary

The [Releases page](https://github.com/grafana/k6/releases) has a prebuilt binary.
After you download it, place it in your `PATH` to run `k6` from any location.

## Using k6 extensions

If you use one or more [k6 extensions](/extensions), you need a k6 binary built with your desired extensions.
Head to the [bundle builder page](/extensions/bundle-builder/) to get started.

## Troubleshooting

If installation fails, check the [list of common installation issues](/getting-started/installation/troubleshooting/).
