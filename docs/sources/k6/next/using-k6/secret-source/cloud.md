---
title: 'Cloud secret source'
menuTitle: 'Cloud'
description: 'The cloud secret source lets you access Grafana Cloud k6 secrets when running tests locally with k6 cloud run --local-execution'
weight: 04
---

# Cloud secret source

When you run tests in Grafana Cloud using `k6 cloud run`, [secrets management](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/manage-secrets/) is available automatically. The cloud secret source brings that same access to local execution runs with `k6 cloud run --local-execution`, so you can use the same secrets without managing credentials locally.

{{< admonition type="note" >}}

The cloud secret source only works with `k6 cloud run --local-execution --secret-source=cloud`. Using it with `k6 run` returns an error.

{{< /admonition >}}

## Before you begin

- Authenticate with Grafana Cloud k6 using `k6 cloud login`.
- Configure the secrets you want to use in [k6 Cloud secrets management](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/manage-secrets/).

## Use the cloud secret source

Pass `--secret-source=cloud` when running your test with `k6 cloud run --local-execution`:

{{< code >}}

```bash
k6 cloud run --local-execution --secret-source=cloud script.js
```

{{< /code >}}

k6 automatically configures the credentials needed to fetch secrets from Grafana Cloud. No tokens, endpoints, or passwords are required on the command line.

All secrets are automatically redacted from k6 logs.
