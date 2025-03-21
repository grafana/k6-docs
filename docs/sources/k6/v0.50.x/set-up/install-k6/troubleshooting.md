---
aliases:
  - ../get-started/troubleshooting # docs/k6/<K6_VERSION>/get-started/troubleshooting
title: 'Troubleshooting'
description: 'Instructions to fix the most common installation issues.'
weight: 200
---

# Troubleshooting

## System lacks ca-certificates or gnupg2

Some Linux distributions don't come bundled with the `ca-certificates` and `gnupg2` packages.
If you use such a distribution, you'll need to install them with:

```bash
sudo apt-get update && sudo apt-get install -y ca-certificates gnupg2
```

This example is for Debian/Ubuntu and derivatives. Consult your distribution's documentation if you use another one.

## Behind a firewall or proxy

Some users have reported that they can't download the key from Ubuntu's keyserver.
When they run the `gpg` command, their firewalls or proxies block their requests to download.
If this issue affects you, you can try this alternative:

```bash
curl -s https://dl.k6.io/key.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/k6-archive-keyring.gpg
```

## Old rpm-based Linux distributions

Distributions like Amazon Linux 2 and CentOS before version 8 don't support the PGP V4 signature we use.
You'll need to disable the verification when you install k6:

```bash
sudo yum install --nogpgcheck k6
```
