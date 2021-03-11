---
title: 'Installation'
---

## Linux

### Debian/Ubuntu

```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
$ echo "deb https://dl.bintray.com/loadimpact/deb stable main" | sudo tee -a /etc/apt/sources.list
$ sudo apt-get update
$ sudo apt-get install k6
```

> #### ⚠️ If you are behind a firewall or proxy
>
> There have been reports of users being unable to download the key from Ubuntu's key-server using `apt-key`
> command due to firewalls or proxies blocking their requests. If you experience this issue, you may try this
> alternative approach instead:
>
> ```bash
> $ wget -q -O - https://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
> ```

### Red Hat/CentOS

```bash
$ wget https://bintray.com/loadimpact/rpm/rpm -O bintray-loadimpact-rpm.repo
$ sudo mv bintray-loadimpact-rpm.repo /etc/yum.repos.d/
$ sudo yum install k6
```

## Mac (brew)

<CodeGroup labels={['Brew']}>

```bash
$ brew install k6
```

</CodeGroup>

## Windows (MSI installer)

Download the k6 installer from [here](https://dl.bintray.com/loadimpact/windows/k6-v0.31.0-amd64.msi).

## Binaries

Grab a prebuilt binary from our <a href="https://github.com/loadimpact/k6/releases">Releases page</a>.
Install the binary in your `PATH` to run **k6** from any location.

## Docker

<CodeGroup labels={['Docker']}>

```bash
$ docker pull loadimpact/k6
```

</CodeGroup>
