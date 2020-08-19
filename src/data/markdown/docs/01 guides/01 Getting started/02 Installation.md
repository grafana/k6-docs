---
title: 'Installation'
---

## Linux (deb and rpm packages)

<div class="code-group" data-props='{ "labels": ["Linux (Debian/Ubuntu)", "Linux (Redhat/CentOS)"] }'>

```shell
wget -q -O - https://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
echo "deb https://dl.bintray.com/loadimpact/deb stable main" | sudo tee -a /etc/apt/sources.list
sudo apt-get update
sudo apt-get install k6
```

```shell
wget https://bintray.com/loadimpact/rpm/rpm -O bintray-loadimpact-rpm.repo
sudo mv bintray-loadimpact-rpm.repo /etc/yum.repos.d/
sudo yum install k6
```

</div>

## Mac (brew)

<div class="code-group" data-props='{ "labels": ["Brew"] }'>

```shell
brew install k6
```

</div>

## Windows (MSI installer)

Download the k6 installer from [here](https://dl.bintray.com/loadimpact/windows/k6-v0.27.0-amd64.msi)

## Binaries

Grab a prebuilt binary from our <a href="https://github.com/loadimpact/k6/releases">Releases page</a>.
Install the binary in your `PATH` to run **k6** from any location.

## Docker

<div class="code-group" data-props='{"labels": ["Docker"]}'>

```shell
docker pull loadimpact/k6
```

</div>
