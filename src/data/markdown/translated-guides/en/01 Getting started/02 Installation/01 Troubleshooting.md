---
title: 'Troubleshooting'
excerpt: 'Instructions to fix the most common installation issues.'
---

## Distro lacks ca-certificates or gnupg2

Some Linux distributions don't come bundled with the `ca-certificates` and `gnupg2` packages.
If you use such a distribution, you'll need to install these packages:

```bash
sudo apt-get update && sudo apt-get install ca-certificates gnupg2 -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```


## Behind a firewall or proxy

Some users have reported that they can't download the key from Ubuntu's keyserver.
When they run the `apt-key` command, their firewalls or proxies block their requests to download.
If this issue affects you, you can try this alternative:


```bash
curl -s https://dl.k6.io/key.gpg | sudo apt-key add -
```

Run `sudo apt-key list`, and confirm that the output shows the preceding key.

## Using the old Bintray repository

The Bintray k6 repositories [stopped working May 1st, 2021](https://k6.io/blog/sunsetting-bintray/).
You should use the preceding instructions to switch to our repositories.

On Debian/Ubuntu, you can remove the Bintray repository with:
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

CentOS versions older than 8 don't support the PGP V4 signature we use.
You'll need to disable the verification when you install k6:

```bash
sudo yum install --nogpgcheck k6
```
