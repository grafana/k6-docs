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

<Collapsible title="Using an image that lacks ca-certificates or gnupg2">

Some images don't come bundled with the `ca-certificates` and `gnupg2` packages
out of the box. If you are using such an image, you first need to install these
packages. The complete commands are as follow:

```bash
sudo apt-get update && sudo apt-get install ca-certificates gnupg2 -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

</Collapsible>

<Collapsible title="Behind a firewall or proxy">

There have been reports of users being unable to download the key from Ubuntu's
keyserver using the `apt-key` command due to firewalls or proxies blocking their
requests. If you experience this issue, you may try this alternative approach
instead:

```bash
curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
```

Then confirm that the key with the above ID is shown in the output of `sudo apt-key list`.
</Collapsible>

<Collapsible title="Using the old Bintray repository">

The Bintray k6 repositories [stopped working May 1st, 2021](https://k6.io/blog/sunsetting-bintray/)
and you should switch to our own repositories following the instructions above.

On Debian/Ubuntu you can remove the Bintray repository with:
```bash
sudo sed -i '/dl\.bintray\.com\/loadimpact\/deb/d' /etc/apt/sources.list
sudo apt-key del 379CE192D401AB61
sudo apt-get update
```

And on Fedora/CentOS with:
```bash
sudo rm /etc/yum.repos.d/bintray-loadimpact-rpm.repo
```

</Collapsible>


### Fedora/CentOS

Using `dnf` or `yum` on older versions:

```bash
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```

<Collapsible title="CentOS versions older than 8">

CentOS versions older than 8 don't support the PGP V4 signature we use, so you'll need to disable the verification by installing k6 with:
```bash
sudo yum install --nogpgcheck k6
```

</Collapsible>


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

