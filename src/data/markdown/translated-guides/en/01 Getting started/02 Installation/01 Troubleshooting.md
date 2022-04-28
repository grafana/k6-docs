---
title: 'Troubleshooting'
excerpt: 'Instructions to fix the most common installation issues.'
---

## System lacks ca-certificates or gnupg2

Some Linux distributions don't come bundled with the `ca-certificates` and `gnupg2` packages.
If you use such a distribution, you'll need to install them with:

```bash
sudo apt-get update && sudo apt-get install -y ca-certificates gnupg2
```

This example is for Debian/Ubuntu and derivatives. Consult your distribution's documentation if you use another one.


## apt-key is deprecated

Some Ubuntu and Debian users might run into an `apt-key` deprecation warning while adding k6's repository key to their system's keyring:

> `Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead (see apt-key(8))`

To avoid this and be future-proof, users should delete the existing `security@k6.io` repository key on their system, and update their sources list accordingly.

```bash
# delete existing key
sudo apt-key del k6

# import the key the recommended way
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

# update the repository
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
```


## Error importing k6's GPG key

The `gpg` command to import k6's package signing key might fail with:
```bash
gpg: keybox '/usr/share/keyrings/k6-archive-keyring.gpg' created
gpg: failed to create temporary file '/root/.gnupg/.#lk0x000055db689f2310.a86c4b090dc7.7': No such file or directory
gpg: connecting dirmngr at '/root/.gnupg/S.dirmngr' failed: No such file or directory
gpg: keyserver receive failed: No dirmngr
```

This happens if it's the first time that the user runs `gpg` , so the directory `/root/.gnupg/` doesn't exist yet.
To create the directory, run `sudo gpg -k` and try to import the key again.


## Behind a firewall or proxy

Some users have reported that they can't download the key from Ubuntu's keyserver.
When they run the `gpg` command, their firewalls or proxies block their requests to download.
If this issue affects you, you can try this alternative:


```bash
curl -s https://dl.k6.io/key.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/k6-archive-keyring.gpg
```


## CentOS versions older than 8

CentOS versions older than 8 don't support the PGP V4 signature we use.
You'll need to disable the verification when you install k6:

```bash
sudo yum install --nogpgcheck k6
```
