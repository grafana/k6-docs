---
title: 'Cloud secret source'
menuTitle: 'Cloud'
description: 'The cloud secret source lets you access Grafana Cloud k6 secrets when running tests locally with k6 cloud run --local-execution'
weight: 04
---

# Cloud secret source

When you run tests in Grafana Cloud using `k6 cloud run`, [secrets management](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/manage-secrets/) is available automatically. The cloud secret source brings that same access to local execution runs with `k6 cloud run --local-execution`, so you can use the same secrets without managing credentials locally.

{{< admonition type="note" >}}

The cloud secret source only works with `k6 cloud run --local-execution`. Using it with `k6 run` returns an error.

{{< /admonition >}}

## Before you begin

- Authenticate with Grafana Cloud k6 using `k6 cloud login`.
- Configure the secrets you want to use in [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/manage-secrets/).

## Use the cloud secret source

Starting in k6 v2.0.0, the cloud secret source is enabled automatically when you run `k6 cloud run --local-execution`. You don't need to pass any flag, and `secrets.get()` works out of the box:

```bash
k6 cloud run --local-execution script.js
```

k6 automatically configures the credentials needed to fetch secrets from Grafana Cloud. No tokens, endpoints, or passwords are required on the command line.

k6 automatically redacts all secrets from logs.

## Opt out with `--no-cloud-secrets`

If you don't want the cloud secret source enabled, pass `--no-cloud-secrets`:

```bash
k6 cloud run --local-execution --no-cloud-secrets script.js
```

With this flag, calls to `secrets.get()` for the cloud source will fail unless you explicitly configure another source.
