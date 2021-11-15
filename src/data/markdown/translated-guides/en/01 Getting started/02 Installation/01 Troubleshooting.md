---
title: 'Troubleshooting'
excerpt: 'Instructions to fix the most common installation issues.'
---

## Distro lacks ca-certificates or gnupg2

Some Linux distributions don't come bundled with the `ca-certificates` and `gnupg2` packages
out of the box. If you are using such an image, you first need to install these
packages. The complete commands are as follow:

```bash
sudo apt-get update && sudo apt-get install ca-certificates gnupg2 -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```


## Behind a firewall or proxy

There have been reports of users being unable to download the key from Ubuntu's
keyserver using the `apt-key` command due to firewalls or proxies blocking their
requests. If you experience this issue, you may try this alternative approach
instead:

```bash
curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
```

Then confirm that the key with the above ID is shown in the output of `sudo apt-key list`.

## Using the old Bintray repository

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



## CentOS versions older than 8

CentOS versions older than 8 don't support the PGP V4 signature we use, so you'll need to disable the verification by installing k6 with:

```bash
sudo yum install --nogpgcheck k6
```
