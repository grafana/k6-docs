---
title: 'Troubleshooting'
excerpt: 'Instructions to fix the most common installation issues.'
---

## Distro lacks ca-certificates or gnupg2

Some Linux distributions don't come bundled with the `ca-certificates` and `gnupg2` packages.
If you use such a distribution, you'll need to install them:

```bash
sudo apt-get update && sudo apt-get install ca-certificates gnupg2 -y
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## apt-key is deprecated

Some Ubuntu and Debian users might run into an `apt-key` deprecation warning while adding k6's repository key to their system's keyring:

> `Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead (see apt-key(8))`

To avoid this and be future-proof, users should delete the existing `security@k6.io` repository key on their system, and update their sources list accordingly.

```bash
# delete existing key
sudo apt-key del k6

# import key the updated way
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

# update /etc/apt-sources.list.d/k6.list
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
```

## Dirmng is missing or uninitialized

Some users might encounter an error mentioning `No dirmng` as they try to download k6's GPG key from ubuntu's keyserver:
```bash
gpg: keybox '/usr/share/keyrings/k6-archive-keyring.gpg' created
gpg: failed to create temporary file '/root/.gnupg/.#lk0x000055db689f2310.a86c4b090dc7.7': No such file or directory
gpg: connecting dirmngr at '/root/.gnupg/S.dirmngr' failed: No such file or directory
gpg: keyserver receive failed: No dirmngr
```

If this issue affects you, make sure `dirmngr` is installed on your system by running `apt-get install dirmngr` (or equivalent for your distribution),
and run `dirmngr -q` to initialize it. 

## Behind a firewall or proxy

Some users have reported that they can't download the key from Ubuntu's keyserver.
When they run the `gpg` command, their firewalls or proxies block their requests to download.
If this issue affects you, you can try this alternative:


```bash
curl -s https://dl.k6.io/key.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/k6-archive-keyring.gpg
```

Run `sudo apt-key list`, and confirm that the output shows the preceding key.


## CentOS versions older than 8

CentOS versions older than 8 don't support the PGP V4 signature we use.
You'll need to disable the verification when you install k6:

```bash
sudo yum install --nogpgcheck k6
```
